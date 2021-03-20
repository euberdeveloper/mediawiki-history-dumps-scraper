const path = require('path');

module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: path.join(__dirname, 'source', 'tsconfig.json')
    },
    plugins: ['prettier'],
    extends: [
        '@euberdeveloper/typescript',
        'plugin:prettier/recommended'
    ],
    rules: {
        '@typescript-eslint/no-misused-promises': 'off'
    }
};