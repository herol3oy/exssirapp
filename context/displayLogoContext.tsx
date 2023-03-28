import { ComponentChildren } from '@/model/component-children'
import { useState, createContext } from 'react'
import { DisplayLogo } from '../model/display-logo'

const initialValue: DisplayLogo = [false, () => {}]

export const DisplayLogoContext = createContext(initialValue)

const DisplayLogo = ({ children }: ComponentChildren) => {
  return (
    <DisplayLogoContext.Provider value={useState<boolean>(false)}>
      {children}
    </DisplayLogoContext.Provider>
  )
}

export default DisplayLogo
