import PoemFirstPart from '@/components/poemFirstPart'
import PoemSecondPart from '@/components/poemSecondPart'
import { useIsBrowser } from '@/hooks/useIsBrowser'
import { arrayEquals } from '@/utils/arrayEquals'
import {
  beytFirstPartAnswer,
  beytSecondPartWords,
  beytSecondPartWordsShuffled,
  todayBeyt,
} from '@/utils/createPoemVariables'
import { Container, Flex, Text } from '@chakra-ui/react'
import arrayMove from 'array-move'
import { useEffect, useState } from 'react'
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

  const { isBrowser } = useIsBrowser()

  useEffect(() => {
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
        {isGameFinished && <Confetti recycle={false} />}
        <Flex
          flexDir='column'
          alignItems='center'
          justifyContent='center'
          h='calc(100vh - 70px)'
          w='100%'
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
          <Text fontSize={16} mt='8'>
            {todayBeyt?.poet}
          </Text>
        </Flex>
      </Container>
    )
  )
}

export default IndexPage
