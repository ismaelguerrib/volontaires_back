const mongoose = require("mongoose");
requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  location: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  acceptingUser: {
    type: Array
  }
});
const RequestModel = mongoose.model("Request", requestSchema);

module.exports = RequestModel;
