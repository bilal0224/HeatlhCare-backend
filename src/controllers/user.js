const User = require("../models/User");
const bcrypt = require("bcrypt");

const authenticate = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      const result = await bcrypt.compare(password, user.password_hash);
      if (result) {
        const token = user.generateAuthToken();
        res.header({ "x-api-key": token }).send({ message: "success" });
      } else {
        res.status(401).send({ message: "Incorrect password" });
      }
    } else {
      res.status(401).send({ message: "Incorrect username or password" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { authenticate };
