const crypto = require('crypto');

class PostController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    const {
      apelido, nome, nascimento, stack,
    } = req.body;

    const id = crypto.randomUUID();

    const collection = this.fastify.mongo.db.collection('pessoas');
    await collection.insertOne({
      apelido,
      nome,
      nascimento,
      stack,
      id,
    });

    return reply
      .status(201)
      .header('Location', `/pessoas/${id}`)
      .send({ id });
  }
}

module.exports = {
  PostController,
};
