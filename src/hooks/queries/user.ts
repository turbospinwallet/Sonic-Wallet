import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppState } from '@/modules/shared/state/app-state';
import userRepo from '@/internals/repository/user-repo';
import type { ICUserLogin } from '@/models/user-model';
import { useUserState } from '@/modules/shared/state/user-state';
import { useHandleToastError } from '@/hooks/useToastError';

export function useQueryAccountSettings(target: string) {
  return useQuery({
    queryKey: ['user', 'account-settings', target],
    queryFn: async () => {
      return await userRepo.getMyProfile();
    },
    retry: false,
  });
}

export const useCreateUser = () => {
  const { showToastError } = useHandleToastError();
  return useMutation({
    mutationFn: async (data: ICUserLogin) => {
      return await userRepo.createUser(data);
    },
    onSuccess: () => {},
    onError: (error) => {
      showToastError(error);
    },
  });
};

export const useCreateUserWeb3 = () => {
  const { refreshUserClaimInfo, refreshBalance } = useAppState();
  const { showToastError } = useHandleToastError();

  return useMutation({
    mutationFn: async (data: { address: string }) => {
      return await userRepo.createUserWeb3(data);
    },
    onSuccess: () => {
      refreshUserClaimInfo();
      refreshBalance();
    },
    onError: (error) => {
      showToastError(error);
    },
  });
};

export const useQueryUserByAddress = (address: string | undefined) => {
  const { setUserInfo } = useUserState();
  return useQuery({
    queryKey: ['user', address],
    queryFn: async () => {
      if (!address) {
        return null;
      }
      const user = await userRepo.getUserByAddress(address);
      if (user) {
        setUserInfo(user);
      }
      return user;
    },
    enabled: !!address,
    retry: false,
  });
};
export const useGetUserByAddress = () => {
  const { setUserInfo } = useUserState();
  return useMutation({
    mutationFn: async (address: string) => {
      const user = await userRepo.getUserByAddress(address);
      if (user) {
        setUserInfo(user);
      }
      return user;
    },
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useQueryUserFriends = (address: string | undefined) => {
  return useQuery({
    queryKey: ['user', 'friends', address],
    queryFn: async () => {
      if (!address) {
        return null;
      }
      const user = await userRepo.getListUserFriends(address, {});
      return user;
    },
    enabled: !!address,
    retry: false,
  });
};

export const useQueryLeaderboardTask = (params: any) => {
  return useQuery({
    queryKey: ['user', 'leaderboard', params],
    queryFn: async () => {
      const user = await userRepo.getLeaderboardTask(params);
      return user;
    },
    retry: false,
  });
};
