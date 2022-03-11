import {
  answerHintPlaceholder,
  beytFirstPartAnswer,
  beytFirstPartWords,
} from '@/utils/createPoemVariables'
import { Flex, Input, Text } from '@chakra-ui/react'
import { PoemFirstPartType } from 'model/poem-first-part'

const PoemFirstPart = ({
  isBeytFirstPartAnswerCorrect,
  userInputAnswer,
  userInputAnswerSet,
}: PoemFirstPartType): JSX.Element => {
  return (
    <Flex alignItems={['flex-end', 'flex-start']}>
      {beytFirstPartWords?.map((word: string) =>
        word === beytFirstPartAnswer ? (
          <Input
            key={word}
            borderBottomColor={isBeytFirstPartAnswerCorrect ? 'green' : ''}
            textAlign='center'
            fontWeight={900}
            variant='flushed'
            disabled={isBeytFirstPartAnswerCorrect}
            placeholder={answerHintPlaceholder}
            color={isBeytFirstPartAnswerCorrect ? 'green' : 'gray'}
            value={userInputAnswer}
            onChange={(e) => userInputAnswerSet(e.target.value)}
          />
        ) : (
          <Text mr={2} color='GrayText' key={word}>
            {word}
          </Text>
        )
      )}
    </Flex>
  )
}

export default PoemFirstPart
