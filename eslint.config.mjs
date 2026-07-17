import { defineConfig, globalIgnores } from 'eslint/config';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },

    rules: {

      /*
      |--------------------------------------------------------------------------
      | IMPORTS
      |--------------------------------------------------------------------------
      */

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      /*
      |--------------------------------------------------------------------------
      | UNUSED IMPORTS
      |--------------------------------------------------------------------------
      */

      'unused-imports/no-unused-imports': 'error',

      /*
      |--------------------------------------------------------------------------
      | TYPESCRIPT
      |--------------------------------------------------------------------------
      */

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      /*
      |--------------------------------------------------------------------------
      | GENERAL
      |--------------------------------------------------------------------------
      */

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      'prefer-const': 'error',

      /*
      |--------------------------------------------------------------------------
      | REACT
      |--------------------------------------------------------------------------
      */

      'react/jsx-key': 'error',
    },
  },

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
