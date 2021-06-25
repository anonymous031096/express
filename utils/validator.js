const { validationResult, body } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};

const usernameValidationRules = () => {
  return body('username').matches('^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$');
};

const passwordValidationRules = () => {
  return body('password').isLength({ min: 4, max: 20 });
};

module.exports = { validate, usernameValidationRules, passwordValidationRules };
