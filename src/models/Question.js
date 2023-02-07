const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema(
  {
    option: String,
    next_question_id: { type: mongoose.Types.ObjectId, default: null },
  },
  { _id: false }
);

const questionSchema = new Schema(
  {
    statement: String,
    options: [optionSchema],
  },
  { versionKey: false }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
