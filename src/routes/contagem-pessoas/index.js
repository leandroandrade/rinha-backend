const { makeContagemController } = require('../../data/factories/make-contagem-controller');

module.exports = async (fastify, opts) => {
  fastify.get('/', (req, reply) => {
    return makeContagemController(fastify).handle(req, reply);
  });
};
