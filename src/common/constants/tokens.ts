import { NETWORKS } from '@/common/connectors';

export const TOKEN_ICON_URLS = {
  [NETWORKS.SONIC_MAINNET.id]: 'https://mainnet.soniclabs.com/gems/icons',
  [NETWORKS.SONIC_BLAZE.id]: 'https://testnet.soniclabs.com/gems/icons',
  [NETWORKS.FANTOM.id]: 'https://ftmscan.com/token/images/icons',
} as const;

// Default icons for common tokens
export const DEFAULT_TOKEN_ICONS = {
  S: '/images/tokens/s.png',
  SONIC: '/images/tokens/s.png',
  FTM: '/images/tokens/ftm.svg',
} as const;

// Default native tokens for each chain
export const CHAIN_TOKENS = {
  [NETWORKS.SONIC_MAINNET.id]: {
    type: 'native',
    symbol: 'S',
    name: 'Sonic',
    decimals: 18,
    isVerified: true,
    iconURL: DEFAULT_TOKEN_ICONS.S,
    wrappedChain: 'sonic',
    bridge: 'sonic',
  },
  [NETWORKS.SONIC_BLAZE.id]: {
    type: 'native',
    symbol: 'S',
    name: 'Sonic',
    decimals: 18,
    isVerified: true,
    iconURL: DEFAULT_TOKEN_ICONS.S,
    wrappedChain: 'sonicblaze',
    bridge: 'sonicblaze',
  },
  [NETWORKS.FANTOM.id]: {
    type: 'native',
    symbol: 'FTM',
    name: 'Fantom',
    decimals: 18,
    isVerified: true,
    iconURL: DEFAULT_TOKEN_ICONS.FTM,
    wrappedChain: 'fantom',
    bridge: 'fantom',
  },
} as const;

// Add network icons mapping
export const NETWORK_ICONS = {
  [NETWORKS.SONIC_MAINNET.id]: '/images/networks/sonic.svg',
  [NETWORKS.SONIC_BLAZE.id]: '/images/networks/sonic.svg',
  [NETWORKS.FANTOM.id]: '/images/networks/ftm.svg',
} as const;
