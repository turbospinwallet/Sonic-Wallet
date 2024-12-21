import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { WagmiConfig } from 'wagmi';
import Head from 'next/head';
import { wagmiConfig } from '@/common/connectors';
import NoAuthLayout from '@/layouts/AuthLayout/NoAuthLayout';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import Providers from '@/Providers';
import { roboto } from '@/common/constants/fonts';
import PasswordVerification from '@/components/PasswordVerification/PasswordVerification';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';

const ROUTE_AUTH = [
  '/dapp/wallet',
  '/dapp/claim',
  '/dapp/account',
  '/dapp/credential',
  '/dapp/transfer',
  '/dapp/import-account',
  '/dapp/coming-soon',
  '/dapp/token/[chainId]/[address]',
];
const ROUTE_EMPTY = ['/', '/dapp/restore-vault'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  const getLayout = () => {
    if (ROUTE_AUTH.includes(pathname)) {
      return (
        <AuthLayout>
          <PasswordVerification>
            <Component {...pageProps} />
          </PasswordVerification>
        </AuthLayout>
      );
    }

    if (ROUTE_EMPTY.includes(pathname)) {
      return <Component {...pageProps} />;
    }

    return (
      <NoAuthLayout>
        <Component {...pageProps} />
      </NoAuthLayout>
    );
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <Providers pageProps={pageProps}>
        <Head>
          <title>Turbo Spin Wallet</title>
          <meta
            name="description"
            content={`Turbo Spin Wallet - The next Web3 Wallet generation designed to spark and speed up
              your investment journey`}
          />
          <link
            rel="icon"
            href="/images/logo.png"
          />

          {/* Open Graph meta tags */}
          <meta
            property="og:title"
            content="Turbo Spin Wallet"
          />
          <meta
            property="og:description"
            content="Turbo Spin Wallet - The next Web3 Wallet generation designed to spark and speed up your investment journey"
          />
          <meta
            property="og:image"
            content="/images/og-image.png"
          />
          {/* <meta
            property="og:url"
            content="https://turbospinwallet.com"
          /> */}
          <meta
            property="og:type"
            content="website"
          />

          {/* Twitter meta tags */}
          <meta
            name="twitter:card"
            content="summary_large_image"
          />
          <meta
            name="twitter:title"
            content="Turbo Spin Wallet"
          />
          <meta
            name="twitter:description"
            content="Turbo Spin Wallet - The next Web3 Wallet generation designed to spark and speed up your investment journey"
          />
          <meta
            name="twitter:image"
            content="/images/og-image.png"
          />
        </Head>
        <style
          jsx
          global
        >{`
          :root {
            --font-roboto: ${roboto.style.fontFamily};
          }

          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}</style>
        {getLayout()}
        <ToastContainer />
      </Providers>
    </WagmiConfig>
  );
}
