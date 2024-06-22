module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'airbnb/whitespace',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'prettier'],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', js: 'never', tsx: 'never', jsx: 'never' }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.test.tsx', '**/setupTest.ts'] },
    ],
    'no-use-before-define': ['error', { variables: false }],
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
