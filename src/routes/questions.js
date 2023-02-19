const express = require("express");
const {
  addQuestion,
  getAllRootQuestions,
  addRootQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/question");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/get-all-root", auth, getAllRootQuestions);
router.post("/add", auth, addQuestion);
router.post("/add-root", auth, addRootQuestion);
router.get("/get/:question_id", auth, getQuestion);
router.delete("/delete/:question_id", auth, deleteQuestion);
router.put("/update/:question_id", auth, updateQuestion);

module.exports = router;
