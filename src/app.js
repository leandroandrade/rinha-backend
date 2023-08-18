const { join } = require('path');
const fp = require('fastify-plugin');
const autoLoad = require('@fastify/autoload');

async function appPlugin(app, config) {
  await app.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
  }).register(autoLoad, {
    dir: join(__dirname, 'decorators'),
  }).register(autoLoad, {
    dir: join(__dirname, 'routes'),
  });
}

module.exports = fp(appPlugin);
