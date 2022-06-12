import { WonGameModalType } from '@/model/won-game-modal'
import { daysSince } from '@/utils/countDay'
import {
  beytFirstPartAnswer,
  beytFirstPartWords,
  beytSecondPartWordsShuffled,
  todayBeyt,
} from '@/utils/createPoemVariables'
import {
  Button,
  Divider,
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
  useDisclosure,
} from '@chakra-ui/react'
import { startOfTomorrow } from 'date-fns'
import Link from 'next/link'
import Confetti from 'react-confetti'
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
  windowWidth,
  windowHeight,
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
        <ModalContent bg='green.300'>
          {isGameFinished && (
            <Confetti
              recycle={false}
              height={windowHeight}
              width={windowWidth}
            />
          )}
          <ModalHeader display='flex' justifyContent='space-between'>
            <Button
              variant='solid'
              colorScheme='pink'
              onClick={() => {
                isGameFinishedSet(false)
                gameRoundSet(0)
              }}
            >
              دوباره
            </Button>
            <Text fontSize='3xl'>🎉 آفرین 🎉</Text>
            <Flex></Flex>
          </ModalHeader>
          <ModalBody
            display='flex'
            flexDirection='column'
            justifyContent='center'
            textAlign='center'
          >
            <Heading size='xl' fontFamily="'Vazir', sans-serif;" mb='4'>
              {todayBeyt.m1}
            </Heading>
            <Heading size='xl' fontFamily="'Vazir', sans-serif;">
              {todayBeyt.m2}
            </Heading>
            <Text color='green.700' fontSize='18' mt='4'>
              {todayBeyt.poet}
            </Text>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <SimpleGrid columns={3} alignItems='flex-end' m='auto' gap={2}>
              <Button colorScheme='yellow' variant='solid' size='sm'>
                <Link href={todayBeyt.url} passHref>
                  <a target='_blank'>متن کامل شعر</a>
                </Link>
              </Button>
              <Button
                onClick={onCopy}
                colorScheme='twitter'
                variant='solid'
                size='sm'
              >
                {hasCopied ? 'کپی‌شد' : 'به اشتراک بذارید'}
              </Button>
              <Flex flexDir='column'>
                <Text fontSize='md' textAlign='center'>
                  بیت بعدی
                </Text>
                <Button colorScheme='orange' variant='solid' size='sm'>
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
