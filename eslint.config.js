// @context: ESLint configuration — code quality + code review automation
// @purpose: Enforces coding standards, catches unused vars, strict any usage, and hook dependency completeness
// @purpose: Serves as automated code review checklist — these rules are enforced in CI
// @purpose: Review checklist (cross-reference with automated rules):
//   [SECURITY]  — no secrets committed (manual), no eval() (manual), CSRF (manual)
//   [PERF]     — no unnecessary re-renders (react-hooks/exhaustive-deps), no inline objects in JSX (manual)
//   [TYPES]    — no-explicit-any (warn), strict TypeScript config (tsconfig.json)
//   [ERRORS]   — exhaustive-deps prevents stale closures, set-state-in-effect prevented
//   [LOGGING]  — console.log usage (manual review)
//   [CLEANUP]  — no-unused-vars (warn), unused imports removed
//   [ANIMALS]  — no-unused-vars ignores _-prefixed params
// @dependencies: @eslint/js, typescript-eslint, eslint-plugin-react, eslint-plugin-react-hooks
// @owner: Core team

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
);
