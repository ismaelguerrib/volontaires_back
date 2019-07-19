const mongoose = require("mongoose");
const Schema = mongoose.Schema;
requestSchema = new mongoose.Schema({
  name: {
    type: String
    // required: true
  },
  userId: {
    type: String
    // required: true
  },
  description: {
    type: String,
    // required: true,

    index: true
  },
  location: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    enum: [
      "Take a walk",
      "DIY",
      "Admiministrative",
      "Learn",
      "Nursering",
      "Other"
    ]
    // required: true
  },
  time: {
    type: Date
    // required: true
  },
  acceptingUser: {
    type: Array
  },
  isAccepted: {
    type: Boolean,
    default: false
  },
  feedback: [{ type: Schema.Types.ObjectId, ref: "Feedback" }]
});
const RequestModel = mongoose.model("Request", requestSchema);

module.exports = RequestModel;
