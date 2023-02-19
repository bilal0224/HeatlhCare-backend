const jwt = require("jsonwebtoken");
const config = require("../../config");

const auth = async function (req, res, next) {
  const token = req.headers["x-api-key"];
  if (!token) {
    res.status(401).send({ message: "x-api-key missing in headers" });
  } else {
    try {
      jwt.verify(token, config.SECRET_KEY);
      next();
    } catch (err) {
      res.status(401).send({ message: "Invalid x-api-key" });
    }
  }
};

module.exports = auth;
