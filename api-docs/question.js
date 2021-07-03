module.exports = {
  '/question': {
    post: {
      tags: ['Question'],
      produces: ['application/json'],
      description: 'Thêm câu hỏi',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                question: {
                  type: 'string',
                  example: 'test',
                },
                result1: {
                  type: 'string',
                  example: 'test',
                },
                result2: {
                  type: 'string',
                  example: 'test',
                },
                result3: {
                  type: 'string',
                  example: 'test',
                },
                result4: {
                  type: 'string',
                  example: 'test',
                },
                resultCorrect: {
                  type: 'number',
                  example: 1,
                },
                subject: {
                  type: 'string',
                  example: 'PHYSICS',
                },
                classroom: {
                  type: 'number',
                  example: 10,
                },
                level: {
                  type: 'number',
                  example: 1,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'OK',
        },
      },
    },
    get: {
      tags: ['Question'],
      produces: ['application/json'],
      description: 'Lấy tất cả câu hỏi',
      responses: {
        200: {
          description: 'OK',
        },
      },
    },
  },
  '/question/:id': {
    post: {
      tags: ['Question'],
      produces: ['application/json'],
      description: 'Sửa câu hỏi',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                question: {
                  type: 'string',
                  example: 'test',
                },
                result1: {
                  type: 'string',
                  example: 'test',
                },
                result2: {
                  type: 'string',
                  example: 'test',
                },
                result3: {
                  type: 'string',
                  example: 'test',
                },
                result4: {
                  type: 'string',
                  example: 'test',
                },
                resultCorrect: {
                  type: 'number',
                  example: 1,
                },
                subject: {
                  type: 'string',
                  example: 'PHYSICS',
                },
                classroom: {
                  type: 'number',
                  example: 10,
                },
                level: {
                  type: 'number',
                  example: 1,
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
