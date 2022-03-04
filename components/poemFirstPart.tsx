import {
  answerHintPlaceholder,
  beytFirstPartAnswer,
  beytFirstPartWords,
} from '@/utils/createPoemVariables'
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { PoemFirstPartType } from 'model/poem-first-part'
import { FaCheck } from 'react-icons/fa'

const PoemFirstPart = ({
  isBeytFirstPartAnswerCorrect,
  userInputAnswer,
  userInputAnswerSet,
}: PoemFirstPartType) => {
  return (
    <Flex alignItems='flex-end'>
      {beytFirstPartWords?.map((word: string) =>
        word === beytFirstPartAnswer ? (
          <InputGroup key={`${word}${Math.random().toString()}`}>
            <Input
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
            <InputRightElement>
              <FaCheck color={isBeytFirstPartAnswerCorrect ? 'green' : ''} />
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
  )
}

export default PoemFirstPart
