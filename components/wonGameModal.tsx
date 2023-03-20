import { WonGameModalType } from '@/model/won-game-modal'
import { daysSince } from '@/utils/countDay'
import {
  beytFirstPartAnswer,
  beytFirstPartWords,
  beytSecondPartWordsShuffled,
  todayBeyt,
} from '@/utils/createPoemVariables'
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  Text,
  useClipboard,
  Image,
  useDisclosure,
} from '@chakra-ui/react'
import { startOfTomorrow } from 'date-fns'
import Link from 'next/link'
import Countdown from 'react-countdown'

const midnight: Date = startOfTomorrow()

const firstBeytToShare: string = beytFirstPartWords
  .map((word) => (word === beytFirstPartAnswer ? '💬' : word))
  .join(' ')
const secondBeytToShare: string = beytSecondPartWordsShuffled
  .sort(() => Math.random() - 0.5)
  .join(' ↔️ ')

const daysSinceInPersianLetter: string = new Intl.NumberFormat('fa-IR').format(
  daysSince
)

const WonGameModal = ({
  gameRoundSet,
  isGameFinished,
  isGameFinishedSet,
}: WonGameModalType): JSX.Element => {
  const { hasCopied, onCopy } = useClipboard(
    `اکسیر | بیت روز ${daysSinceInPersianLetter} ام \n
    «${firstBeytToShare}»
    «${secondBeytToShare}»\n
    ${todayBeyt.poet}\n
    https://exss.ir/`
  )
  const { onClose } = useDisclosure()

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isGameFinished}
        closeOnOverlayClick
        closeOnEsc
        isCentered
        size='full'
      >
        <ModalContent
          backgroundImage='won-bg.gif'
          backgroundSize='cover'
          backgroundPosition={['25% 75%', 'bottom']}
          overflow='hidden'
        >
          <ModalHeader display='flex' justifyContent='center'>
            <Button
              position='absolute'
              top='1em'
              right='1em'
              variant='solid'
              bg='#4cac4e'
              color='blackAlpha.800'
              onClick={() => {
                isGameFinishedSet(false)
                gameRoundSet(1)
              }}
            >
              دوباره
            </Button>
            <Box boxSize={['200px', '300px']}>
              <Image src='afarin.gif' alt='آفرین' />
            </Box>
          </ModalHeader>
          <ModalBody
            display='flex'
            flexDirection='column'
            textAlign='center'
            flexWrap='nowrap'
          >
            <Heading
              color='black'
              size='xl'
              fontFamily="'Vazir', sans-serif;"
              mb='4'
            >
              {todayBeyt.m1}
            </Heading>
            <Heading color='black' size='xl' fontFamily="'Vazir', sans-serif;">
              {todayBeyt.m2}
            </Heading>
            <Text color='black' fontSize='x-large' mt='4'>
              {todayBeyt.poet}
            </Text>
          </ModalBody>
          <ModalFooter>
            <SimpleGrid columns={3} alignItems='flex-end' ml='auto' gap={2}>
              <Button
                bg='#4cac4e'
                color='blackAlpha.800'
                size='sm'
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
              >
                <Link href={todayBeyt.url} passHref target='_blank'>
                  متن کامل شعر
                </Link>
              </Button>
              <Button
                bg='#4cac4e'
                onClick={onCopy}
                color='blackAlpha.800'
                size='sm'
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
              >
                {hasCopied ? 'کپی‌شد' : 'به اشتراک بذارید'}
              </Button>
              <Flex flexDir='column'>
                <Button
                  bg='#4cac4e'
                  color='blackAlpha.800'
                  size='sm'
                  borderTopRightRadius={0}
                  borderBottomRightRadius={0}
                >
                  <Text fontSize='md' textAlign='center' ml='5px'>
                    تا بیت بعدی
                  </Text>

                  <Countdown
                    date={midnight}
                    daysInHours
                    className='countdown'
                  />
                </Button>
              </Flex>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WonGameModal
