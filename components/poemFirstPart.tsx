import {
  answerHintPlaceholder,
  beytFirstPartAnswer,
  beytFirstPartWords,
} from '@/utils/createPoemVariables'
import { Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { PoemFirstPartType } from 'model/poem-first-part'
import { ChangeEvent } from 'react'
import 'react-simple-keyboard/build/css/index.css'

const PoemFirstPart = ({
  isBeytFirstPartAnswerCorrect,
  userInputAnswer,
  userInputAnswerSet,
}: PoemFirstPartType): JSX.Element => {
  return (
    <Flex alignItems={['flex-end', 'flex-start']}>
      {beytFirstPartWords?.map((word: string) =>
        word === beytFirstPartAnswer ? (
          <FormControl>
            <Input
              key={word}
              borderBottomColor={
                isBeytFirstPartAnswerCorrect ? 'green.300' : ''
              }
              textAlign='center'
              fontWeight={900}
              variant='flushed'
              disabled
              placeholder={answerHintPlaceholder}
              color={isBeytFirstPartAnswerCorrect ? 'green.300' : 'gray'}
              value={userInputAnswer}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                userInputAnswerSet(e.target.value)
              }
              fontSize={['1.2rem', '2rem', '2.2rem', '2.5rem']}
              maxW='250px'
              mr={2}
              p={6}
              maxLength={5}
            />
            <FormLabel
              htmlFor='text'
              position='absolute'
              top={0}
              right='15px'
              transition='opacity 0.2s ease-in-out'
              fontSize='xs'
              opacity={userInputAnswer ? 1 : 0}
              border='solid 1px orange'
              borderRadius='15px'
              p='1'
              bg='orange'
            >
              {answerHintPlaceholder}
            </FormLabel>
          </FormControl>
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
