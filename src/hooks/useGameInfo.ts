import { useEffect } from 'react';
import { createPublicClient, http } from 'viem';
import { useWallet } from '@/hooks/useWallet';
import type { GameInfo } from '@/models/game-info-model';
import { useAppState } from '@/modules/shared/state/app-state';
import { CONTRACT } from '@/common/constants/contract';
import OCEAN_game_ABI from '@/common/abi/OCEAN_game_ABI.json';
import SEAFOOD_ABI from '@/common/abi/Seafood_ABI.json';
import { getChainConfig, useNetworkStore } from '@/stores/networkStore';

const useGameInfo = () => {
  const { setGameInfo } = useAppState();
  const { wallet } = useWallet();
  const { currentChainId } = useNetworkStore();
  const chainConfig = getChainConfig(currentChainId);

  const publicClient = createPublicClient({
    chain: chainConfig,
    transport: http(chainConfig.rpcUrls.default.http[0]),
  });

  const getSeafoods = async () => {
    const seafoods = [];
    let index = 0;

    try {
      while (true) {
        const seafood = (await publicClient.readContract({
          address: CONTRACT.OCEAN_SEAFOOD[
            chainConfig.id as keyof typeof CONTRACT.OCEAN_SEAFOOD
          ] as `0x${string}`,
          abi: SEAFOOD_ABI,
          functionName: 'seafoods',
          args: [index],
        })) as [boolean, number, bigint];

        console.log('seafood', seafood);

        const [enable, level, price] = seafood;

        seafoods.push({
          enable,
          level,
          price: price.toString(),
        });
        index++;
      }
    } catch (e) {
      // Stop when we hit an invalid index
      if (seafoods.length === 0) {
        console.error('Error fetching seafoods:', e);
      }
    }

    return seafoods;
  };

  const getBoatLevels = async () => {
    const levels = [];
    let index = 0;

    try {
      while (true) {
        const level = (await publicClient.readContract({
          address: CONTRACT.OCEAN_GAME[
            chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME
          ] as `0x${string}`,
          abi: OCEAN_game_ABI,
          functionName: 'boatLevels',
          args: [index],
        })) as [number, bigint];

        const [fishingTime, priceUpgrade] = level;
        levels.push({
          fishing_time: Number(fishingTime),
          price_upgrade: priceUpgrade.toString(),
        });
        index++;
      }
    } catch (e) {
      // Stop when we hit an invalid index
      if (levels.length === 0) {
        console.error('Error fetching boat levels:', e);
      }
    }

    return levels;
  };

  const getMeshLevels = async () => {
    const levels = [];
    let index = 0;

    try {
      while (true) {
        const level = (await publicClient.readContract({
          address: CONTRACT.OCEAN_GAME[
            chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME
          ] as `0x${string}`,
          abi: OCEAN_game_ABI,
          functionName: 'meshLevels',
          args: [index],
        })) as [bigint, number];

        const [priceUpgrade, speed] = level;
        levels.push({
          price_upgrade: priceUpgrade.toString(),
          speed: Number(speed),
        });
        index++;
      }
    } catch (e) {
      // Stop when we hit an invalid index
      if (levels.length === 0) {
        console.error('Error fetching mesh levels:', e);
      }
    }

    return levels;
  };

  const getFishTypeLevels = async () => {
    const levels = [];
    let index = 0;

    try {
      while (true) {
        const level = (await publicClient.readContract({
          address: CONTRACT.OCEAN_GAME[
            chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME
          ] as `0x${string}`,
          abi: OCEAN_game_ABI,
          functionName: 'seafoodLevels',
          args: [index],
        })) as [number];

        levels.push({
          rate: level[0],
        });
        index++;
      }
    } catch (e) {
      // Stop when we hit an invalid index
      if (levels.length === 0) {
        console.error('Error fetching fish type levels:', e);
      }
    }

    return levels;
  };

  const getSpecialBoosts = async () => {
    const boosts = [];
    let index = 0;

    try {
      while (true) {
        const boost = (await publicClient.readContract({
          address: CONTRACT.OCEAN_GAME[
            chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME
          ] as `0x${string}`,
          abi: OCEAN_game_ABI,
          functionName: 'specialBoosts',
          args: [index],
        })) as [number, number, bigint];

        boosts.push({
          level: boost[0],
          rate: boost[1],
          price: boost[2].toString(),
        });
        index++;
      }
    } catch (e) {
      // Stop when we hit an invalid index
      if (boosts.length === 0) {
        console.error('Error fetching special boosts:', e);
      }
    }

    return boosts;
  };

  const fetchGameInfo = async () => {
    try {
      const [
        initReward,
        ref1Rate,
        ref2Rate,
        gasFee,
        boatLevels,
        meshLevels,
        fishTypeLevels,
        specialBoosts,
        seafoodInfos,
      ] = await Promise.all([
        publicClient.readContract({
          address: CONTRACT.OCEAN_GAME[
            chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME
          ] as `0x${string}`,
          abi: OCEAN_game_ABI,
          functionName: 'initReward',
        }),
        publicClient.readContract({
          address: CONTRACT.OCEAN_GAME[
            chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME
          ] as `0x${string}`,
          abi: OCEAN_game_ABI,
          functionName: 'ref1Fee',
        }),
        publicClient.readContract({
          address: CONTRACT.OCEAN_GAME[
            chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME
          ] as `0x${string}`,
          abi: OCEAN_game_ABI,
          functionName: 'ref2Fee',
        }),
        publicClient.readContract({
          address: CONTRACT.OCEAN_GAME[
            chainConfig.id as keyof typeof CONTRACT.OCEAN_GAME
          ] as `0x${string}`,
          abi: OCEAN_game_ABI,
          functionName: 'gasFee',
        }),
        getBoatLevels(),
        getMeshLevels(),
        getFishTypeLevels(),
        getSpecialBoosts(),
        getSeafoods(),
      ]);

      const formatData: GameInfo = {
        init_reward: (initReward as bigint).toString(),
        ref1: Number(ref1Rate),
        ref2: Number(ref2Rate),
        gas_fee: Number(gasFee),
        boatLevel: boatLevels,
        meshLevel: meshLevels,
        fishTypeLevel: fishTypeLevels,
        specialBoost: specialBoosts || [],
        seafoodInfos,
      };

      console.log('formatData', formatData);

      setGameInfo(formatData);
    } catch (e) {
      console.error('Error fetching game info:', e);
    }
  };

  useEffect(() => {
    void fetchGameInfo();
  }, [wallet?.address, currentChainId]);
};

export default useGameInfo;
