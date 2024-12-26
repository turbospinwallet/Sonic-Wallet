import { useEffect } from 'react';
import { createPublicClient, http } from 'viem';
import { useWallet } from '@/hooks/useWallet';
import { useAppState } from '@/modules/shared/state/app-state';
import { CONTRACT } from '@/common/constants/contract';
import OCEAN_game_ABI from '@/common/abi/OCEAN_game_ABI.json';
import { getChainConfig, useNetworkStore } from '@/stores/networkStore';

const useUserClaimInfo = () => {
  const { setUserClaimInfo, shouldRefreshUserClaimInfo } = useAppState();
  const { address } = useWallet();
  const { currentChainId } = useNetworkStore();
  const chainConfig = getChainConfig(currentChainId);

  const publicClient = createPublicClient({
    chain: chainConfig,
    transport: http(chainConfig.rpcUrls.default.http[0]),
  });

  const fetchUserClaimInfo = async () => {
    try {
      if (!address) return;

      const userInfo = (await publicClient.readContract({
        address: CONTRACT.OCEAN_GAME[
          chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME
        ] as `0x${string}`,
        abi: OCEAN_game_ABI,
        functionName: 'users',
        args: [address],
      })) as [number, number, number, number, number, string, string, number, boolean];

      // Destructure array response into named variables
      const [
        boat,
        mesh,
        seafood,
        specialBoost,
        specialBoostStartTime,
        village,
        referral,
        lastClaim,
        exists,
      ] = userInfo;

      if (!exists) {
        // Handle case where user doesn't exist yet
        setUserClaimInfo({
          boat: 0,
          mesh: 0,
          id: { id: address },
          last_claim: '0',
          referral: '0x0000000000000000000000000000000000000000',
          seafood: 0,
          special_boost: '0',
          special_boost_start_time: '0',
          village: '',
        });
        return;
      }

      setUserClaimInfo({
        boat: Number(boat),
        mesh: Number(mesh),
        id: { id: address },
        last_claim: lastClaim.toString(),
        referral,
        seafood: Number(seafood),
        special_boost: specialBoost.toString(),
        special_boost_start_time: specialBoostStartTime.toString(),
        village,
      });
    } catch (e) {
      console.error('Error fetching user claim info:', e);
    }
  };

  useEffect(() => {
    if (address) {
      void fetchUserClaimInfo();
    }
  }, [shouldRefreshUserClaimInfo, address, currentChainId]);
};

export default useUserClaimInfo;
