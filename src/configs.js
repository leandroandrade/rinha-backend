const { randomUUID } = require('crypto');

module.exports = {
  logger: process.env.NODE_ENV !== 'test',
  genReqId(req) {
    return randomUUID();
  },
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: false,
      useDefaults: true,
    },
  },
};
