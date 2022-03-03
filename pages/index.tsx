import Navbar from '@/components/navbar'
import { useIsBrowser } from '@/hooks/useIsBrowser'
import { arrayEquals } from '@/utils/arrayEquals'
import {
  answerHintPlaceholder,
  beytFirstPartAnswer,
  beytFirstPartWords,
  beytSecondPartWords,
  beytSecondPartWordsShuffled,
  todayBeyt,
} from '@/utils/createPoemVariables'
import {
  Container,
  Flex,
  TagLabel,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
} from '@chakra-ui/react'
import arrayMove from 'array-move'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import SortableList, { SortableItem } from 'react-easy-sort'
import { FaCheck } from 'react-icons/fa'

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

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    todayBeytRandomizedSet((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    isBrowser && (
      <Container maxW='full'>
        <Navbar />
        {isGameFinished && <Confetti recycle={false} />}
        <Flex
          flexDir='column'
          alignItems='center'
          justifyContent='center'
          h='calc(100vh - 70px)'
          w='100%'
        >
          <Flex alignItems='flex-end'>
            {beytFirstPartWords?.map((word: string) =>
              word === beytFirstPartAnswer ? (
                <InputGroup key={`${word}${Math.random().toString()}`}>
                  <Input
                    borderBottomColor={
                      isBeytFirstPartAnswerCorrect ? 'green' : ''
                    }
                    textAlign='center'
                    fontWeight={900}
                    variant='flushed'
                    disabled={isBeytFirstPartAnswerCorrect}
                    placeholder={answerHintPlaceholder}
                    autoFocus
                    color={isBeytFirstPartAnswerCorrect ? 'green' : 'gray'}
                    value={userInputAnswer}
                    onChange={(e) => userInputAnswerSet(e.target.value)}
                  />
                  <InputRightElement>
                    <FaCheck
                      color={isBeytFirstPartAnswerCorrect ? 'green' : ''}
                    />
                  </InputRightElement>
                </InputGroup>
              ) : (
                <Text
                  mr={2}
                  color='GrayText'
                  cursor='grab'
                  key={`${word}${Math.random().toString()}`}
                >
                  {word}
                </Text>
              )
            )}
          </Flex>
          <Flex m={6}>
            <SortableList
              lockAxis='x'
              style={{ display: 'flex', direction: 'ltr' }}
              onSortEnd={onSortEnd}
              className='list'
              draggedItemClassName='dragged'
            >
              {todayBeytRandomized.map((word) => (
                <SortableItem key={`${word}${Math.random().toString()}`}>
                  <Tag
                    size='xl'
                    borderRadius='full'
                    variant='solid'
                    p={3}
                    mr={1}
                    colorScheme={
                      isBeytSecondPartAnswerCorrect ? 'green' : 'gray'
                    }
                    cursor='grab'
                  >
                    <TagLabel>{word}</TagLabel>
                  </Tag>
                </SortableItem>
              ))}
            </SortableList>
          </Flex>
          <Text fontSize={16} mt='8'>
            {todayBeyt?.poet}
          </Text>
        </Flex>
      </Container>
    )
  )
}

export default IndexPage
