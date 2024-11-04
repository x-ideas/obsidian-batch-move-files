import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierLintRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  prettierLintRecommended,
  {
    ignores: ['dist', 'node_modules', '*.js', '*.d.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true,
      },
    },
  },
);
