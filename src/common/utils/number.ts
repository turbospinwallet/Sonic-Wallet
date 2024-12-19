import BigNumber from 'bignumber.js';

export const formatNumber = (
  number: number | string | undefined,
  minPrecision = 2,
  maxPrecision = 4
) => {
  if (typeof number === 'string') {
    number = parseFloat(number);
  }
  if (!number) {
    return '0';
  }
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};

export function valueToBigNumber(amount: string | number | BigNumber): BigNumber {
  if (amount instanceof BigNumber) {
    return amount;
  }
  return new BigNumber(amount);
}

export const formatCurrency = (amount: number, locale: 'en-US') => {
  const CURRENCY = {
    'en-US': 'USD',
  };

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: CURRENCY[locale],
  }).format(amount);
};

export function formatTokenAmount(
  amount: number | string | null | undefined,
  decimals = 18,
  minDecimals = 2,
  maxDecimals = 2
) {
  if (amount === null || amount === undefined) {
    return '';
  }
  // Convert the BigNumber amount to a regular number string with the specified decimals
  const normalizedAmount = new BigNumber(amount).dividedBy(new BigNumber(10).pow(decimals));

  // Format the number using Intl.NumberFormat
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  }).format(normalizedAmount);
}
