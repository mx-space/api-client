module.exports = {
  root: true,
  extends: ['@innei/eslint-config-ts'],
  ignorePatterns: ['esm/**', 'lib/**', 'dist/**'],
  rules: {
    'import/no-default-export': 0,
  },
}
