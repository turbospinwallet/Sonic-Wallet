// import { useState } from 'react';
// import type { Address } from 'wagmi';
// import { useContractWrite } from 'wagmi';
// import { waitForTransaction } from 'wagmi/actions';
// import stakingV3Abi from '@/common/abi/stakingV3';
// import { useGetAvatarContractSupport } from '@/hooks/useGetContractSupport';
// import useNotification from '@/hooks/useNotification';
//
// const useUnLocking = (maleIds: number[], femaleIds: number[], avatarIds: number[]) => {
//   const noti = useNotification();
//   const [isLoading, setIsLoading] = useState(false);
//   const avatarContract = useGetAvatarContractSupport();
//
//   const { writeAsync: unlockNft } = useContractWrite({
//     address: avatarContract?.contractAddress as Address,
//     abi: stakingV3Abi,
//     functionName: 'batchUnstake',
//     args: [avatarIds, maleIds, femaleIds] as any,
//   });
//
//   const unlock = async () => {
//     try {
//       if (!unlockNft) {
//         noti('Cannot connect to wallet, please try again', 'error');
//         return;
//       }
//       setIsLoading(true);
//       const { hash } = await unlockNft();
//       await waitForTransaction({ hash });
//       setIsLoading(false);
//     } catch (e) {
//       setIsLoading(false);
//       throw e;
//     }
//   };
//
//   return { unlock, isLoading };
// };
//
// export default useUnLocking;
