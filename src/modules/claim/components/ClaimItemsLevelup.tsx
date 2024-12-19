import Image from 'next/image';
import React from 'react';
import { useAppState } from '@/modules/shared/state/app-state';
import { useModalState } from '@/modules/shared/state/modal-state';

const ClaimItemsLevelup = () => {
  const { openUpgradeModal } = useModalState();
  // const { mutateAsync: handleUpgradeBoat } = useBoats();
  // const { mutateAsync: handleUpgradeMesh } = useMesh();
  const { gameInfo, userClaimInfo } = useAppState();

  const boatUser = gameInfo?.boatLevel?.[userClaimInfo?.boat || 0];
  const nextBoatUser = gameInfo?.boatLevel?.[Number(userClaimInfo?.boat || 0) + 1];
  const meshUser = gameInfo?.meshLevel?.[userClaimInfo?.mesh || 0];
  const nextMeshUser = gameInfo?.meshLevel?.[Number(userClaimInfo?.mesh || 0) + 1];

  return (
    <div className="flex justify-center gap-8 px-8">
      <div className="p-3 bg-pink-1 inline-block rounded-2xl flex-1 max-w-[200px] relative">
        <Image
          src="/images/minecart_grass.png"
          alt="minecart_grass.png"
          height={65}
          width={60}
          className="right-0 -top-[20px] absolute"
        />
        <p className="">Carriage</p>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-expect-error*/}
        <p className="font-bold">{boatUser?.fishing_time / 1e4} hours</p>
        <button
          className="flex justify-center w-full mt-2"
          onClick={() =>
            openUpgradeModal({
              item: {
                id: 'mineCart',
                level: nextBoatUser ? `Level ${Number(userClaimInfo?.boat) + 1}` : 'Max level',
                note: nextBoatUser
                  ? `Claim every ${Number(nextBoatUser?.fishing_time || 0) / 1e4}h`
                  : '',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                price: boatUser?.price_upgrade / 1e9,
                value:
                  ((Number(userClaimInfo?.boat) + 1) / Number(gameInfo?.boatLevel?.length)) * 100,
                icon: {
                  src: '/images/minecart_grass.png',
                  alt: '/images/minecart_grass.png',
                },
                title: 'Carriage',
                desc: 'Increase Mining Time To Claim Less Often.',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                onSubmit: () => handleUpgradeBoat(boatUser?.price_upgrade),
                disabled: !nextBoatUser,
              },
            })
          }
        >
          <Image
            src="/images/btn-levelup-orange.png"
            alt="btn-levelup-orange.png"
            height={28}
            width={76}
          />
        </button>
      </div>
      <div className="p-3 bg-yellow-1 inline-block rounded-2xl flex-1 max-w-[200px] relative">
        <Image
          src="/images/shovel.png"
          alt="shovel.png"
          height={65}
          width={60}
          className="right-0 -top-[30px] absolute"
        />
        <p className="">Shovel</p>
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/*@ts-expect-error*/}
        <p className="font-bold">{meshUser?.speed / 10000} / hours</p>
        <button
          className="flex justify-center w-full mt-2"
          onClick={() =>
            openUpgradeModal({
              item: {
                id: 'shovel',
                level: nextMeshUser ? `Level ${Number(userClaimInfo?.mesh) + 1}` : 'Max level',
                note: nextMeshUser ? `Speed ${nextMeshUser?.speed / 10000}/  h` : '',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                price: meshUser?.price_upgrade / 1e9,
                value:
                  ((Number(userClaimInfo?.mesh) + 1) / Number(gameInfo?.meshLevel?.length)) * 100,
                icon: {
                  src: '/images/shovel.png',
                  alt: '/images/shovel.png',
                },
                title: 'Shovel',
                desc: 'Boost Mining Speed To Yield More Mineral.',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                onSubmit: () => handleUpgradeMesh(meshUser?.price_upgrade),
                disabled: !nextMeshUser,
              },
            })
          }
        >
          <Image
            src="/images/btn-levelup-green.png"
            alt="btn-levelup-green.png"
            height={28}
            width={76}
          />
        </button>
      </div>
    </div>
  );
};

export default ClaimItemsLevelup;
