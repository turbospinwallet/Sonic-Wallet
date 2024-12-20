import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { usePriceStore } from '@/stores/priceStore';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const { address } = useWallet();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const fetchPrices = usePriceStore((state) => state.fetchPrices);

  useEffect(() => {
    if (!address) {
      void router.replace('/dapp');
      return;
    }
    setIsLoaded(true);

    // Initial price fetch
    void fetchPrices();

    // Set up price refresh interval
    const priceInterval = setInterval(() => {
      void fetchPrices();
    }, 60000);

    return () => clearInterval(priceInterval);
  }, [address, router, fetchPrices]);

  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
};

export default AuthLayout;
