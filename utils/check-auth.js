const jwt = require('jsonwebtoken');
const fs = require('fs');

const hasRoles = (...permittedRoles) => {
  return (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json('Authorization is required');
    try {
      const user = jwt.verify(authorization, fs.readFileSync('./public.key', 'utf8'));
      req.user = user;
      if (!user.roles || !user.roles.length) return next();
      if (!permittedRoles) return next();

      if (user.roles.some((r) => permittedRoles.includes(r))) return next();
      return res.status(403).json('Forbiden');
    } catch (err) {
      return res.status(401).json(err);
    }
  };
};

module.exports = { hasRoles };
