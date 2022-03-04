import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtl from 'stylis-plugin-rtl'
import { ReactChild } from 'react'
import { useRouter } from 'next/router'

const options = {
  rtl: { key: 'css-fa', stylisPlugins: [rtl] },
  ltr: { key: 'css-en' },
}

export function RtlProvider({ children }: { children: ReactChild }) {
  const { locale } = useRouter()
  const dir = locale == 'fa' ? 'rtl' : 'ltr'
  const cache = createCache(options[dir])
  return <CacheProvider value={cache}>{children}</CacheProvider>
}
