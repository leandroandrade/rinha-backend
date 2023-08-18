const { ContagemController } = require('../controllers/contagem-controller');

exports.makeContagemController = fastify => new ContagemController(fastify);
