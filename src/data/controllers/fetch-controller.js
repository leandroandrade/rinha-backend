class FetchController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    const { t } = req.query;

    const collection = this.fastify.mongo.db.collection('pessoas');
    const results = await collection.find({ $text: { $search: t } }, { projection: { _id: 0 } })
      .limit(50)
      .toArray();

    return reply.send(results);
  }
}

module.exports = {
  FetchController,
};
