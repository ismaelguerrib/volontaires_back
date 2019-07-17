const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true,
    enum: ["helpRequester", "helpOfferer"]
  },
  age: {
    type: Number,
    required: true
  },
  currentOffers: {
    type: Array
  },
  completedTasks: {
    type: Array
  },
  currentRequests: {
    type: Array
  },
  completedRequests: {
    type: Array
  }
});

userSchema.index({ email: 1 }, { unique: true }); // ensure unique email
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
