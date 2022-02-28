import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='fa' dir='rtl'>
      <Head>
        <title>اکسیر | هر روز سخنی از عشق</title>
        <meta
          name='description'
          content='روز خود را با سخنی جاودانه شروع کنید'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css'
          rel='stylesheet'
          type='text/css'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Lalezar&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
