import { sonicBlazeChain, sonicMainnetChain } from '@/common/connectors';

export const TOKEN_ICON_URLS = {
  [sonicMainnetChain.id]: 'https://mainnet.soniclabs.com/gems/icons',
  [sonicBlazeChain.id]: 'https://testnet.soniclabs.com/gems/icons',
} as const;

// Default icons for common tokens
export const DEFAULT_TOKEN_ICONS = {
  S: '/images/tokens/s.png',
  SONIC: '/images/tokens/sonic.png',
} as const;
