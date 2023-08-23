const t = require('tap');
const { buildApp } = require('../shared/helper');

const { test } = t;

test('should return healthckeck successfully', async (t) => {
  const fastify = await buildApp(t);

  const response = await fastify.inject({
    method: 'GET',
    url: '/healthcheck',
  });
  t.equal(response.statusCode, 200);
  t.same(response.json(), { status: 'Up and running' });
});
