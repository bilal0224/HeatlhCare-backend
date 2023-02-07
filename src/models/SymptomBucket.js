const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symptomBucketSchema = new Schema(
  {
    symptom_groups: [[String]],
    question_id: { type: mongoose.Types.ObjectId, default: null },
  },
  { versionKey: false }
);

const SymptomBucket = mongoose.model("SymptomBucket", symptomBucketSchema);

module.exports = SymptomBucket;
