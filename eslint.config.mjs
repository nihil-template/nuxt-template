import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
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
      'no-multi-spaces': 'error',
      'no-trailing-spaces': [
        'error',
        {
          skipBlankLines: false,
        },
      ],
      'indent': [
        'error',
        2,
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
      'vue/html-closing-bracket-spacing': [
        'error',
        {
          startTag: 'never',
          endTag: 'never',
          selfClosingTag: 'always',
        },
      ],
      'vue/script-indent': [
        'error',
        2,
        {
          baseIndent: 0,
          switchCase: 1,
        },
      ],
      'vue/html-indent': [
        'error',
        2,
        {
          baseIndent: 1,
          attribute: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.vue',
    ],
    rules: {
      indent: 'off',
    },
  },
);
