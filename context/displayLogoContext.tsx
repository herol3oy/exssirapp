import {
  ReactElement,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react'

export type ShouldDisplayLogo = [boolean, Dispatch<SetStateAction<boolean>>]

interface ComponentChildren {
  children: ReactElement
}

const initialValue: ShouldDisplayLogo = [false, () => {}]
export const DisplayLogoContext = createContext(initialValue)

const DisplayLogo = ({ children }: ComponentChildren) => {
  return (
    <DisplayLogoContext.Provider value={useState<boolean>(false)}>
      {children}
    </DisplayLogoContext.Provider>
  )
}

export default DisplayLogo
