// shorten the checksum version of the input address to have 0x + 4 characters at start and end

export const shortenAddress = (address: string | undefined, chars = 3): string => {
  if (!address) {
    return '';
  }
  return `${address.substring(0, chars + 2)}.....${address.substring(42 - chars)}`;
};
