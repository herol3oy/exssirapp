import { daysSince } from '@/utils/countDay'
import {
  beytFirstPartAnswer,
  beytFirstPartWords,
  beytSecondPartWordsShuffled,
  todayBeyt,
} from '@/utils/createPoemVariables'
import {
  Button,
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
    https://exss.ir`
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
      <ModalOverlay
        bg='whiteAlpha.300'
        backdropFilter='blur(6px) hue-rotate(90deg)'
      />
      <ModalContent bg='green.300'>
        <ModalHeader textAlign='center'>آفرین</ModalHeader>
        <ModalCloseButton onClick={() => isGameFinishedSet(false)} />
        <ModalBody textAlign='center'>
          <Heading size='lg' fontFamily="'Vazir', sans-serif;">
            {todayBeyt.m1}
          </Heading>
          <Heading size='lg' fontFamily="'Vazir', sans-serif;">
            {todayBeyt.m2}
          </Heading>
          <Text>{todayBeyt.poet}</Text>
        </ModalBody>
        <ModalFooter justifyContent='space-between'>
          <Button onClick={onCopy} colorScheme='twitter' variant='solid'>
            {hasCopied ? 'کپی‌شد!' : 'به اشتراک بذارید'}
          </Button>
          <Button colorScheme='yellow' variant='solid'>
            <Link href={todayBeyt.url} passHref>
              <a target='_blank'>متن کامل شعر</a>
            </Link>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WonGameModal
