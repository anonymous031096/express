module.exports = {
  '/data-fixed/role': {
    get: {
      tags: ['Data Fixed'],
      produces: ['application/json'],
      description: 'Lấy tất cả Vai trò',
      responses: {
        200: {
          description: 'OK',
        },
      },
    },
  },
};
