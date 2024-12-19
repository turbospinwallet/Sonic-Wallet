// import { useState } from 'react';
// import type { Address } from 'wagmi';
// import { useContractWrite } from 'wagmi';
// import { waitForTransaction } from 'wagmi/actions';
// import stakingV3Abi from '@/common/abi/stakingV3';
// import { useGetAvatarContractSupport } from '@/hooks/useGetContractSupport';
// import useNotification from '@/hooks/useNotification';
//
// const useUnStake = () => {
//   const noti = useNotification();
//   const [isLoading, setIsLoading] = useState(false);
//   const avatarContract = useGetAvatarContractSupport();
//
//   const { writeAsync: unstake } = useContractWrite({
//     address: avatarContract?.contractAddress as Address,
//     abi: stakingV3Abi,
//     functionName: 'adminUnstake',
//   });
//
//   const handleUnstake = async (idsAvatar: number[], idsMale: number[], idsFemale: number[]) => {
//     try {
//       if (!unstake) {
//         noti('Cannot connect to wallet, please try again', 'error');
//         return;
//       }
//       setIsLoading(true);
//       const { hash } = await unstake({
//         args: [idsAvatar, idsMale, idsFemale] as any,
//       });
//       await waitForTransaction({ hash });
//
//       noti('Unstake successfully', 'success');
//     } catch (e) {
//       noti(`Failed to Unstake: ${(e as Error).message}`, 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return { handleUnstake, isLoading };
// };
//
// export default useUnStake;
