'use strict';
const express = require('express');
const { MONGO_CON_STR, PORT } = require('./config');
const { hasRoles } = require('./utils/check-auth');
const app = express();

require('mongoose').connect(MONGO_CON_STR, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
  if (err) throw Error(err);
  console.log('Mongoose connected');
});

app.use(require('morgan')('dev'));
app.use(express.json());

app.use(require('cors')());

app.use('/auth', require('./routes/auth'));
app.use('/subject', require('./routes/subject'));
app.use('/question', hasRoles(), require('./routes/question'));

const server = require('http').Server(app);
server.listen(PORT, () => console.log('Server start on http://localhost:3000'));
