import { Days_One, Poppins, Roboto } from 'next/font/google';

export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-poppins',
  fallback: ['sans-serif'],
});

export const daysOne = Days_One({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-days-one',
  fallback: ['sans-serif'],
});

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-roboto',
  fallback: ['sans-serif'],
});
