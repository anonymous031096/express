const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { usernameValidationRules, passwordValidationRules, validate } = require('../utils/validator');

router.post('/signup', [usernameValidationRules(), passwordValidationRules()], validate, async (req, res) => {
  const { username, password } = req.body;

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

router.post('/signin', [usernameValidationRules(), passwordValidationRules()], validate, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: `${username} does't exist.` });

    const same = await bcrypt.compare(password, user.password);
    if (!same) return res.status(400).json({ message: `Incorrect password.` });

    const accessToken = jwt.sign({ username }, fs.readFileSync('./public.key', 'utf8'), { expiresIn: '1h', algorithm: 'RS256' });
    const refreshToken = jwt.sign({ username, headers: req.headers }, fs.readFileSync('./publicRefresh.key', 'utf8'), { expiresIn: '8h', algorithm: 'RS256' });

    return res.json({ accessToken, refreshToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
