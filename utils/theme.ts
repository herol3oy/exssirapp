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
      '.hg-button': {
        borderRadius: '20px',
        color: 'gray',
        fontSize: '0.9rem',
        fontFamily: "'Vazir', sans-serif;",
        padding: '40px',
      },

      '.simple-keyboard.hg-layout-default .hg-button.hg-bksp': {
        background: 'gray',
        color: 'white',
      },
      '.simple-keyboard.hg-theme-default.myTheme': {
        padding: '8px',
        borderRadius: '20px',
        margin: '10px',
        width: 'calc(100% - 20px)',
      },
    }),
  },
})

export default customTheme
