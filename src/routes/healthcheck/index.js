module.exports = async (fastify, opts) => {
  fastify.get('/', (req, reply) => {
    return { status: 'Up and running' };
  });
};
