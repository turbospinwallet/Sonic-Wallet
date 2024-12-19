export const HEIGHT_HEADER = 100;

export const WALLET_PASSWORD_KEY = 'WALLET_PASSWORD';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const GAME_CONTRACT = process.env.NEXT_PUBLIC_GAME_CONTRACT as string;
export const GAME_INFO_CONTRACT = process.env.NEXT_PUBLIC_GAME_INFO_CONTRACT as string;
export const SEAFOOD_CONTRACT = process.env.NEXT_PUBLIC_SEAFOOD_CONTRACT as string;
export const APP_CHAT_BOT_URL = process.env.NEXT_PUBLIC_APP_CHAT_BOT_URL as string;
export const LOGIN_SOCIAL_URL = process.env.NEXT_PUBLIC_LOGIN_SOCIAL_URL as string;
export const NETWORK: 'mainnet' | 'testnet' | 'devnet' | 'localnet' =
  (process.env.NEXT_PUBLIC_NETWORK as 'mainnet' | 'testnet' | 'devnet' | 'localnet') || 'mainnet';

export const APP_NAME = 'Turbo Spin';

export const GOLD_COIN_TYPE = `${GAME_CONTRACT}::gold::GOLD`;

export const TEST_USER_TELEGRAM = process.env.NEXT_PUBLIC_TEST_USER_TELEGRAM as string;

export const DEFAULT_GAS_BUDGET = 10_000_000;
