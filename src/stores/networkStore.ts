import { create } from 'zustand';
import { sonicBlazeChain, sonicMainnetChain } from '@/common/connectors';
import reactiveStorage from '@/internals/reactive-storage';

interface NetworkStore {
  currentChainId: number;
  setCurrentChainId: (chainId: number) => void;
}

// Get initial chain ID from storage or default to mainnet
const getInitialChainId = () => {
  const savedChainId = reactiveStorage.get('SELECTED_NETWORK');
  return savedChainId ?? sonicMainnetChain.id;
};

export const useNetworkStore = create<NetworkStore>((set) => ({
  currentChainId: getInitialChainId(),
  setCurrentChainId: (chainId: number) => {
    reactiveStorage.set('SELECTED_NETWORK', chainId);
    set({ currentChainId: chainId });
  },
}));

export const getChainConfig = (chainId: number) => {
  return chainId === sonicMainnetChain.id ? sonicMainnetChain : sonicBlazeChain;
};
