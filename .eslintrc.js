module.esports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    es2020: true,
    commonjs: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019, // Node.js 12の場合は2019、他バージョンのNode.jsの場合は適宜変更
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json']
  },
  // React のバージョンは自動検出に
  settings: {
    react: { version: detect }
  },
  plugins: [
    'react-hooks',
    'react',
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  rules: {
    'react/prop-types': 'off',
    'no-var': 'error'
  },
  // .js ファイルをオーバーライド （webpack.conig.jsなど）
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ]
};
