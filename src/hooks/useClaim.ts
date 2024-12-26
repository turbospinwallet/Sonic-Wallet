import { Contract } from 'ethers';
import { useMutation } from '@tanstack/react-query';
import useNotification from '@/hooks/useNotification';
import { useModalState } from '@/modules/shared/state/modal-state';
import { useAppState } from '@/modules/shared/state/app-state';

import { useWallet } from '@/hooks/useWallet';
import { getChainConfig, useNetworkStore } from '@/stores/networkStore';
import { CONTRACT } from '@/common/constants/contract';
import OCEAN_game_ABI from '@/common/abi/OCEAN_game_ABI.json';

const useClaim = () => {
  const { closeUpgradeModal } = useModalState();
  const { wallet, address } = useWallet();
  const { refreshUserClaimInfo, refreshBalance } = useAppState();
  const toast = useNotification();
  const { currentChainId } = useNetworkStore();
  const chainConfig = getChainConfig(currentChainId);

  return useMutation({
    mutationFn: async () => {
      if (!wallet || !address) {
        throw new Error('Wallet not found');
      }

      try {
        const contract = new Contract(
          CONTRACT.OCEAN_GAME[chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME] as `0x${string}`,
          OCEAN_game_ABI
        );

        const tx = await contract.systemClaim(
          address,
          true, // hasRef
          Math.floor(Date.now() / 1000) + 300, // deadline 5 mins
          '0x' // signature - will need to be implemented based on backend signing
        );

        await tx.wait();
        return tx.hash;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to claim. Please try again.');
      }
    },
    onSuccess: () => {
      toast('Claim successfully');
      refreshUserClaimInfo();
      refreshBalance();
      closeUpgradeModal();
    },
    onError: (e) => {
      toast(e.message || 'Please try again', 'error');
    },
  });
};

export default useClaim;
