import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { getBalanceNumber } from '@/hooks/formatBalance';
import { useAppState } from '@/modules/shared/state/app-state';

const useClaimInfo = () => {
  const { wallet } = useWallet();
  const { setClaimInfo, userClaimInfo, gameInfo } = useAppState();

  console.log('userClaimInfo', userClaimInfo);

  const getClamInfo = () => {
    try {
      if (!gameInfo) {
        setClaimInfo({
          timeToClaim: 0,
          unClaimedAmount: 0,
          progress: 0,
          fullClaimed: 0,
        });
      } else {
        if (!userClaimInfo) {
          setClaimInfo({
            timeToClaim: 0,
            unClaimedAmount: getBalanceNumber(gameInfo?.init_reward, 9),
            progress: 100,
            fullClaimed: 0,
          });
        } else {
          const n = gameInfo.boatLevel[userClaimInfo.boat];
          const s = gameInfo.meshLevel[userClaimInfo.mesh];
          const r = gameInfo.fishTypeLevel[userClaimInfo.seafood];
          const o = new Date().getTime();
          let i = new BigNumber(0);
          const a = new BigNumber(n.fishing_time).times(60).times(60).times(1e3).div(1e4);

          if (new BigNumber(userClaimInfo.last_claim).plus(a).gt(o)) {
            i = new BigNumber(userClaimInfo.last_claim).plus(a).minus(o);
          }

          let l = new BigNumber(a)
            .minus(i)
            .div(a)
            .times(n.fishing_time)
            .div(1e4)
            .times(s.speed)
            .div(1e4)
            .times(r.rate)
            .div(1e4);

          const fullClaimed = new BigNumber(1)
            .times(n.fishing_time)
            .div(1e4)
            .times(s.speed)
            .div(1e4)
            .times(r.rate)
            .div(1e4);

          if (userClaimInfo.special_boost) {
            // @ts-expect-error ignore
            const c = gameInfo.special_boost[userClaimInfo.special_boost];
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            if (c.type === 0 && o >= c.start_time && o <= c.start_time + c.duration) {
              l = l.times(c.rate).div(1e4);
            }
            if (
              c.type === 1 &&
              // @ts-expect-error ignore
              o >= userClaimInfo.special_boost_start_time &&
              // @ts-expect-error ignore
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              o <= userClaimInfo.special_boost_start_time + c.duration
            ) {
              l = l.times(c.rate).div(1e4);
            }
          }

          setClaimInfo({
            timeToClaim: i.toNumber(),
            unClaimedAmount: l.toFixed(5),
            progress: new BigNumber(a).minus(i).times(100).div(a).toFixed(2),
            fullClaimed: fullClaimed.toFixed(5),
          });
        }
      }
    } catch (e) {
      console.log(e);
      // handle error
    }
  };

  useEffect(() => {
    getClamInfo();
  }, [gameInfo, userClaimInfo, wallet?.address]);
};

export default useClaimInfo;
