const fs = require('fs');

const handler = require('../app');
const { setupGraphql } = require('@stubmock/stubmock-utils');

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  readdirSync: jest.fn(() => []),
  existsSync: jest.fn(() => true),
}));
jest.mock('@fastify/autoload', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@stubmock/stubmock-utils');

describe('app', () => {
  global.process.env.API_NAME = 'mock-api';

  const fastify = {
    register: jest.fn(),
    addContentTypeParser: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should register rest and graphQL', async () => {
    await handler(fastify, { config: JSON.stringify({}) });
    expect(fastify.register).toHaveBeenCalledTimes(6);

    expect(fs.readFileSync).toHaveBeenCalledWith(
      '/tmp/schema/mock-api.graphql',
      'utf-8',
    );
    expect(setupGraphql).toBeCalledWith('mock-api', '/tmp/mock-data');
  });

  it('should not setup graphql if no schema file', async () => {
    fs.existsSync.mockReturnValue(false);
    await handler(fastify, { config: JSON.stringify({}) });

    expect(setupGraphql).not.toHaveBeenCalled();
  });
});
