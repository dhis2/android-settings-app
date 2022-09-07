const { config } = require('@dhis2/cli-style')

module.exports = {
    root: true,
    extends: [config.eslintReact],
    rules: {
        // The overrides below should be removed as soon as possible
        'import/extensions': ['error', { js: 'never' }],
        'react/sort-prop-types': 'off',
        'react/prop-types': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'no-unused-vars': 'off',
        'no-useless-escape': 'off',
        'react/no-unused-prop-types': 'off',
        'no-case-declarations': 'warn',
    },
}
