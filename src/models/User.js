const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.SECRET_KEY);
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
