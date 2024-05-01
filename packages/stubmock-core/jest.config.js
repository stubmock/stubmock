module.exports = {
  coverageDirectory: '/tmp/stubmock/coverage',
  collectCoverageFrom: [
    '**/*.{ts}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};
