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
        type: 'null',
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
