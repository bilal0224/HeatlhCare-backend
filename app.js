const express = require("express");
const app = express();
require("dotenv").config();
const config = require("./config");

const mongoose = require("mongoose");
mongoose.connect(config.MONGODB_URL, () => {
  console.log(`db connected: ${config.MONGODB_URL}`);
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const symptomsRouter = require("./src/routes/symptoms");
app.use("/symptoms", symptomsRouter);

const questionsRouter = require("./src/routes/questions");
app.use("/questions", questionsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to AICheckup!");
});

app.listen(config.APP_PORT, () => {
  console.log(`App listening at http://${config.APP_HOST}:${config.APP_PORT}`);
});
