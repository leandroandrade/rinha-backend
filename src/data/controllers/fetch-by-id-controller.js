class FetchByIdController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    const { id } = req.params;
    const collection = this.fastify.mongo.db.collection('pessoas');

    const pessoa = await collection.findOne({ id }, {
      projection: {
        _id: 0,
      },
    });
    if (!pessoa) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: `Pessoa ${id} not found!`,
      });
    }

    return reply.send(pessoa);
  }
}

module.exports = {
  FetchByIdController,
};
