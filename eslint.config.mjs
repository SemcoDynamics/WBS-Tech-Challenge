import playwright from 'eslint-plugin-playwright';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['tests/**', 'fixtures/**', 'pages/**', 'helpers/**', 'controllers/**'],
    ...playwright.configs['flat/recommended'],
  },
  eslintConfigPrettier,
];
