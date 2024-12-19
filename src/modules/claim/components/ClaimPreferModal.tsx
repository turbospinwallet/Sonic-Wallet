import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';
import useNotification from '@/hooks/useNotification';
import { useCopyText } from '@/hooks/useCopy';
import { useAppState } from '@/modules/shared/state/app-state';
import { APP_CHAT_BOT_URL, APP_NAME } from '@/common/constants/const';
import { useUserState } from '@/modules/shared/state/user-state';
import { useWallet } from '@/hooks/useWallet';
import { useQueryUserFriends } from '@/hooks/queries/user';
import { useCoins } from '@/hooks/useCoins';
import { formatTokenAmount } from '@/common/utils/number';
import { gold } from '@/hooks/tokens';

const ItemReferral = ({ fullName, address }: { fullName: string; address: string }) => {
  const { data, loading } = useCoins(address);
  const amountToken = useMemo(() => {
    const token = data?.find((item) => item.symbol === gold.symbol);
    if (!token) {
      return 0;
    }

    return formatTokenAmount(token.balance, token.decimals, 0);
  }, [data]);
  return (
    <div className="p-1 flex items-center gap-4">
      <div className="border-2 inline-block p-2 border-secondary-900 rounded-lg shadow-[1px_1px_3px] font-bold">
        {fullName?.substring(0, 2).toUpperCase()}
      </div>
      <div className="flex-1">
        <p className="text-sm"> {fullName}</p>
        <div className="flex items-center gap-1">
          <Image
            src="/images/gold-ore.png"
            alt="gold-ore.png"
            height={16}
            width={16}
            className=""
          />
          <p className="truncate max-w-[160px] text-sm">{loading ? '--' : amountToken}</p>
        </div>
      </div>
    </div>
  );
};
const ClaimPreferModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { address } = useWallet();
  const { copyText } = useCopyText();
  const { userClaimInfo } = useAppState();
  const { userInfo } = useUserState();
  const toast = useNotification();
  const { data, isFetching, isFetched, refetch } = useQueryUserFriends(address);
  const refCode = useMemo(() => {
    return userInfo?.code || userClaimInfo?.referral;
  }, [userInfo?.code, userClaimInfo?.referral]);
  useEffect(() => {
    if (isOpen) {
      void refetch();
    }
  }, [isOpen]);
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
      <div className="bg-yellow-1 mt-auto min-h-[200px] rounded-t-3xl overflow-hidden">
        <div className="font-bold text-center py-3 shadow-md bg-yellow-50">
          <p className="">My friends</p>
        </div>
        <div className="py-2 px-4">
          <p className="text-center font-bold text-2xl max-w-[250px] mx-auto">Invite Friend</p>
          <p className="text-center max-w-[280px] mx-auto text-sm">
            Get 20% bonus everytime your friend claims {APP_NAME}. And 5% everytime his/her
            referrals claim it.
          </p>
        </div>
        <div className="flex flex-col items-center flex-1 pb-8 pt-2 gap-4">
          <div className="h-[230px] max-w-[300px] w-[90vw] border rounded-xl border-secondary-900 p-4 bg-white flex flex-col gap-4 overflow-auto">
            {isFetching && (
              <div className={'flex flex-col flex-1 justify-center'}>
                <p className={'text-center'}>Loading...</p>
              </div>
            )}
            {isFetched && !data?.length && (
              <div className={'flex flex-col flex-1 justify-center'}>
                <p className={'text-center'}>No data</p>
              </div>
            )}
            {isFetched &&
              data?.map((item, index) => {
                const fullName = `${item?.first_name || ''} ${item?.last_name || ''}`.trim();
                return (
                  <ItemReferral
                    key={index}
                    fullName={fullName}
                    address={item?.address}
                  />
                );
              })}
          </div>

          <Image
            src="/images/btn-invite.png"
            alt="btn-invite.png"
            width={140}
            height={80}
            className="inline-block mr-1"
            onClick={() => {
              toast('Invited link is copied. Share it with your friends.', 'success');
              copyText(`${APP_CHAT_BOT_URL}${refCode ? `?startapp=${refCode}` : ''}`, false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClaimPreferModal;
