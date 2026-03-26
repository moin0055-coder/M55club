const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: String,
  password: String,
  coins: { type: Number, default: 100 }
});

module.exports = mongoose.model("User", schema);
