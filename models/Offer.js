const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const offerSchema = new mongoose.Schema({
  name: {
    type: String
    // required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
    // required: true
  },
  description: {
    type: String
    // required: true
  },
  location: {
    type: String
    // required: true
  },
  tags: {
    type: String
    // enum: [
    //   "Take a walk",
    //   "DIY",
    //   "Admiministrative",
    //   "Learn",
    //   "Nursering",
    //   "Other"
    // ]
    // required: true
  },
  time: {
    type: Date
    // required: true
  },

  userAccepting: [{ type: Schema.Types.ObjectId, ref: "User" }],

  isAccepted: {
    type: Boolean,
    default: false
  }
});

// offerSchema.index({ email: 1 }, { unique: true }); // ensure unique email
const OfferModel = mongoose.model("Offer", offerSchema);

module.exports = OfferModel;
