'use strict';

const handler = require('../../routes/root');
const { setupRest } = require('@stubmock/stubmock-utils');

jest.mock('@stubmock/stubmock-utils');

describe('Mock API', () => {
  global.process.env.API_NAME = 'mock-api';

  it('should call using /tmp/mock-data', async () => {
    const fastify = {};

    await handler(fastify);

    expect(setupRest).toHaveBeenCalledWith(
      'mock-api',
      '/tmp/mock-data',
      fastify,
    );
  });
});
