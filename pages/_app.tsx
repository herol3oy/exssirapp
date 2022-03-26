import Layout from '@/components/layout'
import { RtlProvider } from '@/utils/rtl-provider'
import customTheme from '@/utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <RtlProvider>
        <Layout>
          <>
            <Head>
              <title>اکسیر | هر روز سخنی از عشق</title>
              <meta
                name='viewport'
                content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
              />
            </Head>
            <Component {...pageProps} />
          </>
        </Layout>
      </RtlProvider>
    </ChakraProvider>
  )
}

export default MyApp
