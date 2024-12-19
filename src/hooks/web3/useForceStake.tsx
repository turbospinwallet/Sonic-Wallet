// import { useState } from 'react';
// import type { Address } from 'wagmi';
// import { useContractWrite } from 'wagmi';
// import { waitForTransaction } from 'wagmi/actions';
// import stakingV3Abi from '@/common/abi/stakingV3';
// import { useGetAvatarContractSupport } from '@/hooks/useGetContractSupport';
// import useNotification from '@/hooks/useNotification';
//
// const useForceState = () => {
//   const noti = useNotification();
//   const [isLoading, setIsLoading] = useState(false);
//   const avatarContract = useGetAvatarContractSupport();
//
//   const { writeAsync: forceStake } = useContractWrite({
//     address: avatarContract?.contractAddress as Address,
//     abi: stakingV3Abi,
//     functionName: 'adminStake',
//   });
//
//   const handleForceStake = async (idsAvatar: number[], idsMale: number[], idsFemale: number[]) => {
//     try {
//       if (!forceStake) {
//         noti('Cannot connect to wallet, please try again', 'error');
//         return;
//       }
//       setIsLoading(true);
//       const { hash } = await forceStake({
//         args: [idsAvatar, idsMale, idsFemale] as any,
//       });
//       await waitForTransaction({ hash });
//
//       noti('Stake successfully', 'success');
//     } catch (e) {
//       noti(`Failed to Stake: ${(e as Error).message}`, 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return { handleForceStake, isLoading };
// };
//
// export default useForceState;
