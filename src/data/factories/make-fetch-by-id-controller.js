const { FetchByIdController } = require('../controllers/fetch-by-id-controller');

exports.makeFetchByIdController = fastify => new FetchByIdController(fastify);
