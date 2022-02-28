import { useEffect, useState } from 'react'

export const useIsBrowser: () => { isBrowser: boolean } = () => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false)

  useEffect(() => {
    const canUseInBrowser: boolean = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
    setIsBrowser(canUseInBrowser)
  }, [])
  return { isBrowser }
}
