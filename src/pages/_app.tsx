import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { WagmiConfig } from 'wagmi';
import Head from 'next/head';
import { useEffect } from 'react';
import { wagmiConfig } from '@/common/connectors';
import NoAuthLayout from '@/layouts/AuthLayout/NoAuthLayout';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import Providers from '@/Providers';
import { roboto } from '@/common/constants/fonts';
import PasswordVerification from '@/components/PasswordVerification/PasswordVerification';
import { useNetworkStore } from '@/stores/networkStore';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';
import useClaimInfo from '@/hooks/useClaimInfo';
import useUserClaimInfo from '@/hooks/useUserClaimInfo';
import useGameInfo from '@/hooks/useGameInfo';

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

function GlobalHooks() {
  useGameInfo();
  useUserClaimInfo();
  useClaimInfo();
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  const { setCurrentChainId } = useNetworkStore();

  useEffect(() => {
    // Listen for network changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(parseInt(chainId));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', setCurrentChainId);
      }
    };
  }, []);

  const getLayout = () => {
    if (ROUTE_AUTH.includes(pathname)) {
      return (
        <AuthLayout>
          <GlobalHooks />
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
          <title>TurboSpin Wallet</title>
          <meta
            name="description"
            content={`TurboSpin: The Wallet for Degens, Built for Speed`}
          />
          <link
            rel="icon"
            href="/images/logo.png"
          />

          {/* Open Graph meta tags */}
          <meta
            property="og:title"
            content="TurboSpin Wallet"
          />
          <meta
            property="og:description"
            content="TurboSpin: The Wallet for Degens, Built for Speed"
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
            content="TurboSpin Wallet"
          />
          <meta
            name="twitter:description"
            content="TurboSpin: The Wallet for Degens, Built for Speed"
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
