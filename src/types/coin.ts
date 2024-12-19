export interface CoinDto {
  type: string;
  symbol: string;
  balance: string;
  decimals: number;
  isVerified: boolean;
  iconURL?: string;
  usd?: string;
  pricePercentChange24h?: string;
  wrappedChain?: string;
  bridge?: string;
}
