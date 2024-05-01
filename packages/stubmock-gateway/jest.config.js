module.exports = {
  coverageDirectory: '/tmp/stubmock-gateway/coverage',
  collectCoverageFrom: [
    'app.{js,jsx}',
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
  ],
};
