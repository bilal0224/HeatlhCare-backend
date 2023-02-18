const express = require("express");
const {
  addQuestion,
  getAllRootQuestions,
  addRootQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/question");
const router = express.Router();

router.get("/get-all-root", getAllRootQuestions);
router.post("/add", addQuestion);
router.post("/add-root", addRootQuestion);
router.get("/get/:question_id", getQuestion);
router.delete("/delete/:question_id", deleteQuestion);
router.put("/update/:question_id", updateQuestion);

module.exports = router;
