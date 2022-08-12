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
import { Container, Flex, Text, Image, Box } from '@chakra-ui/react'
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
  }, [gameRound, userInputAnswer, isBeytFirstPartAnswerCorrect])

  return !isBrowser ? null : (
    <Container
      maxW='full'
      height='90vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Image
        animation='updown 10s ease-in-out infinite'
        src='Main_Page2.jpg'
        // h='sm'
        alt='exssir logo'
      />
      {/* <Animation>
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
        </Flex>
      </Animation>
      <WonGameModal
        gameRoundSet={gameRoundSet}
        isGameFinished={isGameFinished}
        isGameFinishedSet={isGameFinishedSet}
      >
        {Children}
      </WonGameModal> */}
      <style global jsx>{`
        body {
          background-color: #d2c18d !important;
        }
        @keyframes updown {
          0% {
            transform: translateY(-30px);
          }

          50% {
            transform: translateY(0);
          }

          100% {
            transform: translateY(-30px);
          }
        }
      `}</style>
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
    if (level === GAME_LEVEL[0] && gameRound === levelIndex) {
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
            <Text color='GrayText' fontSize={16} mb='8'>
              {todayBeyt?.poet}
            </Text>
          </>
        </Animation>
      )
    }
    if (level === GAME_LEVEL[1] && gameRound === levelIndex) {
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
            <Text color='GrayText' fontSize={16} mb='8'>
              {todayBeyt?.poet}
            </Text>
          </>
        </Animation>
      )
    }
    if (level === GAME_LEVEL[2] && gameRound === levelIndex) {
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
            <Text color='GrayText' fontSize={16} mb='8'>
              {todayBeyt?.poet}
            </Text>
            <Container maxW='container.sm'>
              <Keypad userInputAnswerSet={userInputAnswerSet} />
            </Container>
          </>
        </Animation>
      )
    }
  })

export default IndexPage
