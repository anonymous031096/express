const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { validate, validationBody } = require('../utils/validator');
const { ROLES } = require('../utils/data-fixed');

router.post('/init', validationBody('password'), validate, async (req, res) => {
  const { password } = req.body;
  const username = 'root';
  try {
    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: `${username} already exist.` });

    const hash = await bcrypt.hash(password, 1);
    await User.create({ username, password: hash });

    return res.json();
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/signup', validationBody('username', 'password'), validate, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: `${username} already exist.` });

    const hash = await bcrypt.hash(password, 1);
    await User.create({ username, password: hash, roles: [ROLES.USER] });

    return res.json();
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/signin', validationBody('username', 'password'), validate, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: `${username} does't exist.` });

    const same = await bcrypt.compare(password, user.password);
    if (!same) return res.status(400).json({ message: `Incorrect password.` });

    const accessToken = jwt.sign({ username, roles: user.roles }, fs.readFileSync('./private.key', 'utf8'), { expiresIn: '1h', algorithm: 'RS256' });
    const refreshToken = jwt.sign({ _id: user._id, userAgent: JSON.stringify(req.headers['user-agent']) }, fs.readFileSync('./privateRefresh.key', 'utf8'), {
      expiresIn: '8h',
      algorithm: 'RS256',
    });

    return res.json({ accessToken, refreshToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/refresh', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).json('Authorization is required');

  try {
    const { _id, userAgent } = jwt.verify(authorization, fs.readFileSync('./publicRefresh.key', 'utf8'));
    if (userAgent !== JSON.stringify(req.headers['user-agent'])) return res.status(400);

    const user = await User.findOne({ _id });
    if (!user) return res.status(400).json({ message: `${_id} does't exist.` });

    const accessToken = jwt.sign({ username: user.username, roles: user.roles }, fs.readFileSync('./private.key', 'utf8'), {
      expiresIn: '1h',
      algorithm: 'RS256',
    });
    const refreshToken = jwt.sign({ _id: user._id, userAgent: JSON.stringify(req.headers['user-agent']) }, fs.readFileSync('./privateRefresh.key', 'utf8'), {
      expiresIn: '8h',
      algorithm: 'RS256',
    });

    return res.json({ accessToken, refreshToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
