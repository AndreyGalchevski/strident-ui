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
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': ['.tsx']
      }
    ],
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
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    navigator: true,
    fetch: true
  }
}