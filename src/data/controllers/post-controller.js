class PostController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    return reply.status(201).send({
      clazz: 'PostController',
    });
  }
}

module.exports = {
  PostController,
};
