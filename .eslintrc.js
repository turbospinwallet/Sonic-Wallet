process.env.ESLINT_TSCONFIG = 'tsconfig.json';

module.exports = {
  root: true,
  extends: ['@antfu', 'plugin:prettier/recommended', 'next'],
  rules: {
    curly: ['error', 'all'],
    'max-statements-per-line': ['error', { max: 1 }],
    '@typescript-eslint/brace-style': ['error', '1tbs'],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@next/next/no-img-element': 'off',
    'no-void': 'off',
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    'spaced-comment': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'no-console': 'off',
    'antfu/if-newline': 'off',
    curly: 'off',
  },
};
