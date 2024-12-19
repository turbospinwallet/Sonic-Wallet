import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPublicClient, formatUnits, http } from 'viem';
import { useNetwork } from 'wagmi';
import { COIN_ID_MAP, usePriceStore } from '@/stores/priceStore';
import type { CoinDto } from '@/types/coin';
import { getChainConfig, useNetworkStore } from '@/stores/networkStore';

const DEFAULT_LIST: CoinDto[] = [
  {
    type: 'native',
    symbol: 'S',
    balance: '0',
    decimals: 18,
    isVerified: true,
    iconURL: '/images/tokens/s.png',
    usd: '0',
    pricePercentChange24h: '0',
    wrappedChain: 'sonicblaze',
    bridge: 'sonicblaze',
  },
];

/**
 * get coins
 * @param address wallet address
 */
export const useCoins = (address: string | undefined) => {
  const [balance, setBalance] = useState<bigint | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Only get prices from store, remove fetchPrices
  const prices = usePriceStore((state) => state.prices);

  const { chain } = useNetwork();

  const currentChainId = useNetworkStore((state) => state.currentChainId);

  const client = useMemo(() => {
    const chainConfig = getChainConfig(currentChainId);

    return createPublicClient({
      chain: chainConfig,
      transport: http(chainConfig.rpcUrls.default.http[0]),
      batch: {
        multicall: true,
      },
    });
  }, [currentChainId]);

  const fetchBalance = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const formattedAddress = address.toLowerCase() as `0x${string}`;
      const balance = await client.getBalance({
        address: formattedAddress,
      });
      setBalance(balance);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch balance'));
    } finally {
      setIsLoading(false);
    }
  }, [address, client]);

  const refetch = useCallback(() => {
    void fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    if (address) {
      void fetchBalance();
    }
  }, [address, currentChainId, fetchBalance]);

  const formattedData = useMemo(() => {
    if (!balance) {
      return DEFAULT_LIST;
    }

    const formattedBalance = formatUnits(balance, 18);
    const priceData = prices[COIN_ID_MAP.S];
    const usdPrice = priceData?.usd || 0;
    const usdValue = (Number(formattedBalance) * usdPrice).toString();
    const priceChange = priceData?.usd_24h_change?.toString() || '0';

    return [
      {
        type: 'native',
        symbol: 'S',
        balance: formattedBalance,
        decimals: 18,
        isVerified: true,
        iconURL: '/images/tokens/s.png',
        usd: usdValue,
        pricePercentChange24h: priceChange,
        wrappedChain: 'sonicblaze',
        bridge: 'sonicblaze',
      },
    ];
  }, [balance, prices]);

  return {
    data: formattedData,
    loading: isLoading,
    error,
    refetch,
    rawBalance: balance?.toString(),
  };
};
