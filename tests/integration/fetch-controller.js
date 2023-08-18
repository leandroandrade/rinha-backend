const t = require('tap');
const { buildApp } = require('../shared/helper');

const { test } = t;

test('should return sample response', async (t) => {
  const fastify = await buildApp(t);

  const response = await fastify.inject({
    method: 'GET',
    url: '/pessoas',
  });

  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: "querystring must have required property 't'",
  });
});

test('should return sample response', async (t) => {
  const fastify = await buildApp(t);

  const response = await fastify.inject({
    method: 'GET',
    url: '/pessoas?t=node',
  });

  t.equal(response.statusCode, 200);
});
