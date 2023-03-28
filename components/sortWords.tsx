import { arrayEqual } from '@/utils/array-equal'
import { Flex, Tag, TagLabel } from '@chakra-ui/react'
import arrayMove from 'array-move'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SortableList, { SortableItem } from 'react-easy-sort'

const SortWords = ({
  gameLevel,
  gameRound,
  gameRoundSet,
  hemistich,
  shuffleWords,
}: {
  gameLevel: number[]
  gameRound: number
  gameRoundSet: Dispatch<SetStateAction<number>>
  hemistich: string[]
  shuffleWords: string[]
}): JSX.Element => {
  const [todayBeytRandomized, todayBeytRandomizedSet] =
    useState<string[]>(shuffleWords)

  useEffect(() => {
    arrayEqual(todayBeytRandomized, hemistich) && gameRoundSet(gameRound + 1)
  }, [todayBeytRandomized, hemistich, gameRound, gameRoundSet])

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    todayBeytRandomizedSet((array) => arrayMove(array, oldIndex, newIndex))
  }
  return (
    <Flex m={6}>
      <SortableList
        lockAxis='x'
        allowDrag={gameRound === gameLevel.length ? false : true}
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
              bg={word === hemistich[wordIndex] ? 'green.300' : 'gray'}
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

export default SortWords
