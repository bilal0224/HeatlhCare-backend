const express = require("express");
const app = express();
const config = require("config");

const db_host = config.get("mongo.host");
const db_port = config.get("mongo.port");
const mongoose = require("mongoose");
mongoose.connect(`mongodb://${db_host}:${db_port}/mydb`, () => {
  console.log(`db connected to ${db_host}:${db_port}`);
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const symptomsRouter = require("./src/routes/symptoms");
app.use("/symptoms", symptomsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to AICheckup!");
});

const app_host = config.get("app.host");
const app_port = config.get("app.port");
app.listen(app_port, () => {
  console.log(`App listening at http://${app_host}:${app_port}`);
});
