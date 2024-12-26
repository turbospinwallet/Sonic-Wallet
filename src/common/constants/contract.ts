import { NETWORKS } from '../connectors';

export const CONTRACT = {
  OCEAN_TOKEN: {
    [NETWORKS.SONIC_MAINNET.id]: '0xMainnetTokenAddress',
    [NETWORKS.SONIC_BLAZE.id]: '0xFCcDe77C1107c0ef7C4e5c78966F976436C1036e',
    [NETWORKS.FANTOM.id]: '0xFantomTokenAddress',
  },
  OCEAN_SEAFOOD: {
    [NETWORKS.SONIC_MAINNET.id]: '0xMainnetSeafoodAddress',
    [NETWORKS.SONIC_BLAZE.id]: '0xA11E83B8d84440fa69E7d55DCfbD1A5b39831627',
    [NETWORKS.FANTOM.id]: '0xFantomSeafoodAddress',
  },
  OCEAN_AIRDROP: {
    [NETWORKS.SONIC_BLAZE.id]: '0xF16f847cc7a041aceb3D6F06f2916F776265e053',
  },
  OCEAN_BOX: {
    [NETWORKS.SONIC_BLAZE.id]: '0xe508cE2eacA16885A3B0F1BF6a1cf818cEb0Fead',
  },
  OCEAN_GAME: {
    [NETWORKS.SONIC_MAINNET.id]: '0xMainnetGameAddress',
    [NETWORKS.SONIC_BLAZE.id]: '0xe97c665340C651248bb0bb174C9D7634c492D195',
    [NETWORKS.FANTOM.id]: '0xFantomGameAddress',
  },
};
