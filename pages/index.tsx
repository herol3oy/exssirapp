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

const GAME_LEVEL: number[] = [1, 2, 3, 4]

const IndexPage = (): boolean | null | JSX.Element => {
  const [isGameFinished, isGameFinishedSet] = useState<boolean>(false)
  const [windowWidth, windowWidthSet] = useState<number>(0)
  const [windowHeight, windowHeightSet] = useState<number>(0)
  const [gameRound, gameRoundSet] = useState<number>(0)

  const { isBrowser } = useIsBrowser()

  useEffect(() => {
    gameRound >= GAME_LEVEL.length
      ? isGameFinishedSet(true)
      : isGameFinishedSet(false)
    windowWidthSet(window.innerWidth)
    windowHeightSet(window.innerHeight)
  }, [gameRound])

  return !isBrowser ? null : (
    <Container maxW='full'>
      {gameRound}
      <Animation>
        <Flex
          flexDir='column'
          alignItems='center'
          justifyContent='center'
          h='calc(100vh - 70px)'
          fontSize={['1.2rem', '2rem', '2.2rem', '2.5rem']}
        >
          {MainGame(gameRound, gameRoundSet)}

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
  gameRoundSet: Dispatch<SetStateAction<number>>
): (JSX.Element | undefined)[] =>
  GAME_LEVEL.map((level: number, levelIndex: number) => {
    if (level % 2 && gameRound === levelIndex) {
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
    if (!(level % 2) && gameRound === levelIndex) {
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
  })

export default IndexPage
