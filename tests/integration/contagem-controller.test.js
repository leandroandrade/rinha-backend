const crypto = require('crypto');
const t = require('tap');
const { buildApp } = require('../shared/helper');

const { test } = t;

let fastify;

t.beforeEach(async t => {
  fastify = await buildApp(t);
});

t.afterEach(async t => {
  await fastify.mongo.db.collection('summary').deleteMany({});
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
  const collection = fastify.mongo.db.collection('summary');
  await collection.insertOne({ total: 4 });

  const response = await fastify.inject({
    method: 'GET',
    url: '/contagem-pessoas',
  });
  t.equal(response.statusCode, 200);
  t.same(response.json(), {
    total: 4,
  });
});
