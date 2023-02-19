const express = require("express");
const { authenticate } = require("../controllers/user");
const router = express.Router();

router.post("/login", authenticate);

module.exports = router;
