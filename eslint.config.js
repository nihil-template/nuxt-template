// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';
import stylistic from '@stylistic/eslint-plugin';
import { importX } from 'eslint-plugin-import-x';
import vueA11y from 'eslint-plugin-vuejs-accessibility';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

// /** @type {import('eslint').Linter.Config[]} */

export default withNuxt(
  // Stylistic(취향 유지)
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: false,
  }),

  // 사용자 플러그인/룰 병합
  {
    files: ['**/*.{js,mjs,ts,vue}'],
    plugins: {
      '@stylistic': stylistic,
      'import-x': importX,
      'vuejs-accessibility': vueA11y,
    },
    languageOptions: {
      parser: vueParser,                // ✅ 파서 “객체”
      parserOptions: {
        parser: tseslint.parser,        // ✅ TS 파서 “객체”
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals['shared-node-browser'],
      },
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
    },
    rules: {
      // ===== 기본 관용(Next 규칙 계승) =====
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-unexpected-multiline': 'off',
      'no-use-before-define': 'off',
      'spaced-comment': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'no-irregular-whitespace': 'error',
      'no-param-reassign': 'off',
      'eol-last': ['warn', 'always'],
      'no-plusplus': 'off',
      'no-restricted-syntax': 'off',
      'array-callback-return': 'off',
      'consistent-return': 'off',
      'no-nested-ternary': 'off',
      'no-shadow': 'off',
      'linebreak-style': 'off',
      'prefer-const': 'off',
      'max-len': 'off',
      'no-else-return': 'off',
      'no-lonely-if': 'off',
      'global-require': 'off',
      'class-methods-use-this': 'off',
      'no-useless-constructor': 'off',
      'no-useless-return': 'off',
      'lines-between-class-members': 'off',
      'arrow-body-style': 'off',
      'no-empty-function': 'off',
      'camelcase': 'off',
      'no-empty-pattern': 'off',
      'no-underscore-dangle': 'off',
      'function-call-argument-newline': 'off',
      'function-paren-newline': 'off',

      // ===== Stylistic =====
      '@stylistic/multiline-ternary': ['warn', 'always'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'always' }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['warn', 'always', {
        arraysInArrays: true,
        singleValue: true,
        objectsInArrays: true,
      }],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/object-curly-newline': ['error', {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true, consistent: true },
        ImportDeclaration: { multiline: true, consistent: true },
        ExportDeclaration: { multiline: true, consistent: true },
      }],
      '@stylistic/comma-dangle': ['warn', {
        arrays: 'always',
        functions: 'never',
        objects: 'always',
        imports: 'never',
        exports: 'never',
      }],
      '@stylistic/comma-style': ['error', 'last', {
        exceptions: {
          ObjectExpression: true,
          ArrayExpression: true,
          VariableDeclaration: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          ArrowFunctionExpression: true,
        },
      }],
      '@stylistic/indent': ['error', 2, {
        FunctionDeclaration: { parameters: 1 },
        FunctionExpression: { parameters: 1 },
        CallExpression: { arguments: 1 },
      } ],
      // ===== import-x =====
      'import-x/extensions': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-unresolved': 'off', // TS 별칭/가상 모듈 환경이면 off 유지
      'import-x/no-dynamic-require': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/order': ['warn', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],
      'import-x/no-cycle': 'off',
      'import-x/no-self-import': 'error',
      'import-x/no-useless-path-segments': 'warn',

      // ===== TS(관용) =====
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-use-before-define': ['warn', { functions: false, classes: true, variables: true }],

      // ===== Vue a11y =====
      'vuejs-accessibility/alt-text': 'error',
      'vuejs-accessibility/anchor-has-content': 'warn',
      'vuejs-accessibility/aria-props': 'error',
      'vuejs-accessibility/aria-role': 'error',
      'vuejs-accessibility/heading-has-content': 'warn',
      'vuejs-accessibility/label-has-for': 'warn',
      'vuejs-accessibility/no-autofocus': 'warn',
      'vuejs-accessibility/tabindex-no-positive': 'warn',
    },
  },

  // 전역 ignore
  {
    ignores: [
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/.nitro/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/*.log',
      'eslint.config.{js,mjs,ts}',
      '**/eslint.config.{js,mjs,ts}',
    ],
  },
);