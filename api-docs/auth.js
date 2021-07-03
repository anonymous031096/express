module.exports = {
  '/auth/signin': {
    post: {
      tags: ['Auth'],
      produces: ['application/json'],
      description: 'Đăng nhập',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  example: 'duclh',
                },
                password: {
                  type: 'string',
                  example: 'duclh',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Đăng nhập thành công',
        },
      },
    },
  },
  '/auth/signup': {
    post: {
      tags: ['Auth'],
      produces: ['application/json'],
      description: 'Đăng ký',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  example: 'duclh',
                },
                password: {
                  type: 'string',
                  example: 'duclh',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Đăng ký thành công',
        },
      },
    },
  },
};
