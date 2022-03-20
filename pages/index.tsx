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
import { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import Keyboard from 'react-simple-keyboard'

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
  const keyboard = useRef(null)

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
            <Keyboard
              maxLength={5}
              theme={'hg-theme-default hg-layout-default myTheme'}
              layout={{
                default: [
                  'چ ج ح خ ه ع غ ف ق ث ص ض',
                  'گ ک م ن ت ا ل ب ی س ش',
                  '{bksp} و پ د ذ ر ز ژ ط ظ',
                ],
              }}
              display={{
                '{bksp}': `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path fill="white" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
              </svg>`,
              }}
              keyboardRef={(r: null) => (keyboard.current = r)}
              onChange={userInputAnswerSet}
              buttonTheme={[
                {
                  class: 'hg-bksp',
                  buttons: '{bksp}',
                },
              ]}
            />
          </Container>
        </Flex>
      </Container>
    )
  )
}

export default IndexPage
