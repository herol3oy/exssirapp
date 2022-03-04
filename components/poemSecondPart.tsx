import { Flex, Tag, TagLabel } from '@chakra-ui/react'
import { PoemSecondPartType } from 'model/poem-second-part'
import SortableList, { SortableItem } from 'react-easy-sort'
import arrayMove from 'array-move'

const PoemSecondPart = ({
  isBeytSecondPartAnswerCorrect,
  todayBeytRandomized,
  todayBeytRandomizedSet,
}: PoemSecondPartType) => {
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    todayBeytRandomizedSet((array) => arrayMove(array, oldIndex, newIndex))
  }
  return (
    <Flex m={6}>
      <SortableList
        lockAxis='x'
        allowDrag={isBeytSecondPartAnswerCorrect ? false : true}
        style={{ display: 'flex', direction: 'ltr' }}
        onSortEnd={onSortEnd}
        className='list'
        draggedItemClassName='dragged'
      >
        {todayBeytRandomized.map((word: string) => (
          <SortableItem key={`${word}${Math.random().toString()}`}>
            <Tag
              size='xl'
              borderRadius='full'
              variant='solid'
              p={3}
              mr={1}
              colorScheme={isBeytSecondPartAnswerCorrect ? 'green' : 'gray'}
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

export default PoemSecondPart
