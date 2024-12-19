import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { useEffect } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { getChildrenObjectContract } from '@/common/utils/format/formatObject';
import type { GameInfo } from '@/models/game-info-model';
import { useAppState } from '@/modules/shared/state/app-state';
import { GAME_INFO_CONTRACT, NETWORK, SEAFOOD_CONTRACT } from '@/common/constants/const';

const useGameInfo = () => {
  const { setGameInfo } = useAppState();
  const { wallet } = useWallet();

  const getSeafoods = async () => {
    const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });

    const resp = await client.getObject({
      id: SEAFOOD_CONTRACT,
      options: {
        showContent: !0,
      },
    });
    return await getChildrenObjectContract(resp, 'seafoods');
  };

  const fetchGameInfo = async () => {
    try {
      // see Network Interactions with SuiClient for more info on creating clients
      const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });

      const resp = await client.getObject({
        id: GAME_INFO_CONTRACT,
        options: {
          showContent: !0,
        },
      });

      const respChildren = [
        getChildrenObjectContract(resp, 'boat_level'),
        getChildrenObjectContract(resp, 'mesh_level'),
        getChildrenObjectContract(resp, 'seafood_level'),
        getChildrenObjectContract(resp, 'special_boost'),
        getSeafoods(),
      ];

      const finalResp = await Promise.all(respChildren);

      const formatData = {
        boatLevel: finalResp[0],
        meshLevel: finalResp[1],
        fishTypeLevel: finalResp[2],
        specialBoost: finalResp[3],
        seafoodInfos: finalResp[4],
        // @ts-expect-error ignore
        init_reward: resp.data.content.fields.init_reward,
        // @ts-expect-error ignore
        ref1: resp.data.content.fields.ref1,
        // @ts-expect-error ignore
        ref2: resp.data.content.fields.ref2,
        // @ts-expect-error ignore
        gas_fee: resp.data.content.fields.gas_fee,
      };

      setGameInfo(formatData as GameInfo);
    } catch (e) {
      console.log(e);
      // handle error
    }
  };

  useEffect(() => {
    void fetchGameInfo();
  }, [wallet?.address]);
};

export default useGameInfo;
