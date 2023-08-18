const { PostController } = require('../controllers/post-controller');

exports.makePostController = fastify => new PostController(fastify);
