class ContagemController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    const collection = this.fastify.mongo.db.collection('summary');

    const result = await collection.findOne();
    const total = result?.total || 0;

    return reply.send({
      total,
    });
  }
}

module.exports = {
  ContagemController,
};
