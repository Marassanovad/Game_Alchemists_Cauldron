import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },
  {
    files: ['**/*.{js,ts}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, unicorn.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'unicorn/no-top-level-side-effects': 'off',
    },
  },
);
