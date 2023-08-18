const t = require('tap');
const { buildApp } = require('../shared/helper');

const { test } = t;

test('should return sample response', async (t) => {
  const fastify = await buildApp(t);

  const response = await fastify.inject({
    method: 'GET',
    url: '/contagem-pessoas',
  });
  t.equal(response.statusCode, 200);
});
