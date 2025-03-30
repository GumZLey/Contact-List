const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
}, { collection: "Accounts" });

module.exports = mongoose.model("Account", AccountSchema);
