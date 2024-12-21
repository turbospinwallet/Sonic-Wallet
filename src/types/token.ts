export interface TokenInfo {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI?: string;
  isCustom?: boolean;
}

export interface ImportedTokens {
  [chainId: number]: {
    [tokenAddress: string]: TokenInfo;
  };
}
