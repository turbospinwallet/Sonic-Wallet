import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*<link*/}
        {/*  rel="icon"*/}
        {/*  type="image/png"*/}
        {/*  href="/favicon.png"*/}
        {/*/>*/}
      </Head>
      <body className="bg-color-bg text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
