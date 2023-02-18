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

const rootQuestionIDsSchema = new Schema(
  { ids: [mongoose.Types.ObjectId] },
  { versionKey: false }
);

const Question = mongoose.model("Question", questionSchema);
const RootQuestionIDs = mongoose.model(
  "RootQuestionIDs",
  rootQuestionIDsSchema
);

module.exports = { Question, RootQuestionIDs };
