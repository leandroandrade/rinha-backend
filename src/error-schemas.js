const common = {
  type: 'object',
  properties: {
    statusCode: { type: 'integer' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
};

module.exports = {
  400: { ...common },
  404: { ...common },
  422: { ...common },
};
