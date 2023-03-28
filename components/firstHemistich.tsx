import {
  answerHintPlaceholder,
  firstHemistichAnswer,
  firstHemistichWords,
} from '@/utils/create-poem-variables'
import { Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { FirstHemistichType } from 'model/first-hemistich'
import { ChangeEvent, useEffect } from 'react'

const FirstHemistich = ({
  isFirstHemistichAnswerCorrect,
  isFirstHemistichAnswerCorrectSet,
  userInputAnswer,
  userInputAnswerSet,
  gameRoundSet,
}: FirstHemistichType): JSX.Element => {
  useEffect(() => {
    if (firstHemistichAnswer === userInputAnswer) {
      isFirstHemistichAnswerCorrectSet(true)
      gameRoundSet(3)
    } else {
      isFirstHemistichAnswerCorrectSet(false)
    }
  }, [gameRoundSet, isFirstHemistichAnswerCorrectSet, userInputAnswer])

  return (
    <Flex alignItems={['flex-end', 'flex-start']}>
      {firstHemistichWords?.map((word: string) =>
        word === firstHemistichAnswer ? (
          <FormControl key={word}>
            <Input
              _placeholder={{ color: 'black' }}
              key={word}
              borderBottomColor={
                isFirstHemistichAnswerCorrect ? 'green.300' : ''
              }
              textAlign='center'
              fontWeight={900}
              variant='flushed'
              disabled
              placeholder={answerHintPlaceholder}
              color={isFirstHemistichAnswerCorrect ? 'green.300' : 'black'}
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
              display={isFirstHemistichAnswerCorrect ? 'none' : 'block'}
              opacity={userInputAnswer ? 1 : 0}
              border='solid 1px orange'
              borderRadius='15px'
              p='3px'
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

export default FirstHemistich
