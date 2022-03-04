import Layout from '@/components/layout'
import { RtlProvider } from '@/utils/rtl-provider'
import customTheme from '@/utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <RtlProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RtlProvider>
    </ChakraProvider>
  )
}

export default MyApp
