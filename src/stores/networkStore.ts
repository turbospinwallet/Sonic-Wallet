import { create } from 'zustand';
import { sonicBlazeChain, sonicMainnetChain } from '@/common/connectors';

interface NetworkStore {
  currentChainId: number;
  setCurrentChainId: (chainId: number) => void;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  currentChainId: sonicBlazeChain.id, // Default to testnet
  setCurrentChainId: (chainId: number) => set({ currentChainId: chainId }),
}));

export const getChainConfig = (chainId: number) => {
  return chainId === sonicMainnetChain.id ? sonicMainnetChain : sonicBlazeChain;
};
