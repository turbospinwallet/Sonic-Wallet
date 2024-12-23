import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { fantom } from 'viem/chains';

export const CHAINS = {
  SONIC_BLAZE: 'sonicblaze',
  SONIC_MAINNET: 'sonic',
  FANTOM_MAINNET: 'fantom',
} as const;

export const NETWORKS = {
  SONIC_BLAZE: {
    id: 57054,
    name: 'Sonic Blaze Testnet',
    network: CHAINS.SONIC_BLAZE,
    label: 'Sonic Testnet',
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
  },
  SONIC_MAINNET: {
    id: 146,
    name: 'Sonic Mainnet',
    network: CHAINS.SONIC_MAINNET,
    label: 'Sonic Mainnet',
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
  },
  FANTOM: {
    ...fantom,
    label: 'Fantom Opera',
  },
} as const;

export const MAIN_TOKEN = {
  symbol: 'S',
} as const;

// Export individual chains for backward compatibility
export const sonicBlazeChain = NETWORKS.SONIC_BLAZE;
export const sonicMainnetChain = NETWORKS.SONIC_MAINNET;
export const fantomChain = NETWORKS.FANTOM;

// Available networks for UI
export const AVAILABLE_NETWORKS = [
  NETWORKS.SONIC_MAINNET,
  NETWORKS.SONIC_BLAZE,
  NETWORKS.FANTOM,
] as const;

export const getWagmiConfig = () => {
  const { publicClient, webSocketPublicClient } = configureChains(
    [sonicBlazeChain, sonicMainnetChain, fantomChain],
    [publicProvider()]
  );

  return createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
};

// Export a default configuration
export const wagmiConfig = getWagmiConfig();
