'use strict';
const express = require('express');
const app = express();

require('mongoose').connect('mongodb://ppp:ppp@172.105.113.68:27017/ppp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
  if (err) throw Error(err);
  console.log('Mongoose connected');
});

app.use(require('morgan')('dev'));
app.use(express.json());

app.use(require('cors')());

app.use('/auth', require('./routes/auth'));

const server = require('http').Server(app);
server.listen(3000, () => console.log('Server start on http://localhost:3000'));
