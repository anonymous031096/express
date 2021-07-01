const router = require('express').Router();
const Subject = require('../models/subject');

router.get('/init', async (req, res) => {
  try {
    await Subject.create({ name: 'Vật lý', code: 'PHYSICS' });

    return res.json();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
