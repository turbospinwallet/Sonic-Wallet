import Image from 'next/image';
import { getTokenIconUrl } from '@/common/utils/token';

export function TokenIcon({
  symbol,
  chainId,
  size = 32,
}: {
  symbol: string;
  chainId: number;
  size?: number;
}) {
  return (
    <Image
      src={getTokenIconUrl(symbol, chainId)}
      alt={symbol}
      width={size}
      height={size}
      onError={(e) => {
        // Update src to empty-token.svg on error
        (e.target as HTMLImageElement).src = '/images/tokens/empty-token.svg';
      }}
    />
  );
}
