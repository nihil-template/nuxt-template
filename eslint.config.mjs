import withNuxt from './node_modules/.cache/nuxt/.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      },
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'array-bracket-spacing': [
      'error',
      'always',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'array-bracket-newline': [
      'error',
      'always',
    ],
    'array-element-newline': [
      'error',
      'always',
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: 'never',
        ExportDeclaration: 'never',
      },
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    'function-paren-newline': [
      'error',
      'multiline-arguments',
    ],
    'function-call-argument-newline': [
      'error',
      'consistent',
    ],
    'vue/html-quotes': [
      'error',
      'double',
    ],
  },
});
