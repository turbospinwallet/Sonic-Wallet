import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
  children: ReactNode;
  pageProps: Record<string, unknown>;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: ProvidersProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
