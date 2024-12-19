import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useAppState } from '@/modules/shared/state/app-state';
import { GET_COIN_HISTORY } from '@/common/utils/graphql/query';
import { useCoins } from '@/hooks/useCoins';
import { useWallet } from '@/hooks/useWallet';

export default function useCoin(coinType: string) {
  const { shouldRefreshBalance } = useAppState();
  const { address } = useWallet();
  const [supportHistoryChart, setSupportHistoryChart] = useState(false);
  const {
    data: coinHistoryResult,
    loading: coinHistoryLoading,
    refetch,
  } = useQuery(GET_COIN_HISTORY, {
    variables: {
      address,
      coinTypes: [coinType],
    },
    onCompleted(data) {
      if (data.coins[0]?.day?.length > 0) {
        // console.log(data);
        setSupportHistoryChart(true);
      }
    },
    skip: !address,
    pollInterval: 5 * 1000,
  });

  const symbol = coinHistoryResult?.coins[0]?.symbol;
  const iconURL = coinHistoryResult?.coins[0]?.iconURL;
  const usdPrice = coinHistoryResult?.coins[0]?.usdPrice;

  const { rawBalance, loading: balanceLoading } = useCoins(address);
  const balance = rawBalance;

  useEffect(() => {
    if (shouldRefreshBalance) {
      void refetch();
    }
  }, [shouldRefreshBalance]);

  return {
    balance,
    symbol,
    iconURL,
    usdPrice,
    supportHistoryChart,
    coinHistoryLoading,
    balanceLoading,
  };
}
