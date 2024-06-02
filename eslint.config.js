/** @typedef { import("eslint").Linter.FlatConfig } FlatConfig */

import globals from "globals";
import eslint from '@eslint/js';
import tseslint from "typescript-eslint";
import functional from 'eslint-plugin-functional';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
);

/** @type FlatConfig */
const globalConfig =  { languageOptions: { globals: globals.browser }};

/** @type FlatConfig */
const eslintConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    functional,
  },
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json', './tsconfig.node.json'],
    },
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-use-before-define': 'error',
    'no-restricted-globals': ['error', { name: 'isFinite' }, { name: 'isNaN' }],
    'functional/no-let': ['error', { allowInForLoopInit: false, allowInFunctions: false }],
    'functional/immutable-data': [
      'error',
      { ignoreImmediateMutation: true, ignoreClasses: true, ignoreAccessorPattern: ['draft*.*'] },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'comma', requireLast: true },
        singleline: { delimiter: 'comma', requireLast: false },
        overrides: {
          interface: { multiline: { delimiter: 'semi', requireLast: true } },
          typeLiteral: { multiline: { delimiter: 'semi', requireLast: true } },
        },
      },
    ],
  },
};

/** @type FlatConfig */
const reactConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  plugins: {
    react,
    'react-hooks': hooks,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...hooks.configs.recommended.rules,
    "@typescript-eslint/no-empty-interface": "off",
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary', 'coerce'] }],
  },
};

/** @type Array<FlatConfig> */
export default [
  ...baseConfig,
  globalConfig,
  eslintConfig,
  reactConfig,
];
