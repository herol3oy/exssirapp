import { Dispatch, SetStateAction } from 'react'

export interface PoemFirstPartType {
  isBeytFirstPartAnswerCorrect: boolean
  userInputAnswer: string | undefined
  userInputAnswerSet: Dispatch<SetStateAction<string | undefined>>
}
