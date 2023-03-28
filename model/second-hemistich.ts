import { Dispatch, SetStateAction } from 'react'

export interface SecondHemistichType {
  isBeytSecondPartAnswerCorrect: boolean
  todayBeytRandomized: string[]
  todayBeytRandomizedSet: Dispatch<SetStateAction<string[]>>
  beytSecondPartWords: string[]
}
