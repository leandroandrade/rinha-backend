const { FetchController } = require('../controllers/fetch-controller');

exports.makeFetchController = fastify => new FetchController(fastify);
