// import { useState } from 'react';
// import type { Address } from 'wagmi';
// import { useContractWrite } from 'wagmi';
// import { waitForTransaction } from 'wagmi/actions';
// import stakingV3Abi from '@/common/abi/stakingV3';
// import { useGetAvatarContractSupport } from '@/hooks/useGetContractSupport';
// import useNotification from '@/hooks/useNotification';
//
// const useLocking = (maleIds: number[], femaleIds: number[], avatarIds: number[]) => {
//   const noti = useNotification();
//   const [isLoading, setIsLoading] = useState(false);
//   const avatarContract = useGetAvatarContractSupport();
//
//   const { writeAsync: lockingNft } = useContractWrite({
//     address: avatarContract?.contractAddress as Address,
//     abi: stakingV3Abi,
//     functionName: 'batchStake',
//     args: [avatarIds, maleIds, femaleIds] as any,
//   });
//
//   const locking = async () => {
//     try {
//       if (!lockingNft) {
//         noti('Cannot connect to wallet, please try again', 'error');
//         return;
//       }
//       setIsLoading(true);
//       const { hash } = await lockingNft();
//       await waitForTransaction({ hash });
//       setIsLoading(false);
//     } catch (e) {
//       setIsLoading(false);
//       throw e;
//     }
//   };
//
//   return { locking, isLoading };
// };
//
// export default useLocking;
