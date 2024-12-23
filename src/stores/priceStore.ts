import { create } from 'zustand';

// Types
export interface CoinGeckoPrice {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

interface PriceStore {
  prices: CoinGeckoPrice;
  lastPriceFetch: number;
  setPrices: (prices: CoinGeckoPrice) => void;
  fetchPrices: (force?: boolean) => Promise<void>;
}

// Constants
const COINGECKO_API = 'https://api.coingecko.com/api/v3';
export const COIN_ID_MAP = {
  S: 'fantom',
  FTM: 'fantom',
  SONIC: 'fantom',
} as const;

export const usePriceStore = create<PriceStore>((set, get) => ({
  prices: {},
  lastPriceFetch: 0,
  setPrices: (prices) => set({ prices }),
  fetchPrices: async (force = false) => {
    const now = Date.now();
    const { lastPriceFetch } = get();

    // Only fetch if forced or if last fetch was more than 1 minute ago
    if (!force && now - lastPriceFetch < 60000) {
      return;
    }

    try {
      const ids = Object.values(COIN_ID_MAP).join(',');
      const response = await fetch(
        `${COINGECKO_API}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await response.json();
      set({ prices: data, lastPriceFetch: now });
    } catch (err) {
      console.error('Error fetching prices:', err);
    }
  },
}));
