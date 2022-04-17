import { daysSince } from '@/utils/countDay'
import {
  beytFirstPartAnswer,
  beytFirstPartWords,
  beytSecondPartWordsShuffled,
  todayBeyt,
} from '@/utils/createPoemVariables'
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Dispatch, ReactChildren, SetStateAction } from 'react'
import Countdown from 'react-countdown'
import { startOfTomorrow } from 'date-fns'

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
  isGameFinished,
  isGameFinishedSet,
}: {
  children: ReactChildren
  isGameFinished: boolean
  isGameFinishedSet: Dispatch<SetStateAction<boolean>>
}): JSX.Element => {
  const { hasCopied, onCopy } = useClipboard(
    `اکسیر | بیت روز ${daysSinceInPersianLetter} ام \n
    «${firstBeytToShare}»
    «${secondBeytToShare}»\n
    ${todayBeyt.poet}\n
    https://exss.ir/`
  )

  return (
    <Modal
      onClose={() => {}}
      isOpen={isGameFinished}
      closeOnOverlayClick
      closeOnEsc
      isCentered
      size='md'
    >
      <ModalOverlay bg='whiteAlpha.100' backdropFilter='blur(3px)' />
      <ModalContent mx='2' bg='green.300'>
        <ModalHeader textAlign='center'>🎉 آفرین 🎉</ModalHeader>
        <ModalCloseButton onClick={() => isGameFinishedSet(false)} />
        <ModalBody textAlign='center'>
          <Heading size='lg' fontFamily="'Vazir', sans-serif;" mb='4'>
            {todayBeyt.m1}
          </Heading>
          <Heading size='lg' fontFamily="'Vazir', sans-serif;">
            {todayBeyt.m2}
          </Heading>
          <Text color='green.700' fontSize='18' mt='4'>
            {todayBeyt.poet}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Flex flexDir='column' ml='auto' gap={2}>
            <Button colorScheme='yellow' variant='solid'>
              <Link href={todayBeyt.url} passHref>
                <a target='_blank'>متن کامل شعر</a>
              </Link>
            </Button>
            <Button onClick={onCopy} colorScheme='twitter' variant='solid'>
              {hasCopied ? 'کپی‌شد' : 'به اشتراک بذارید'}
            </Button>
          </Flex>
          <Flex flexDir='column' alignItems='center'>
            <Text fontSize='xl'>بیت بعدی</Text>
            <Countdown date={midnight} daysInHours />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WonGameModal
