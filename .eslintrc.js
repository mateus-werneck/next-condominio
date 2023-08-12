module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', "eslint-plugin-import-helpers", "prettier"],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    "next"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "camelcase": 1,
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "import/no-unresolved": 1,
    "class-methods-use-this": 1,
    "import/prefer-default-export": 0,
    "no-shadow": 1,
    "no-console": 1,
    "no-useless-constructor": 1,
    "no-empty-function": 1,
    "lines-between-class-members": 1,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "custom": {
            "regex": "[A-Z]",
            "match": true
          }
        }
      ],
    "import-helpers/order-imports": [
        "warn",
        {
          "groups": ["module", "/^@/", ["parent", "sibling", "index"]],
          "alphabetize": {"ignoreCase": true }
        }
      ]
  },
  settings: {
    "import/resolver": {
      typescript: {}
    }
  }
};
