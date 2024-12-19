export const formatAddress = (address?: string, prefixLength = 6, suffixLength = 4): string => {
  if (!address) return '';
  if (address.length < prefixLength + suffixLength) return address;

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);
  return `${prefix}...${suffix}`;
};
