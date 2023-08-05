{ "eslintConfig": {
    plugins: ['prettier', 'import', '@typescript-eslint'],
    extends: [
        'react-app',
        'shared-config',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    rules: {
        'additional-rule': 'warn',
        'no-debugger': 'off',
        'no-console': 0,
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
    },
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            rules: {
                'additional-typescript-only-rule': 'warn',
            },
        },
    ],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
}
}
