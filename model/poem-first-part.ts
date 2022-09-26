import { Dispatch, SetStateAction } from 'react'

export interface PoemFirstPartType {
  isBeytFirstPartAnswerCorrect: boolean
  isBeytFirstPartAnswerCorrectSet: Dispatch<SetStateAction<boolean>>
  userInputAnswer: string | undefined
  userInputAnswerSet: Dispatch<SetStateAction<string | undefined>>
  gameRoundSet: Dispatch<SetStateAction<number>>
}
