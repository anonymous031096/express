const router = require('express').Router();
const { ROLES } = require('../utils/data-fixed');
const { hasRoles } = require('../utils/check-auth');

router.get('/role', (req, res) => {
  return res.json(Object.entries(ROLES).map((v) => ({ [v[0]]: v[1] })));
});

module.exports = router;
