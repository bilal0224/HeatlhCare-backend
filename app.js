const express = require("express");
const app = express();
require("dotenv").config(); // require and configure package // add env variables in process.env object
const config = require("./config");
var cors = require('cors')

const mongoose = require("mongoose");
mongoose.connect(config.MONGODB_URL, () => {
  console.log(`db connected: ${config.MONGODB_URL}`);
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);
app.use(cors())

const symptomsRouter = require("./src/routes/symptoms");
app.use("/symptoms", symptomsRouter);

const questionsRouter = require("./src/routes/questions");
app.use("/questions", questionsRouter);

const usersRouter = require("./src/routes/users");
app.use("/", usersRouter);

app.get("/", (req, res) => {
  res.send("Welcome to AICheckup!");
});

app.listen(config.APP_PORT, () => {
  console.log(`App listening at http://${config.APP_HOST}:${config.APP_PORT}`);
});
