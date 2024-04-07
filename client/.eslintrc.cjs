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
    'import/extensions': ['error', 'ignorePackages', { tsx: 'never', jsx: 'never' }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.test.tsx', '**/setupTest.ts'] },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
