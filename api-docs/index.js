const basicInfo = require('./basicInfo');
const servers = require('./servers');
const auth = require('./auth');
const question = require('./question');
const dataFixed = require('./data-fixed');
// const components = require('./components');
// const tags = require('./tags');
// const todos = require('./todos');

module.exports = {
  basicAuth: {
    name: 'basicAuth',
    schema: { type: 'basic', in: 'header', name: 'Basic Auth', description: '' },
    value: 'Basic <base64 encoded user:password combination>',
  },
  security: {
    ApiKeyAuth: [],
  },
  ...basicInfo,
  ...servers,
  paths: {
    ...auth,
    ...dataFixed,
    ...question,
  },
  // ...components,
  // ...tags,
  // ...todos,
};
