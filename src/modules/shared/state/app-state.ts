import { create } from 'zustand';
import type { ClaimInfo, GameInfo, UserClaimInfo } from '@/models/game-info-model';

export interface AppState {
  gameInfo: GameInfo | undefined;
  userClaimInfo: UserClaimInfo | undefined;
  claimInfo: ClaimInfo;
  setGameInfo: (gameInfo: GameInfo) => void;
  setUserClaimInfo: (userInfo: UserClaimInfo) => void;
  setClaimInfo: (claimInfo: ClaimInfo) => void;
  shouldRefreshUserClaimInfo: number | null;
  shouldRefreshBalance: number | null;
  refreshUserClaimInfo: () => void;
  refreshBalance: () => void;
  navigated: boolean;
  setNavigated: (navigated: boolean) => void;
}

export const useAppState = create<AppState>((set) => ({
  gameInfo: undefined,
  claimInfo: {
    timeToClaim: 0,
    unClaimedAmount: 0,
    progress: 0,
    fullClaimed: 0,
  },
  userClaimInfo: undefined,
  shouldRefreshUserClaimInfo: null,
  shouldRefreshBalance: null,
  navigated: false,
  setGameInfo: (gameInfo) => {
    set({
      gameInfo,
    });
  },
  setUserClaimInfo: (userClaimInfo) => {
    set({
      userClaimInfo,
    });
  },
  refreshUserClaimInfo: () => {
    set({
      shouldRefreshUserClaimInfo: Date.now(),
    });
  },
  refreshBalance: () => {
    set({
      shouldRefreshBalance: Date.now(),
    });
  },
  setClaimInfo: (claimInfo) => {
    set({
      claimInfo,
    });
  },
  setNavigated: (navigated) => {
    set({
      navigated,
    });
  },
}));
