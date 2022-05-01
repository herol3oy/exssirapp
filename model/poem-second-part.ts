import { Dispatch, SetStateAction } from 'react'

export interface PoemSecondPartType {
  isBeytSecondPartAnswerCorrect: boolean
  todayBeytRandomized: string[]
  todayBeytRandomizedSet: Dispatch<SetStateAction<string[]>>
  beytSecondPartWords: string[]
}
