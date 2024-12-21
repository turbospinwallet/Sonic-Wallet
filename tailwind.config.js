/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

console.log(colors);

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
        daysOne: ['var(--font-days-one)', ...fontFamily.sans],
      },
      maxWidth: {
        '1/2': '50%',
      },
      colors: {
        ...colors,
        'color-bg': '#1D1C24',
        primary: '#006ccd',
        'primary-2': '#918DEF',
        'primary-3': '#1D1C24',
        'primary-4': '#1D1C24',
        secondary: '#0c1a32',
        'red-1': '#FF3E3E',
        'black-1': '#0F1016',
        'black-2': '#1C1D25',
        'black-3': '#151515',
        'black-4': '#1F1F1F',
        'white-1': 'rgba(164, 164, 164, 0.22)',
        'gray-1': '#747474',
        'blue-1': '#07FFFF',
        'black-text': '1D1D1D',
        'green-1': '#32C671',
        'green-2': '#00FF47',
        // new color partten
        'pink-1': '#FFD6D2',
        'yellow-50': '#FFFBE6',
        'yellow-400': '#FFDD33',
        'yellow-1': '#FFF4BB',
        'orange-1': '#FFAE00',
        'secondary-900': '#28140C',
        'secondary-300': '#616161',
        'secondary-200': '#B59F97',
        'gray-100': '#9095A0',
        // tab
        'tab-active': '#494848',
        tab: '#1F1F1F',
        neutral: '#ecf0ef',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      dropShadow: {
        base: '0px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
