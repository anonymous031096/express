const { validationResult, body } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};

const VALIDATE_BODY = {
  username: body('username', 'Từ 2 đến 20 ký tự a-zA-Z0-9._').matches('^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'),
  password: body('password', 'Từ 4 đến 20 ký tự').isLength({ min: 4, max: 20 }),
};

const usernameValidationRules = () => {
  return body('username', 'Từ 2 đến 20 ký tự a-zA-Z0-9._').matches('^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$');
};

const passwordValidationRules = () => {
  return body('password', 'Từ 4 đến 20 ký tự').isLength({ min: 4, max: 20 });
};

const validationBody = (...params) => {
  const validates = [];
  params.forEach((p) => {
    const v = VALIDATE_BODY[p];
    if (v) validates.push(v);
  });

  return validates;
};

module.exports = { validate, validationBody, usernameValidationRules, passwordValidationRules };
