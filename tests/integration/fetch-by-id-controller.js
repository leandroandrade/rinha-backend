const crypto = require('crypto');
const t = require('tap');
const { buildApp } = require('../shared/helper');

const { test } = t;

test('should error when `id` is not an uuid', async (t) => {
  const fastify = await buildApp(t);

  const id = '1';

  const response = await fastify.inject({
    method: 'GET',
    url: `/pessoas/${id}`,
  });

  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'params/id must match format "uuid"',
  });
});

test('should return sample response', async (t) => {
  const fastify = await buildApp(t);

  const id = crypto.randomUUID();

  const response = await fastify.inject({
    method: 'GET',
    url: `/pessoas/${id}`,
  });

  t.equal(response.statusCode, 200);
});

// test('should return `404` when pessoa does not exists', async (t) => {
//   const fastify = await buildApp(t);
//
//   const id = crypto.randomUUID();
//
//   const response = await fastify.inject({
//     method: 'GET',
//     url: `/pessoas/${id}`,
//   });
//
//   t.equal(response.statusCode, 404);
// });
