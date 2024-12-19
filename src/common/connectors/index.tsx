import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

export const CHAINS = {
  SONIC_BLAZE: 'sonicblaze',
  SONIC_MAINNET: 'sonic',
};

export const MAIN_TOKEN = {
  symbol: 'S',
};

export const sonicBlazeChain = {
  id: 57054,
  name: 'Sonic Blaze Testnet',
  network: CHAINS.SONIC_BLAZE,
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  rpcUrls: {
    public: { http: ['https://rpc.blaze.soniclabs.com'] },
    default: { http: ['https://rpc.blaze.soniclabs.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.blaze.soniclabs.com' },
  },
} as const;

export const sonicMainnetChain = {
  id: 146,
  name: 'Sonic Mainnet',
  network: CHAINS.SONIC_MAINNET,
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  rpcUrls: {
    public: { http: ['https://rpc.soniclabs.com'] },
    default: { http: ['https://rpc.soniclabs.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://sonicscan.org' },
  },
} as const;

export const getWagmiConfig = (defaultChainId: number) => {
  const defaultChain =
    defaultChainId === sonicMainnetChain.id ? sonicMainnetChain : sonicBlazeChain;

  const { publicClient, webSocketPublicClient } = configureChains(
    [sonicBlazeChain, sonicMainnetChain],
    [publicProvider()]
  );

  return createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
};

// Export a default configuration
export const wagmiConfig = getWagmiConfig(sonicBlazeChain.id);
