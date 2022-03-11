import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const customTheme: ThemeConfig = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: () => ({
      body: {
        color: '#fff',
        fontFamily: "'Vazir', sans-serif;",
        fontSize: '1.3rem',
        fontWeight: 900,
      },
      span: {
        fontWeight: 900,
      },
    }),
  },
})

export default customTheme
