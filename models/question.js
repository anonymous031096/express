const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    question: { type: String, required: true },
    result1: { type: String, required: true },
    result2: { type: String, required: true },
    result3: { type: String, required: true },
    result4: { type: String, required: true },
    resultCorrect: { type: Number, required: true },
    subject: { type: String, required: true },
    classroom: { type: Number, required: true },
    level: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
