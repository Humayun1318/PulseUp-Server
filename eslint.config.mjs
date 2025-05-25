import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['dist/**/*', 'node_modules/**/*'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': ['error', { singleQuote: true, semi: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      // General JavaScript Best Practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-magic-numbers': ['warn', { ignore: [0, 1], enforceConst: true }],
      'consistent-return': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-catch': 'error',
      'no-empty-function': ['warn', { allow: ['constructors'] }],
      'no-shadow': 'error',
      'prefer-template': 'error',
      'no-unsafe-optional-chaining': 'error',

      //type script rules
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      // '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: true },
      ],
      '@typescript-eslint/ban-ts-comment': ['warn'],
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': 'warn',

      // (important in Express error handling)
      'callback-return': 'warn',
      'no-process-exit': 'error',
      'require-await': 'warn',
      'no-return-await': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'warn',

      // Prevent variable shadowing (common bug in middleware)
      'no-shadow': ['error', { builtinGlobals: false, hoist: 'all' }],

      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
  },
];
