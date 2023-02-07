const Question = require("../models/Question");
const SymptomBucket = require("../models/SymptomBucket");

const addSymptomBucket = async function (req, res) {
  try {
    const { symptom_groups } = req.body;
    const symptomBucket = new SymptomBucket({ symptom_groups: symptom_groups });
    await symptomBucket.save();
    res.send(symptomBucket);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllSymptomBuckets = async function (req, res) {
  try {
    const symptomBuckets = await SymptomBucket.find({});
    res.send(symptomBuckets);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateSymptomBucket = async function (req, res) {
  try {
    const { bucket_id, symptom_groups, question_id } = req.body;
    const symptomBucket = await SymptomBucket.findOne({ _id: bucket_id });
    if (symptomBucket) {
      if (symptom_groups) {
        symptomBucket.symptom_groups = symptom_groups;
      }
      const question = await Question.find({ _id: question_id });
      if (question) {
        symptomBucket.question_id = question_id;
      }
      await symptomBucket.save();
      res.send(symptomBucket);
    } else {
      res.status(404).send({ message: "Symptom bucket does not exist" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const getSymptomBucket = async function (req, res) {
  try {
    const { bucket_id } = req.params;
    const symptomBucket = await SymptomBucket.findOne({ _id: bucket_id });
    if (symptomBucket) {
      res.send(symptomBucket);
    } else {
      res.status(400).send({ message: "Symptom bucket does not exist" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteSymptomBucket = async function (req, res) {
  try {
    const { bucket_id } = req.params;
    const status = await SymptomBucket.deleteOne({ _id: bucket_id });
    res.send(status);
  } catch (err) {
    res.status(400).send({ message: "Symptom bucket does not exist" });
  }
};

module.exports = {
  addSymptomBucket,
  getAllSymptomBuckets,
  updateSymptomBucket,
  getSymptomBucket,
  deleteSymptomBucket,
};
