import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWallet } from '@/hooks/useWallet';

interface NoAuthLayoutProps {
  children: React.ReactNode;
}

const NoAuthLayout = ({ children }: NoAuthLayoutProps) => {
  const router = useRouter();
  const { address } = useWallet();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      void router.replace('/dapp/wallet');
      return;
    }
    setIsLoaded(true);
  }, [address, router]);

  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
};

export default NoAuthLayout;
