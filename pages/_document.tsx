import { ColorModeScript, theme } from '@chakra-ui/react'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html dir='rtl' lang='fa'>
        <Head>
          <meta
            name='description'
            content='روز خود را با سخنی جاودانه شروع کنید'
          />
          <link
            href='icons/logo192.png'
            rel='icon'
            type='image/png'
            sizes='192x192'
          />
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
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='keywords' content='شعر، ادبیات' />
          <link rel='manifest' href='/manifest.json' />
          <link
            href='/icons/logo192.png'
            rel='icon'
            type='image/png'
            sizes='192x192'
          />
          <link
            href='/icons/logo512.png'
            rel='icon'
            type='image/png'
            sizes='512x512'
          />
          <link rel='apple-touch-icon' href='/icons/logo512.png'></link>
          <meta name='theme-color' content='lightgreen' />

          <meta property='og:title' content='اکسیر | هر روز سخنی از عشق' />
          <meta
            property='og:image'
            content='https://res.cloudinary.com/dxu6gcib2/image/upload/v1650110764/exssir/exssir-card-thumbnail_z0jtdm.png'
          />
          <meta
            property='og:description'
            content='هر ۲۴ ساعت یک بیت شعر مرور کنید'
          />
          <meta property='og:url' content='https://exss.ir' />
          <meta property='og:type' content='website' />

          <meta name='twitter:title' content='اکسیر | هر روز سخنی از عشق' />
          <meta
            name='twitter:image'
            content='https://res.cloudinary.com/dxu6gcib2/image/upload/v1650110764/exssir/exssir-card-thumbnail_z0jtdm.png'
          />
          <meta
            name='twitter:description'
            content='هر ۲۴ ساعت یک بیت شعر مرور کنید'
          />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='exss.ir' />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
