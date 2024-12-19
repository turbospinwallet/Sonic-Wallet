export interface GameInfo {
  gas_fee: number;
  init_reward: string;
  ref1: number;
  ref2: number;
  boatLevel: {
    fishing_time: number;
    price_upgrade: string;
  }[];
  meshLevel: {
    price_upgrade: string;
    speed: number;
  }[];
  fishTypeLevel: {
    rate: number;
  }[];
  specialBoost: [];
  seafoodInfos: {
    enable: boolean;
    level: number;
    price: string;
  }[];
}

export interface UserClaimInfo {
  boat: number;
  id: {
    id: string;
  };
  last_claim: string;
  mesh: number;
  referral: string;
  seafood: number;
  special_boost: string;
  special_boost_start_time: string;
  village: string;
}

export interface ClaimInfo {
  timeToClaim: number;
  unClaimedAmount: number | string;
  progress: number | string;
  fullClaimed: number | string;
}
