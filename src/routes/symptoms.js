const express = require("express");
const {
  getAllSymptomBuckets,
  addSymptomBucket,
  updateSymptomBucket,
  getSymptomBucket,
  deleteSymptomBucket,
} = require("../controllers/symptoms");
const router = express.Router();

router.get("/get-all", getAllSymptomBuckets);
router.get("/get/:bucket_id", getSymptomBucket);
router.post("/add", addSymptomBucket);
router.put("/update/:bucket_id", updateSymptomBucket);
router.delete("/delete/:bucket_id", deleteSymptomBucket);

module.exports = router;
