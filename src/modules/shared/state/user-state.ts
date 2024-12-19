import { create } from 'zustand';
export interface UserInfo {
  address: string;
  code: string;
  first_name: string;
  last_name: string;
  points: number;
  claimed: boolean;
}
export interface UserState {
  isAuthenticated: boolean;
  isInAuthFlow: boolean;
  isEagerring: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsInAuthFlow: (isInAuthFlow: boolean) => void;
  setIsEagerring: (isEagerring: boolean) => void;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserState = create<UserState>((set) => ({
  isAuthenticated: false,
  isInAuthFlow: false,
  isEagerring: true,
  userInfo: null,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
  setIsInAuthFlow: (isInAuthFlow: boolean) => {
    set({ isInAuthFlow });
  },
  setIsEagerring: (isEagerring: boolean) => {
    set({ isEagerring });
  },
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
}));
