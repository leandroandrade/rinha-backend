class ContagemController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    const collection = this.fastify.mongo.db.collection('pessoas');

    const total = await collection.countDocuments();
    return reply.send({
      total,
    });
  }
}

module.exports = {
  ContagemController,
};
