const { makeFetchController } = require('../../data/factories/make-fetch-controller');
const { makePostController } = require('../../data/factories/make-post-controller');
const { makeFetchByIdController } = require('../../data/factories/make-fetch-by-id-controller');
const { postPessoa, fetchPessoaById, fetchPessoas } = require('./schema');

module.exports = async (fastify, opts) => {
  fastify.get('/', fetchPessoas, (req, reply) => {
    return makeFetchController(fastify).handle(req, reply);
  });

  fastify.post('/', postPessoa, (req, reply) => {
    return makePostController(fastify).handle(req, reply);
  });

  fastify.get('/:id', fetchPessoaById, (req, reply) => {
    return makeFetchByIdController(fastify).handle(req, reply);
  });
};
