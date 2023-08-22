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

    const pessoas = this.fastify.mongo.db.collection('pessoas');
    const summary = this.fastify.mongo.db.collection('summary');

    const exists = await pessoas.countDocuments({ apelido }) > 0;
    if (exists) {
      return reply.status(422)
        .send({
          statusCode: 422,
          error: 'Unprocessable Entity',
          message: `${apelido} already exists!`,
        });
    }

    const id = crypto.randomUUID();

    await Promise.all([
      pessoas.insertOne({
        apelido,
        nome,
        nascimento,
        stack,
        id,
      }),
      summary.updateOne({}, { $inc: { total: 1 } }, { upsert: true }),
    ]);

    return reply
      .status(201)
      .header('Location', `/pessoas/${id}`)
      .send({ id });
  }
}

module.exports = {
  PostController,
};
