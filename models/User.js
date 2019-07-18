const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  firstname: {
    type: String
    // required: true
  },
  lastname: {
    type: String
    // required: true
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    index: true
  },
  password: {
    type: String
    // required: true
  },
  service: {
    type: String,
    // required: true,
    enum: ["Help Requester", "Help Offerer"]
  },
  age: {
    type: Number
    // required: true
  },
  picture: {
    type: String,
    default: "/images/download.png"
  },
  currentOffers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],

  completedOffer: [{ type: Schema.Types.ObjectId, ref: "Offer" }],

  currentRequests: [{ type: Schema.Types.ObjectId, ref: "Request" }],

  completedRequests: [{ type: Schema.Types.ObjectId, ref: "Request" }],

  feedback: [{ type: Schema.Types.ObjectId, ref: "Feedback" }]
});

userSchema.index({ email: 1 }, { unique: true }); // ensure unique email
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
