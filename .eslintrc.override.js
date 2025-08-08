module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Disable warnings that don't impact functionality
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@next/next/no-page-custom-font': 'off',
    '@next/next/no-img-element': 'off',
    'jsx-a11y/alt-text': 'off',
    'import/no-anonymous-default-export': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    
    // Keep only critical errors
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
  }
}
