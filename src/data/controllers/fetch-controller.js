class FetchController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    return reply.send({
      clazz: 'FetchController',
    });
  }
}

module.exports = {
  FetchController,
};
