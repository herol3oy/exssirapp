import SortWords from '@/components/sortWords'
import TextHemistich from '@/components/hemistich'
import WonGameModal from '@/components/wonGameModal'
import { useIsBrowser } from '@/hooks/useIsBrowser'
import {
  firstHemistichWords,
  firstHemistichWordsShuffled,
  secondHemistichWords,
  secondHemistichWordsShuffled,
  todayVerse,
} from '@/utils/create-poem-variables'
import {
  Container,
  Flex,
  Text,
  Image,
  Box,
  Heading,
  TagLabel,
  Tag,
} from '@chakra-ui/react'
import {
  Children,
  Dispatch,
  ReactChild,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { motion } from 'framer-motion'
import Keypad from '@/components/keypad'
import FirstHemistich from '@/components/firstHemistich'
import DisplayLogo, { DisplayLogoContext } from 'context/displayLogoContext'

const GAME_LEVEL: number[] = Array.from(Array(3).keys(), (n) => n + 1)

const IndexPage = (): boolean | null | JSX.Element => {
  const [isGameFinished, isGameFinishedSet] = useState<boolean>(false)
  const [gameRound, gameRoundSet] = useState<number>(0)
  const [isFirstHemistichAnswerCorrect, isFirstHemistichAnswerCorrectSet] =
    useState<boolean>(false)
  const [userInputAnswer, userInputAnswerSet] = useState<string | undefined>('')

  const { isBrowser } = useIsBrowser()
  const [displayLogo, displayLogoSet] =
    useContext<DisplayLogo>(DisplayLogoContext)

  useEffect(() => {
    isFirstHemistichAnswerCorrectSet(false)
    gameRound >= GAME_LEVEL.length
      ? isGameFinishedSet(true)
      : isGameFinishedSet(false)
  }, [gameRound, userInputAnswer, isFirstHemistichAnswerCorrect])

  return !isBrowser ? null : (
    <Container
      maxW='full'
      height='90vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box display={displayLogo ? 'none' : ''}>
        <Image
          animation='updown 10s ease-in-out infinite'
          cursor='pointer'
          src='new-logo.jpg'
          alt='exssir logo'
          onClick={() => displayLogoSet(true)}
        />
      </Box>
      <Box display={displayLogo ? '' : 'none'}>
        <Animation>
          <Flex
            flexDir='column'
            alignItems='center'
            justifyContent='center'
            h='calc(100vh - 70px)'
            fontSize={['1.2rem', '2rem', '2.2rem', '2.5rem']}
          >
            <Tag
              size='lg'
              borderRadius='full'
              variant='solid'
              colorScheme='green'
            >
              <TagLabel dir='ltr'>
                <Heading size={'lg'}>
                  {`${(gameRound + 1).toLocaleString('fa-IR')} / ۳`}
                </Heading>
              </TagLabel>
            </Tag>
            {MainGame(
              gameRound,
              gameRoundSet,
              isFirstHemistichAnswerCorrect,
              userInputAnswer,
              userInputAnswerSet,
              isFirstHemistichAnswerCorrectSet
            )}
          </Flex>
        </Animation>
      </Box>
      <WonGameModal
        gameRoundSet={gameRoundSet}
        isGameFinished={isGameFinished}
        isGameFinishedSet={isGameFinishedSet}
      >
        {Children}
      </WonGameModal>
      <style global jsx>{`
        body {
          background-color: #eee1d1 !important;
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
  isFirstHemistichAnswerCorrect: boolean,
  userInputAnswer: string | undefined,
  userInputAnswerSet: Dispatch<SetStateAction<string | undefined>>,
  isFirstHemistichAnswerCorrectSet: Dispatch<SetStateAction<boolean>>
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
              hemistich={firstHemistichWords}
              shuffleWords={firstHemistichWordsShuffled}
            />
            <TextHemistich hemistich={secondHemistichWords} />
            <Text color='GrayText' fontSize={16} mb='8'>
              {todayVerse?.poet}
            </Text>
          </>
        </Animation>
      )
    }
    if (level === GAME_LEVEL[1] && gameRound === levelIndex) {
      return (
        <Animation key={level.toString()}>
          <>
            <TextHemistich hemistich={firstHemistichWords} />
            <SortWords
              gameLevel={GAME_LEVEL}
              gameRound={gameRound}
              gameRoundSet={gameRoundSet}
              hemistich={secondHemistichWords}
              shuffleWords={secondHemistichWordsShuffled}
            />
            <Text color='GrayText' fontSize={16} mb='8'>
              {todayVerse?.poet}
            </Text>
          </>
        </Animation>
      )
    }
    if (level === GAME_LEVEL[2] && gameRound === levelIndex) {
      return (
        <Animation key={level.toString()}>
          <>
            <FirstHemistich
              isFirstHemistichAnswerCorrect={isFirstHemistichAnswerCorrect}
              isFirstHemistichAnswerCorrectSet={
                isFirstHemistichAnswerCorrectSet
              }
              userInputAnswer={userInputAnswer}
              userInputAnswerSet={userInputAnswerSet}
              gameRoundSet={gameRoundSet}
            />
            <TextHemistich hemistich={secondHemistichWords} />
            <Text color='GrayText' fontSize={16} mb='8'>
              {todayVerse?.poet}
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
