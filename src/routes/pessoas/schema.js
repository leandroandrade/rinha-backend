const postPessoa = {
  schema: {
    body: {
      type: 'object',
      required: [
        'apelido',
        'nome',
        'nascimento',
      ],
      properties: {
        apelido: {
          type: 'string',
          minLength: 1,
          maxLength: 32,
        },
        nome: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        nascimento: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        stack: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
    },
  },
};

const fetchPessoaById = {
  schema: {
    params: {
      id: {
        type: 'string',
        format: 'uuid',
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          apelido: { type: 'string' },
          nome: { type: 'string' },
          nascimento: { type: 'string' },
          stack: { type: 'array' },
        },
      },
    },
  },
};

const fetchPessoas = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        t: {
          type: 'string',
        },
      },
      required: ['t'],
    },
  },
};

module.exports = {
  postPessoa,
  fetchPessoaById,
  fetchPessoas,
};
