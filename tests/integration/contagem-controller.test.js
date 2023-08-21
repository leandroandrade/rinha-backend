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

test('should return zero', async (t) => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/contagem-pessoas',
  });

  t.equal(response.statusCode, 200);
  t.same(response.json(), {
    total: 0,
  });
});

test('should return total of documents', async (t) => {
  const collection = fastify.mongo.db.collection('pessoas');
  await collection.insertMany([
    {
      id: crypto.randomUUID(),
      apelido: 'ze',
      nome: 'José Paulo',
      nascimento: '2023-08-16',
      stack: ['node', 'postgres'],
    },
    {
      id: crypto.randomUUID(),
      apelido: 'node',
      nome: 'Javascript Man',
      nascimento: '2023-08-16',
      stack: ['C++', 'postgres'],
    },
    {
      id: crypto.randomUUID(),
      apelido: 'dev',
      nome: 'Node developer',
      nascimento: '2023-08-16',
      stack: ['javascript', 'postgres'],
    },
    {
      id: crypto.randomUUID(),
      apelido: 'john',
      nome: 'John Doe',
      nascimento: '2023-08-16',
      stack: ['python', 'mongodb'],
    },
  ]);

  const response = await fastify.inject({
    method: 'GET',
    url: '/contagem-pessoas',
  });
  t.equal(response.statusCode, 200);
  t.same(response.json(), {
    total: 4,
  });
});
