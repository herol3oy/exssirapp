import { Dispatch, ReactChildren, SetStateAction } from 'react'

export interface WonGameModalType {
  children: ReactChildren
  isGameFinished: boolean
  isGameFinishedSet: Dispatch<SetStateAction<boolean>>
  windowWidth: number
  windowHeight: number
}
