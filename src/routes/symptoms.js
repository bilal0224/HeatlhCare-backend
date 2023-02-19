const express = require("express");
const {
  getAllSymptomBuckets,
  addSymptomBucket,
  updateSymptomBucket,
  getSymptomBucket,
  deleteSymptomBucket,
} = require("../controllers/symptom");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/get-all", auth, getAllSymptomBuckets);
router.get("/get/:bucket_id", auth, getSymptomBucket);
router.post("/add", auth, addSymptomBucket);
router.put("/update/:bucket_id", auth, updateSymptomBucket);
router.delete("/delete/:bucket_id", auth, deleteSymptomBucket);

module.exports = router;
