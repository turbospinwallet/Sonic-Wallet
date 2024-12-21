import { DEFAULT_TOKEN_ICONS, TOKEN_ICON_URLS } from '@/common/constants/tokens';

export function getTokenIconUrl(symbol: string, chainId: number): string {
  // Check if token has a default icon
  // @ts-expect-error ignore build
  if (DEFAULT_TOKEN_ICONS[symbol]) {
    // @ts-expect-error ignore build
    return DEFAULT_TOKEN_ICONS[symbol];
  }

  // Get the icon URL based on current network
  // @ts-expect-error ignore build
  const baseUrl = TOKEN_ICON_URLS[chainId];
  if (!baseUrl) return '/images/tokens/empty-token.svg';

  // Convert symbol to lowercase for URL
  const formattedSymbol = symbol.toLowerCase();
  return `${baseUrl}/${formattedSymbol}.svg`;
}
