const crypto = require('crypto');
const t = require('tap');
const { buildApp } = require('../shared/helper');

const { test } = t;

let fastify;

t.beforeEach(async t => {
  fastify = await buildApp(t);
});

t.afterEach(async t => {
  await fastify.mongo.db.collection('pessoas').deleteMany({});
});

test('should error when `id` is not an uuid', async (t) => {
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
  const id = crypto.randomUUID();

  const collection = fastify.mongo.db.collection('pessoas');
  const pessoa = {
    id,
    apelido: 'a',
    nome: 'a',
    nascimento: '2023-08-16',
    stack: ['first', 'second'],
  };
  await collection.insertOne({ ...pessoa });

  const response = await fastify.inject({
    method: 'GET',
    url: `/pessoas/${id}`,
  });

  t.equal(response.statusCode, 200);
  t.same(response.json(), pessoa);
});

test('should return `404` when pessoa does not exists', async (t) => {
  const fastify = await buildApp(t);

  const id = crypto.randomUUID();

  const response = await fastify.inject({
    method: 'GET',
    url: `/pessoas/${id}`,
  });

  t.equal(response.statusCode, 404);
  t.same(response.json(), {
    statusCode: 404,
    error: 'Not Found',
    message: `Pessoa ${id} not found!`,
  });
});
