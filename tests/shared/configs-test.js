const { randomUUID } = require('crypto');

module.exports = {
  logger: false,
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
