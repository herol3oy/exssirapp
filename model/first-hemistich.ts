import { Dispatch, SetStateAction } from 'react'

export interface FirstHemistichType {
  isFirstHemistichAnswerCorrect: boolean
  isFirstHemistichAnswerCorrectSet: Dispatch<SetStateAction<boolean>>
  userInputAnswer: string | undefined
  userInputAnswerSet: Dispatch<SetStateAction<string | undefined>>
  gameRoundSet: Dispatch<SetStateAction<number>>
}
