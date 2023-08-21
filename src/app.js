const { join } = require('path');
const fp = require('fastify-plugin');
const autoLoad = require('@fastify/autoload');

async function appPlugin(app, config) {
  await app.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
    options: {
      mongodbOptions: {
        url: process.env.MONGODB_URL,
        database: process.env.MONGODB_DB,
        forceClose: true,
      },
    },
  }).register(autoLoad, {
    dir: join(__dirname, 'routes'),
  });
}

module.exports = fp(appPlugin);
