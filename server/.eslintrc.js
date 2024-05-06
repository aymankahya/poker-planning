module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        parser: '@typescript-eslint/parser',
        project: 'tsconfig.json',
        sourceType: 'module',
      },
      rules: {
        'import/extensions': 'off',
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'consistent-return': 'off',
      },
    },
  ],
};
