import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginImport from 'eslint-plugin-import';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist', '*.config.js'] },

  // Базовые настройки
  {
    files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
          moduleDirectory: ['node_modules', 'src/'],
        },
        alias: {
          map: [
            ['@', './src'],
            ['@/components', './src/components'],
          ],
          extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        },
      },
    },
  },

  // Плагины и правила
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: eslintPluginImport,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Сортировка импортов
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w', '^\\u0000'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['\\.(css|scss|sass|less|module\\.scss)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Правила для импортов
      'import/first': 'error',
      'import/no-duplicates': 'error',

      // React правила
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Дополнительные правила
      'no-unused-vars': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'jsx-quotes': ['error', 'prefer-double'],
      'arrow-body-style': 'off',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',

      // TS правила
      ...tsPlugin.configs.recommendedTypeChecked,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  js.configs.recommended,
  prettierConfig,
];
