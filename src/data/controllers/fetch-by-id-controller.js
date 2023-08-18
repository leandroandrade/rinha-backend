class FetchByIdController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    return reply.send({
      clazz: 'FetchByIdController',
    });
  }
}

module.exports = {
  FetchByIdController,
};
