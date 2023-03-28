import { Flex, Tag, TagLabel } from '@chakra-ui/react'
import arrayMove from 'array-move'
import { SecondHemistichType } from 'model/second-hemistich'
import { useEffect, useState } from 'react'
import SortableList, { SortableItem } from 'react-easy-sort'

const SecondHemistich = ({
  isBeytSecondPartAnswerCorrect,
  todayBeytRandomized,
  todayBeytRandomizedSet,
  beytSecondPartWords,
}: SecondHemistichType) => {
  const [firstWord, setFirstWord] = useState<boolean>(false)
  const [secondWord, setSecondWord] = useState<boolean>(false)
  const [thirdWord, setThirdWord] = useState<boolean>(false)
  const [fourthWord, setFourthWord] = useState<boolean>(false)
  const [fifthWord, setFifthWord] = useState<boolean>(false)

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    todayBeytRandomizedSet((array) => arrayMove(array, oldIndex, newIndex))
  }

  useEffect(() => {
    todayBeytRandomized[0] === beytSecondPartWords[0]
      ? setFirstWord(true)
      : setFirstWord(false)
    todayBeytRandomized[1] === beytSecondPartWords[1]
      ? setSecondWord(true)
      : setSecondWord(false)
    todayBeytRandomized[2] === beytSecondPartWords[2]
      ? setThirdWord(true)
      : setThirdWord(false)
    todayBeytRandomized[3] === beytSecondPartWords[3]
      ? setFourthWord(true)
      : setFourthWord(false)
    todayBeytRandomized[4] === beytSecondPartWords[4]
      ? setFifthWord(true)
      : setFifthWord(false)
  }, [todayBeytRandomized, beytSecondPartWords])

  return (
    <Flex m={6}>
      <SortableList
        lockAxis='x'
        allowDrag={isBeytSecondPartAnswerCorrect ? false : true}
        style={{ display: 'flex' }}
        onSortEnd={onSortEnd}
      >
        {todayBeytRandomized.map((word: string, wordIndex: number) => (
          <SortableItem key={`${word}${Math.random().toString()}`}>
            <Tag
              size='xl'
              borderRadius='full'
              variant='solid'
              p={3}
              mr={2}
              bg={
                (firstWord && wordIndex === 0) ||
                (secondWord && wordIndex === 1) ||
                (thirdWord && wordIndex === 2) ||
                (fourthWord && wordIndex === 3) ||
                (fifthWord && wordIndex === 4)
                  ? 'green.300'
                  : 'gray'
              }
              cursor='grab'
            >
              <TagLabel>{word}</TagLabel>
            </Tag>
          </SortableItem>
        ))}
      </SortableList>
    </Flex>
  )
}

export default SecondHemistich
