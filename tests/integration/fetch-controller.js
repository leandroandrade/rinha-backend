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

test('should return sample response', async (t) => {
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

test('should return `3` results', async (t) => {
  const first = {
    id: crypto.randomUUID(),
    apelido: 'ze',
    nome: 'José Paulo',
    nascimento: '2023-08-16',
    stack: ['node', 'postgres'],
  };

  const second = {
    id: crypto.randomUUID(),
    apelido: 'node',
    nome: 'Javascript Man',
    nascimento: '2023-08-16',
    stack: ['C++', 'postgres'],
  };

  const third = {
    id: crypto.randomUUID(),
    apelido: 'dev',
    nome: 'Node developer',
    nascimento: '2023-08-16',
    stack: ['javascript', 'postgres'],
  };

  const collection = fastify.mongo.db.collection('pessoas');
  await collection.insertMany([
    { ...first },
    { ...second },
    { ...third },
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
    url: '/pessoas?t=node',
  });

  t.equal(response.statusCode, 200);

  const results = response.json();
  t.equal(results.length, 3);

  const [firstResult] = results;
  t.hasProps(firstResult, ['id', 'apelido', 'nome', 'nascimento', 'stack']);
});

test('should return empty results', async (t) => {
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
    url: '/pessoas?t=xpto',
  });

  t.equal(response.statusCode, 200);

  const results = response.json();
  t.equal(results.length, 0);
});
