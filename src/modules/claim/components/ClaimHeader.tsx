import React from 'react';
import { ClaimButtonDisplayBalance } from './ClaimButtonDisplayBalance';
// import useSeafood from '@/hooks/useSeafood';
import { useAppState } from '@/modules/shared/state/app-state';
import { GOLD_COIN_TYPE } from '@/common/constants/const';
import useCoin from '@/hooks/useCoin';
import { useModalState } from '@/modules/shared/state/modal-state';

const ClaimHeader = () => {
  const { openUpgradeModal } = useModalState();
  const { userClaimInfo, gameInfo } = useAppState();
  const goldToken = useCoin(GOLD_COIN_TYPE);
  // const { mutateAsync: handleUpgrade } = useSeafood();

  // const seafoodUser = gameInfo?.seafoodInfos?.[userClaimInfo?.seafood || 0];
  const nextSeafoodUser = gameInfo?.seafoodInfos?.[Number(userClaimInfo?.seafood || 0) + 1];
  const rateSeafoodUser = gameInfo?.fishTypeLevel?.[userClaimInfo?.seafood || 0]?.rate || 0;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const rateSeafood = gameInfo?.fishTypeLevel?.[userClaimInfo?.seafood + 1 || 0]?.rate || 0;

  return (
    <div className="mt-4 px-6 flex justify-between">
      <ClaimButtonDisplayBalance
        loading={goldToken.balanceLoading}
        // value={formatSUI(BigInt(goldToken.balance))}
        value=""
        iconLeft={{
          src: '/images/gold-ore.png',
          alt: 'gold-ore.png',
        }}
      />
      <ClaimButtonDisplayBalance
        value={`x${rateSeafoodUser / 10000}`}
        iconLeft={{
          src: `/images/LV${Number(userClaimInfo?.seafood || 0) + 1}.svg`,
          alt: `icon`,
          height: 50,
          width: 50,
        }}
        iconRight={{
          src: '/images/chevrons-up.svg',
          alt: 'chevrons-up.svg',
          height: 35,
          width: 35,
        }}
        onClickIconRight={() =>
          openUpgradeModal({
            item: {
              id: 'mineral',

              level: nextSeafoodUser ? `Level ${Number(userClaimInfo?.seafood) + 1}` : 'Max level',
              note: nextSeafoodUser ? `x ${rateSeafood / 10000}` : '',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              price: nextSeafoodUser?.price / 1e9,
              value:
                ((Number(userClaimInfo?.boat) + 1) / Number(gameInfo?.seafoodInfos?.length)) * 100,
              icon: {
                src: nextSeafoodUser
                  ? `/images/LV${Number(userClaimInfo?.seafood) + 2}.svg`
                  : `/images/LV${Number(userClaimInfo?.seafood) + 1}.svg`,
                alt: 'icon',
              },
              title: 'Mineral',
              desc: 'Each Mineral holds different value in GOLD.',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              onSubmit: () => handleUpgrade(nextSeafoodUser?.price),
              disabled: !nextSeafoodUser,
              isSui: true,
            },
          })
        }
      />
    </div>
  );
};

export default ClaimHeader;
