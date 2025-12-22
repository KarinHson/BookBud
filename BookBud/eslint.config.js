import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: { prettier: pluginPrettier },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Prevent unused variables while ignoring intentional `_` placeholders
      'no-console': 'warn', // Encourage removal of `console.log` in production code
      eqeqeq: 'error', // Enforce strict equality checks (=== and !==)
      curly: 'error', // Require braces for all control structures for clarity
      'default-case': 'error', // Ensure switch statements have a default case to handle unexpected values
      'no-implicit-globals': 'error', // Prevent global variable declarations to avoid conflicts
      'no-var': 'error', // Enforce `let` or `const` instead of `var` for block scoping
      'no-undef': 'error', //Disallow undefined variables
      'prefer-const': 'error', // Prefer `const` for variables that are not reassigned
      'no-lone-blocks': 'error', // Disallow unnecessary nested blocks
      'no-multi-spaces': 'error', // Disallow multiple spaces for cleaner formatting
      'no-extra-semi': 'error', // Disallow unnecessary semicolons
      semi: ['error', 'always'], // Enforce semicolons at the end of statements
      quotes: ['error', 'single', { avoidEscape: true }], // Use single quotes unless escaping
      camelcase: ['error', { properties: 'never' }], // Enforce camelCase for variable and function names
      'keyword-spacing': ['error', { before: true, after: true }], // Enforce consistent spacing before/after keywords
    },
  },
]);
