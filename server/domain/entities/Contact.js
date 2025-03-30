const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  contactID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  facebook: { type: String },
  imageUrl: { type: String },
  createdDate: { type: Date, default: Date.now },
}, { collection: "Contacts" });

module.exports = mongoose.model("Contact", ContactSchema);
