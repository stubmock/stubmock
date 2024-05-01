'use strict';

const { setupRest } = require('@stubmock/stubmock-utils');

module.exports = async (fastify) =>
  setupRest(process.env.API_NAME, '/tmp/mock-data', fastify);
