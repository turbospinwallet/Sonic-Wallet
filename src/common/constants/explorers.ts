import { NETWORKS } from '@/common/connectors';

export const EXPLORER_URLS = {
  [NETWORKS.SONIC_MAINNET.id]: 'https://sonicscan.org',
  [NETWORKS.SONIC_BLAZE.id]: 'https://testnet.soniclabs.com',
  [NETWORKS.FANTOM.id]: 'https://ftmscan.com',
} as const;

export const getExplorerUrl = (
  chainId: number,
  type: 'token' | 'tx' | 'address',
  value: string
) => {
  // @ts-expect-error ignore build
  const baseUrl = EXPLORER_URLS[chainId];
  if (!baseUrl) return '';

  switch (type) {
    case 'token':
      return `${baseUrl}/address/${value}`;
    case 'tx':
      return `${baseUrl}/tx/${value}`;
    case 'address':
      return `${baseUrl}/address/${value}`;
    default:
      return baseUrl;
  }
};
