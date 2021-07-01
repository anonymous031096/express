const router = require('express').Router();
const Question = require('../models/question');
const { validate } = require('../utils/validator');

router.post('/', [], validate, async (req, res) => {
  const { question, result1, result2, result3, result4, resultCorrect, subject, classroom, level } = req.body;

  try {
    await Question.create({ question, result1, result2, result3, result4, resultCorrect, subject, classroom, level });

    return res.json({ message: 'Thêm thành công' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/', [], validate, async (req, res) => {
  try {
    const question = await Question.find();

    return res.json([...question]);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put('/:id', [], validate, async (req, res) => {
  const { question, result1, result2, result3, result4, resultCorrect, subject, classroom, level } = req.body;
  const { id: _id } = req.params;

  try {
    const questionO = await Question.findOne({ _id });
    if (!questionO) return res.status(400).json({ message: 'Câu hỏi không tồn tại' });

    await Question.updateOne({ _id }, { $set: { question, result1, result2, result3, result4, resultCorrect, subject, classroom, level } });

    return res.json({ message: 'Cập nhật thành công' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
