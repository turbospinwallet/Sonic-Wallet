import { create } from 'zustand';
import type { Chain } from 'viem';
import { NETWORKS } from '@/common/connectors';
import reactiveStorage from '@/internals/reactive-storage';
import type { CHAIN_TOKENS } from '@/common/constants/tokens';

interface NetworkStore {
  currentChainId: number;
  setCurrentChainId: (chainId: number) => void;
}

// Get initial chain ID from storage or default to mainnet
const getInitialChainId = () => {
  const savedChainId = reactiveStorage.get('SELECTED_NETWORK');
  return savedChainId ?? NETWORKS.SONIC_MAINNET.id;
};

export const useNetworkStore = create<NetworkStore>((set) => ({
  currentChainId: getInitialChainId(),
  setCurrentChainId: (chainId: number) => {
    reactiveStorage.set('SELECTED_NETWORK', chainId);
    set({ currentChainId: chainId });
  },
}));

export const getChainConfig = (chainId: number): Chain & { label: string } => {
  switch (chainId) {
    case NETWORKS.SONIC_MAINNET.id:
      return NETWORKS.SONIC_MAINNET;
    case NETWORKS.FANTOM.id:
      return NETWORKS.FANTOM;
    case NETWORKS.SONIC_BLAZE.id:
    default:
      return NETWORKS.SONIC_BLAZE;
  }
};

// Helper function to check if a chain is supported
export const isSupportedChain = (chainId: number): boolean => {
  return [NETWORKS.SONIC_MAINNET.id, NETWORKS.SONIC_BLAZE.id, NETWORKS.FANTOM.id].includes(
    chainId as keyof typeof CHAIN_TOKENS
  );
};

// Get chain name for display
export const getChainName = (chainId: number): string => {
  const chain = getChainConfig(chainId);
  return chain.label || chain.name;
};
