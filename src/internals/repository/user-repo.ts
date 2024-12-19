import { authHttpClient } from '@/internals/network/auth-client';
import { defineRepository } from '@/internals/repository-utils';
import type { ICUserLogin, UserProfile, iLeaderboardItem } from '@/models/user-model';
import type { UserInfo } from '@/modules/shared/state/user-state';

const usersRepo = defineRepository(() => {
  return {
    async getMyProfile() {
      const resp = await authHttpClient.get<UserProfile>('/users/me');
      return resp.payload;
    },

    async createUser(body: ICUserLogin) {
      const resp = await authHttpClient.post<UserProfile>('/users', body);
      return resp.payload;
    },

    async getUserByAddress(address: string) {
      const resp = await authHttpClient.get<UserInfo>(`/users/${address}`);
      return resp.payload;
    },
    async getListUserFriends(address: string, params: any) {
      const resp = await authHttpClient.get<UserInfo[]>(`/users/${address}/friends`, { params });
      return resp.payload;
    },

    async getLeaderboardTask(params: any) {
      const resp = await authHttpClient.get<{ data: iLeaderboardItem[] }>('/users/leaderboard', {
        params,
      });
      return resp.payload;
    },
    async createUserWeb3(data: { address: string }) {
      const resp = await authHttpClient.post<UserProfile>('/users/create-user', data);
      return resp.payload;
    },
  };
});

export default usersRepo;
