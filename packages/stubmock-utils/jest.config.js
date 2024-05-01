module.exports = {
  coverageDirectory: '/tmp/stubmock-utils/coverage',
  collectCoverageFrom: [
    'app.{js,jsx}',
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
  ],
};
