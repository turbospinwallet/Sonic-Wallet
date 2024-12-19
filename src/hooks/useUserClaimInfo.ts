import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { useEffect } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { GAME_INFO_CONTRACT, NETWORK } from '@/common/constants/const';
import type { UserClaimInfo } from '@/models/game-info-model';
import { useAppState } from '@/modules/shared/state/app-state';

const useUserClaimInfo = () => {
  const { setUserClaimInfo, shouldRefreshUserClaimInfo } = useAppState();
  const { address } = useWallet();

  const fetchUserClaimInfo = async () => {
    try {
      const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });

      const resp = await client.getDynamicFieldObject({
        parentId: GAME_INFO_CONTRACT,
        name: {
          type: 'address',
          value: address,
        },
      });

      // @ts-expect-error - type mismatch
      setUserClaimInfo(resp?.data?.content?.fields as UserClaimInfo);
    } catch (e) {
      console.log(e);
      // handle error
    }
  };

  useEffect(() => {
    if (address) {
      void fetchUserClaimInfo();
    }
  }, [shouldRefreshUserClaimInfo, address]);
};

export default useUserClaimInfo;
