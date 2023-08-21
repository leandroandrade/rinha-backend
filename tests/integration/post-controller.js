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

test('should not error when `apelido` is empty', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      // apelido: '',
      // nome: '',
      // nascimento: '',
    },
  });

  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: "body must have required property 'apelido'",
  });
});

test('should not error when `nome` is empty', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: '',
      // nome: '',
      // nascimento: '',
    },
  });
  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: "body must have required property 'nome'",
  });
});

test('should not error when `nascimento` is empty', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: '',
      nome: '',
      // nascimento: '',
    },
  });
  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: "body must have required property 'nascimento'",
  });
});

test('should not error when `apelido` have fewer than 1 characters', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: '',
      nome: '',
      nascimento: '',
    },
  });
  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'body/apelido must NOT have fewer than 1 characters',
  });
});

test('should not error when `nome` have fewer than 1 characters', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: 'a',
      nome: '',
      nascimento: '',
    },
  });
  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'body/nome must NOT have fewer than 1 characters',
  });
});

test('should not error when `nascimento` not match pattern', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: 'a',
      nome: 'a',
      nascimento: '',
    },
  });

  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'body/nascimento must match pattern "^\\d{4}-\\d{2}-\\d{2}$"',
  });
});

test('should return successfully', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: 'a',
      nome: 'a',
      nascimento: '2023-08-16',
    },
  });

  t.equal(response.statusCode, 201);

  const json = response.json();
  t.equal(response.headers.location, `/pessoas/${json.id}`);
});

test('should return success send stack values', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: 'a',
      nome: 'a',
      nascimento: '2023-08-16',
      stack: ['first', 'second'],
    },
  });

  t.equal(response.statusCode, 201);
  const json = response.json();
  t.equal(response.headers.location, `/pessoas/${json.id}`);
});

test('should return error when `apelido` have more than 32 characters', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: 'Lorem Ipsum is simply dummy text of the',
      nome: 'a',
      nascimento: '2023-08-16',
    },
  });
  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'body/apelido must NOT have more than 32 characters',
  });
});

test('should return error when `nome` have more than 100 characters', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: 'Lorem Ipsum',
      nome: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the',
      nascimento: '2023-08-16',
    },
  });
  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'body/nome must NOT have more than 100 characters',
  });
});

test('should return error when `stack` not contains only string', async (t) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: 'Lorem Ipsum',
      nome: 'Lorem Ipsum',
      nascimento: '2023-08-16',
      stack: [1, 'first'],
    },
  });
  t.equal(response.statusCode, 400);
  t.same(response.json(), {
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'body/stack/0 must be string',
  });
});

test('should return error when `apelido` already exists', async (t) => {
  const collection = fastify.mongo.db.collection('pessoas');
  await collection.insertOne({
    id: crypto.randomUUID(),
    apelido: 'dev',
    nome: 'Dev Random',
    nascimento: '2023-08-16',
    stack: ['node', 'postgres'],
  });

  const response = await fastify.inject({
    method: 'POST',
    url: '/pessoas',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      apelido: 'dev',
      nome: 'Lorem Ipsum',
      nascimento: '2023-08-16',
      stack: ['nodejs', 'mongodb'],
    },
  });

  t.equal(response.statusCode, 422);
  t.same(response.json(), {
    statusCode: 422,
    error: 'Unprocessable Entity',
    message: 'dev already exists!',
  });
});
