import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CalimMissionModalTabTask from './CalimMissionModalTabTask';
import CalimMissionModalTabLeaderboard from './CalimMissionModalTabLeaderboard';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { APP_NAME } from '@/common/constants/const';
import { useUserState } from '@/modules/shared/state/user-state';
import { formatNumber } from '@/common/utils/number';
import { useGetUserByAddress } from '@/hooks/queries/user';
import { useWallet } from '@/hooks/useWallet';

const ClaimMissionModal = ({
  isOpen,
  onClose,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}) => {
  const [tab, setTab] = useState(1);
  const { userInfo } = useUserState();
  const { mutateAsync: fetchUserInfo } = useGetUserByAddress();
  const { address } = useWallet();
  useEffect(() => {
    if (isOpen && address) {
      void fetchUserInfo(address);
    }
  }, [isOpen]);

  useEffect(() => {
    if (type) {
      if (type === 'earn') {
        setTab(1);
      }
      if (type === 'leaderboard') {
        setTab(2);
      }
    }
  }, [type]);
  return (
    <div
      className={clsx(
        'h-full w-full absolute top-0 left-0 transition-all flex flex-col',
        isOpen ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div
        className="h-full w-full absolute top-0 left-0 -z-10"
        onClick={onClose}
      />
      <div className="mt-auto">
        <div className="font-bold text-center py-3 shadow-[0px_1px_3px_#9c9c9c] bg-yellow-50 rounded-t-3xl relative">
          <p className="">Earn {APP_NAME}</p>
        </div>
        <div className="px-10 bg-yellow-1">
          <div className="flex flex-row justify-center pt-[12px]">
            <div className="bg-[#FFFBE6] shadow-lg flex flex-row justify-center items-center gap-1.5 px-2 py-1.5 rounded-2xl min-w-[80px]">
              <Image
                src={'/images/point.svg'}
                alt="claim-mission-point"
                width={32}
                height={32}
              />
              <p className="pr-1.5 font-semibold text-[20px]">
                {formatNumber(userInfo?.points, 0, 5) || 0}
              </p>
            </div>
          </div>
          <div className="flex gap-4 pb-4 pt-4">
            <ButtonCustom
              className={clsx(
                'flex-1 !text-secondary-900 font-bold !border-secondary-900 !shadow-none border-[3px] rounded-xl text-lg',
                tab === 1 ? '!bg-yellow-400' : 'bg-secondary-300'
              )}
              onClick={() => setTab(1)}
            >
              Task
            </ButtonCustom>
            <ButtonCustom
              className={clsx(
                'flex-1 !text-secondary-900 font-bold !border-secondary-900 !shadow-none border-[3px] rounded-xl text-lg',
                tab === 2 ? '!bg-yellow-400' : 'bg-secondary-300'
              )}
              onClick={() => setTab(2)}
            >
              Leaderboard
            </ButtonCustom>
          </div>
          {tab === 1 ? <CalimMissionModalTabTask /> : null}
          {tab === 2 ? <CalimMissionModalTabLeaderboard /> : null}
        </div>
      </div>
    </div>
  );
};

export default ClaimMissionModal;
