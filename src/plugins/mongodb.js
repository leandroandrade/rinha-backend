const mongodb = require('@fastify/mongodb');
const fp = require('fastify-plugin');

async function mongoPlugin(fastify, options) {
  fastify.register(mongodb, options.mongodbOptions);
}

module.exports = fp(mongoPlugin);
