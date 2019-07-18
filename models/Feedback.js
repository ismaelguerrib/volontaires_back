const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedbackSchema = new mongoose.Schema({
  isCompleted: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number
  },
  comments: {
    type: String
  },

  helpedUser: { type: Schema.Types.ObjectId, ref: "User" },
  helper: { type: Schema.Types.ObjectId, ref: "User" }
});

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);

module.exports = FeedbackModel;
