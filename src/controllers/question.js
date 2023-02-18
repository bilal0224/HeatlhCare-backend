const { Question, RootQuestionIDs } = require("../models/Question");

const addRootQuestion = async function (req, res) {
  try {
    const { statement, options } = req.body;
    const question = new Question({ statement: statement, options: options });
    await question.save();
    let rootQuestions = await RootQuestionIDs.findOne({});
    if (!rootQuestions) {
      rootQuestions = new RootQuestionIDs();
    }
    rootQuestions.ids.push(question._id);
    console.log(rootQuestions);
    await rootQuestions.save();
    res.send(question);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllRootQuestions = async function (req, res) {
  try {
    const rootIDs = await RootQuestionIDs.findOne({});
    const rootQuestions = await Question.find({ _id: { $in: rootIDs.ids } });
    res.send(rootQuestions);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addQuestion = async function (req, res) {
  try {
    const { parent_id, option_idx, statement, options } = req.body;
    const parentQuestion = await Question.findOne({ _id: parent_id });
    if (parentQuestion) {
      if (option_idx >= 0 && option_idx < parentQuestion.options.length) {
        const question = new Question({
          statement: statement,
          options: options,
        });
        await question.save();
        parentQuestion.options[option_idx].next_question_id = question._id;
        await parentQuestion.save();
        res.send(question);
      } else {
        res.status(400).send({ message: "Option index is not valid" });
      }
    } else {
      res.status(404).send({ message: "Parent question does not exist" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getQuestion = async function (req, res) {
  try {
    const { question_id } = req.params;
    const question = await Question.findOne({ _id: question_id });
    if (question) {
      res.send(question);
    } else {
      res.status(404).send({ message: "Question does not exist" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteQuestion = async function (req, res) {
  try {
    const { question_id } = req.params;
    const question = await Question.findOne({ _id: question_id });
    if (
      question &&
      question.options.some((item) => item.next_question_id != null)
    ) {
      res.status(409).send({ message: "Question can not be deleted" });
    } else {
      await Question.deleteOne({ _id: question_id });
      res.send({ message: "success" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateQuestion = async function (req, res) {
  try {
    const { question_id } = req.params;
    const question = await Question.findOne({ _id: question_id });
    if (question) {
      const { statement, options } = req.body;
      if (statement) {
        question.statement = statement;
      }
      if (options) {
        question.options = options;
      }
      await question.save();
      res.send(question);
    } else {
      res.status(404).send({ message: "Question does not exist" });
    }
  } catch (err) {
    req.status(500).send(err);
  }
};

module.exports = {
  addQuestion,
  addRootQuestion,
  getAllRootQuestions,
  getQuestion,
  deleteQuestion,
  updateQuestion,
};
