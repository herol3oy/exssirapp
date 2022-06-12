import SortWords from '@/components/sortWords'
import TextHemistich from '@/components/textHemistich'
import WonGameModal from '@/components/wonGameModal'
import { useIsBrowser } from '@/hooks/useIsBrowser'
import {
  beytFirstPartWords,
  beytFirstPartWordsShuffled,
  beytSecondPartWords,
  beytSecondPartWordsShuffled,
  todayBeyt,
} from '@/utils/createPoemVariables'
import { Container, Flex, Text } from '@chakra-ui/react'
import {
  Children,
  Dispatch,
  ReactChild,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { motion } from 'framer-motion'
import Keypad from '@/components/keypad'
import PoemFirstPart from '@/components/poemFirstPart'

const GAME_LEVEL: number[] = Array.from(Array(3).keys(), (n) => n + 1)

const IndexPage = (): boolean | null | JSX.Element => {
  const [isGameFinished, isGameFinishedSet] = useState<boolean>(false)
  const [windowWidth, windowWidthSet] = useState<number>(0)
  const [windowHeight, windowHeightSet] = useState<number>(0)
  const [gameRound, gameRoundSet] = useState<number>(0)
  const [isBeytFirstPartAnswerCorrect, isBeytFirstPartAnswerCorrectSet] =
    useState<boolean>(false)

  const [userInputAnswer, userInputAnswerSet] = useState<string | undefined>('')

  const { isBrowser } = useIsBrowser()

  useEffect(() => {
    isBeytFirstPartAnswerCorrectSet(false)
    gameRound >= GAME_LEVEL.length
      ? isGameFinishedSet(true)
      : isGameFinishedSet(false)

    windowWidthSet(window.innerWidth)
    windowHeightSet(window.innerHeight)
  }, [gameRound, userInputAnswer, isBeytFirstPartAnswerCorrect])

  return !isBrowser ? null : (
    <Container maxW='full'>
      <Animation>
        <Flex
          flexDir='column'
          alignItems='center'
          justifyContent='center'
          h='calc(100vh - 70px)'
          fontSize={['1.2rem', '2rem', '2.2rem', '2.5rem']}
        >
          {MainGame(
            gameRound,
            gameRoundSet,
            isBeytFirstPartAnswerCorrect,
            userInputAnswer,
            userInputAnswerSet,
            isBeytFirstPartAnswerCorrectSet
          )}

          <Text color='GrayText' fontSize={16} mb='8'>
            {todayBeyt?.poet}
          </Text>
        </Flex>
      </Animation>
      <WonGameModal
        gameRoundSet={gameRoundSet}
        isGameFinished={isGameFinished}
        isGameFinishedSet={isGameFinishedSet}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      >
        {Children}
      </WonGameModal>
    </Container>
  )
}

const Animation = ({ children }: { children: ReactChild }): JSX.Element => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 20 }}
    transition={{ duration: 1.3 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {children}
  </motion.div>
)

const MainGame = (
  gameRound: number,
  gameRoundSet: Dispatch<SetStateAction<number>>,
  isBeytFirstPartAnswerCorrect: boolean,
  userInputAnswer: string | undefined,
  userInputAnswerSet: Dispatch<SetStateAction<string | undefined>>,
  isBeytFirstPartAnswerCorrectSet: Dispatch<SetStateAction<boolean>>
): (JSX.Element | undefined)[] =>
  GAME_LEVEL.map((level: number, levelIndex: number) => {
    if (level === 1 && gameRound === levelIndex) {
      return (
        <Animation key={level.toString()}>
          <>
            <SortWords
              gameLevel={GAME_LEVEL}
              gameRound={gameRound}
              gameRoundSet={gameRoundSet}
              hemistich={beytFirstPartWords}
              shuffleWords={beytFirstPartWordsShuffled}
            />
            <TextHemistich hemistich={beytSecondPartWords} />
          </>
        </Animation>
      )
    }
    if (level === 2 && gameRound === levelIndex) {
      return (
        <Animation key={level.toString()}>
          <>
            <TextHemistich hemistich={beytFirstPartWords} />
            <SortWords
              gameLevel={GAME_LEVEL}
              gameRound={gameRound}
              gameRoundSet={gameRoundSet}
              hemistich={beytSecondPartWords}
              shuffleWords={beytSecondPartWordsShuffled}
            />
          </>
        </Animation>
      )
    }
    if (level === 3 && gameRound === levelIndex) {
      return (
        <Animation key={level.toString()}>
          <>
            <PoemFirstPart
              isBeytFirstPartAnswerCorrect={isBeytFirstPartAnswerCorrect}
              isBeytFirstPartAnswerCorrectSet={isBeytFirstPartAnswerCorrectSet}
              userInputAnswer={userInputAnswer}
              userInputAnswerSet={userInputAnswerSet}
              gameRoundSet={gameRoundSet}
            />
            <TextHemistich hemistich={beytSecondPartWords} />
            <Container maxW='container.sm'>
              <Keypad userInputAnswerSet={userInputAnswerSet} />
            </Container>
          </>
        </Animation>
      )
    }
  })

export default IndexPage
