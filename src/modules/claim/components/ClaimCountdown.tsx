import Image from 'next/image';
import React, { useCallback } from 'react';
import ClaimCooldown from '@/modules/claim/components/ClaimCooldown';
import Value from '@/components/Value';
import { useAppState } from '@/modules/shared/state/app-state';
import { useUserState } from '@/modules/shared/state/user-state';
import { useCreateUserWeb3, useGetUserByAddress } from '@/hooks/queries/user';
import { useWallet } from '@/hooks/useWallet';

const ClaimCountdown = () => {
  const { claimInfo } = useAppState();
  const { userInfo } = useUserState();
  const { refreshUserClaimInfo, refreshBalance } = useAppState();
  const { address } = useWallet();
  // const { mutateAsync: handleClaim, isPending } = useClaim();
  const { mutateAsync: createUserWeb3, isPending: isPendingCreateUser } = useCreateUserWeb3();
  const { mutateAsync: fetchUserByAddress, isPending: isPendingRefreshUser } =
    useGetUserByAddress();

  // const pending = useMemo(
  //   () => isPending || isPendingCreateUser || isPendingRefreshUser,
  //   [isPending, isPendingCreateUser, isPendingRefreshUser]
  // );

  const onCreateUserWeb3 = useCallback(async (address: string) => {
    try {
      await createUserWeb3({ address });
      await fetchUserByAddress(address);
    } catch (error) {
      await fetchUserByAddress(address);
    }
  }, []);

  const handlePressClaim = async () => {
    try {
      if (userInfo && !userInfo?.claimed && address) {
        return await onCreateUserWeb3(address);
      }
      if (address) {
        // await handleClaim();
      }
    } catch (e) {
      // noop
    }
  };

  return (
    <div className="pb-10 text-center">
      <div className="p-3 bg-white/70 inline-block rounded-lg relative min-w-[140px] max-w-[250px]">
        <div className="flex items-center gap-4">
          <Image
            src="/images/gold-ore.png"
            alt="gold-ore.png"
            height={30}
            width={30}
            className=""
          />
          {claimInfo.timeToClaim ? (
            <Value
              className="font-bold"
              duration={claimInfo.timeToClaim}
              start={Number(claimInfo?.unClaimedAmount)}
              value={Number(claimInfo?.fullClaimed)}
            />
          ) : (
            <p className="font-bold">{claimInfo?.unClaimedAmount}</p>
          )}
        </div>
        {claimInfo?.timeToClaim ? (
          <ClaimCooldown
            date={Date.now() + Number(claimInfo?.timeToClaim)}
            onComplete={() => {
              refreshUserClaimInfo();
              refreshBalance();
            }}
          />
        ) : (
          <button
            // disabled={pending}
            onClick={() => handlePressClaim()}
          >
            {/* {pending ? (
              <IconLoading />
            ) : (
              <Image
                src="/images/btn-claim.png"
                alt="claim"
                height={28}
                width={76}
                className="mx-auto mt-2"
              />
            )} */}
          </button>
        )}
        <div
          className="bg-white/70 h-[20px] w-[28px] absolute -top-[19.1px] left-[40px]"
          style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
        />
      </div>
    </div>
  );
};

export default ClaimCountdown;
