import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPublicClient, formatUnits, http } from 'viem';
import { erc20ABI } from 'wagmi';
import { COIN_ID_MAP, usePriceStore } from '@/stores/priceStore';
import { getChainConfig, useNetworkStore } from '@/stores/networkStore';
import { getImportedTokens } from '@/common/utils/wallet';
import type { TokenInfo } from '@/types/token';

/**
 * get coins
 * @param address wallet address
 */
export const useCoins = (address: string | undefined) => {
  const [balance, setBalance] = useState<bigint | undefined>();
  const [tokenBalances, setTokenBalances] = useState<Record<string, bigint>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [forceRefetch, setForceRefetch] = useState(0);

  // Only get prices from store, remove fetchPrices
  const prices = usePriceStore((state) => state.prices);

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

  const fetchTokenBalances = useCallback(
    async (tokens: TokenInfo[]) => {
      if (!address || !tokens.length) return;

      try {
        const formattedAddress = address.toLowerCase() as `0x${string}`;

        // Fetch balances individually since multicall is not supported
        const balancePromises = tokens.map(async (token) => {
          try {
            const balance = await client.readContract({
              address: token.address as `0x${string}`,
              abi: erc20ABI,
              functionName: 'balanceOf',
              args: [formattedAddress],
            });
            return { address: token.address, balance: balance as bigint };
          } catch (err) {
            console.error(`Error fetching balance for token ${token.address}:`, err);
            return { address: token.address, balance: BigInt(0) };
          }
        });

        const balances = await Promise.all(balancePromises);

        // Create a map of token address to balance
        const balanceMap: Record<string, bigint> = {};
        balances.forEach(({ address, balance }) => {
          balanceMap[address] = balance;
        });

        setTokenBalances(balanceMap);
      } catch (err) {
        console.error('Error fetching token balances:', err);
      }
    },
    [address, client]
  );

  const fetchBalance = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const formattedAddress = address.toLowerCase() as `0x${string}`;
      const nativeBalance = await client.getBalance({
        address: formattedAddress,
      });
      setBalance(nativeBalance);

      // Fetch imported token balances
      const importedTokens = getImportedTokens(currentChainId);

      await fetchTokenBalances(importedTokens);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch balance'));
    } finally {
      setIsLoading(false);
    }
  }, [address, client, currentChainId, fetchTokenBalances]);

  const refetch = useCallback(() => {
    void fetchBalance();
    setForceRefetch((prev) => prev + 1);
  }, [fetchBalance]);

  useEffect(() => {
    if (address) {
      void fetchBalance();
    }
  }, [address, currentChainId, fetchBalance]);

  const formattedData = useMemo(() => {
    // Get imported tokens for current chain - moved outside balance check
    const importedTokens = getImportedTokens(currentChainId);

    const formattedBalance = balance ? formatUnits(balance, 18) : '0';
    const priceData = prices[COIN_ID_MAP.S];
    const usdPrice = priceData?.usd || 0;
    const usdValue = (Number(formattedBalance) * usdPrice).toString();
    const priceChange = priceData?.usd_24h_change?.toString() || '0';

    return [
      {
        type: 'native',
        address: '',
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
      // Add imported tokens with their actual balances
      ...importedTokens.map((token) => ({
        type: token.address,
        address: token.address,
        symbol: token.symbol,
        balance: formatUnits(tokenBalances[token.address] || BigInt(0), token.decimals),
        decimals: token.decimals,
        isVerified: false,
        iconURL: token.logoURI,
        usd: '0',
        pricePercentChange24h: '0',
        isCustom: true,
      })),
    ];
  }, [balance, prices, currentChainId, tokenBalances, forceRefetch]);

  return {
    data: formattedData,
    loading: isLoading,
    error,
    refetch,
    rawBalance: balance?.toString(),
  };
};
