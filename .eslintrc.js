module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'jsx-a11y', 'import', 'prettier', '@typescript-eslint'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': ['.tsx']
      }
    ],
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off'
  },
  settings: {
    'import/extensions': ['.js','.jsx','.ts','.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts','.tsx']
      },
      'import/resolver': {
          node: {
              extensions: ['.js','.jsx','.ts','.tsx']
          }
      }
  },
  globals: {
    atob: true,
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    navigator: true,
    fetch: true
  }
}