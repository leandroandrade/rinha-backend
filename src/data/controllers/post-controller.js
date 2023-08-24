const crypto = require('crypto');

class PostController {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async handle(req, reply) {
    try {
      const {
        apelido,
        nome,
        nascimento,
        stack,
      } = req.body;

      const pessoas = this.fastify.mongo.db.collection('pessoas');
      const id = crypto.randomUUID();

      await pessoas.insertOne({
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
    } catch (err) {
      if (err.code === 11000) {
        return reply.status(422)
          .send({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: `${req.body.apelido} already exists!`,
          });
      }
      throw err;
    }
  }
}

module.exports = {
  PostController,
};
