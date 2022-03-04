import { ReactChild } from 'react'
import Navbar from './navbar'

export default function Layout({ children }: { children: ReactChild }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
