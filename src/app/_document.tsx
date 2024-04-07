// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Adicione os links para as cinco fontes do Google Fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Inter:slnt,wght@-10..0,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Roboto+Condensed:ital,wght@0,600;1,600&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
