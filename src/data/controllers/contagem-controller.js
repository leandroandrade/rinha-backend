class ContagemController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    return reply.send({
      clazz: 'ContagemController',
    });
  }
}

module.exports = {
  ContagemController,
};
