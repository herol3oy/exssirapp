import Keypad from '@/components/keypad'
import PoemFirstPart from '@/components/poemFirstPart'
import PoemSecondPart from '@/components/poemSecondPart'
import WonGameModal from '@/components/wonGameModal'
import { useIsBrowser } from '@/hooks/useIsBrowser'
import { arrayEquals } from '@/utils/arrayEquals'
import {
  beytFirstPartAnswer,
  beytSecondPartWords,
  beytSecondPartWordsShuffled,
  todayBeyt,
} from '@/utils/createPoemVariables'
import { Container, Flex, Text } from '@chakra-ui/react'
import { Children, useEffect, useState } from 'react'
import Confetti from 'react-confetti'

const IndexPage: () => boolean | JSX.Element = () => {
  const [userInputAnswer, userInputAnswerSet] = useState<string | undefined>('')
  const [isBeytFirstPartAnswerCorrect, isBeytFirstPartAnswerCorrectSet] =
    useState<boolean>(false)
  const [isBeytSecondPartAnswerCorrect, isBeytSecondPartAnswerCorrectSet] =
    useState<boolean>(false)
  const [todayBeytRandomized, todayBeytRandomizedSet] = useState<string[]>(
    beytSecondPartWordsShuffled
  )
  const [isGameFinished, isGameFinishedSet] = useState<boolean>(false)
  const [windowWidth, windowWidthSet] = useState<number>(0)
  const [windowHeight, windowHeightSet] = useState<number>(0)

  const { isBrowser } = useIsBrowser()

  useEffect(() => {
    windowWidthSet(window.innerWidth)
    windowHeightSet(window.innerHeight)
    isBeytFirstPartAnswerCorrectSet(false)
    isBeytSecondPartAnswerCorrectSet(false)
    isGameFinishedSet(false)

    if (arrayEquals(todayBeytRandomized, beytSecondPartWords)) {
      isBeytSecondPartAnswerCorrectSet(true)
    }

    if (beytFirstPartAnswer === userInputAnswer) {
      isBeytFirstPartAnswerCorrectSet(true)
      localStorage.setItem('answer', userInputAnswer)
    } else {
      isBeytFirstPartAnswerCorrectSet(false)
    }

    if (isBeytFirstPartAnswerCorrect && isBeytSecondPartAnswerCorrect) {
      isGameFinishedSet(true)
    }
  }, [
    userInputAnswer,
    isBeytFirstPartAnswerCorrect,
    isBeytSecondPartAnswerCorrect,
    todayBeytRandomized,
  ])

  return (
    isBrowser && (
      <Container maxW='full'>
        {isGameFinished && (
          <Confetti recycle={false} height={windowHeight} width={windowWidth} />
        )}
        <Flex
          flexDir='column'
          alignItems='center'
          justifyContent='center'
          h='calc(100vh - 70px)'
          fontSize={['1.2rem', '2rem', '2.2rem', '2.5rem']}
        >
          <PoemFirstPart
            isBeytFirstPartAnswerCorrect={isBeytFirstPartAnswerCorrect}
            userInputAnswer={userInputAnswer}
            userInputAnswerSet={userInputAnswerSet}
          />
          <PoemSecondPart
            todayBeytRandomizedSet={todayBeytRandomizedSet}
            isBeytSecondPartAnswerCorrect={isBeytSecondPartAnswerCorrect}
            todayBeytRandomized={todayBeytRandomized}
          />
          <Text color='GrayText' fontSize={16} mb='8'>
            {todayBeyt?.poet}
          </Text>
          <Container maxW='container.sm'>
            <Keypad userInputAnswerSet={userInputAnswerSet} />
          </Container>
        </Flex>
        <WonGameModal
          isGameFinished={isGameFinished}
          isGameFinishedSet={isGameFinishedSet}
        >
          {Children}
        </WonGameModal>
      </Container>
    )
  )
}

export default IndexPage
