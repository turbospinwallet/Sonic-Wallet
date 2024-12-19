import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useCanGoBack = () => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setCanGoBack(window.history.length > 1);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Check on initial load
    setCanGoBack(window.history.length > 1);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return canGoBack;
};

export default useCanGoBack;
