const crypto = require('crypto');

class PostController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    const {
      apelido,
      nome,
      nascimento,
      stack,
    } = req.body;

    const collection = this.fastify.mongo.db.collection('pessoas');

    const exists = await collection.countDocuments({ apelido }) > 0;
    if (exists) {
      return reply.status(422)
        .send({
          statusCode: 422,
          error: 'Unprocessable Entity',
          message: `${apelido} already exists!`,
        });
    }

    const id = crypto.randomUUID();

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
