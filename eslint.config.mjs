// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
    { ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'] },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        name: 'next/core-web-vitals',
        plugins: {
            '@next/next': next,
            react,
            'react-hooks': reactHooks,
        },
        rules: {
            ...next.configs['core-web-vitals'].rules,
        },
        settings: {
            react: { version: 'detect' },
        },
    },

    prettier,
];