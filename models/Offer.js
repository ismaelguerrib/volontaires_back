const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema({
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
    required: true
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

  userAccepting: [{ type: Schema.Types.ObjectId, ref: "User" }],

  isAccepted: {
    type: Boolean,
    default: false
  }
});

// offerSchema.index({ email: 1 }, { unique: true }); // ensure unique email
const OfferModel = mongoose.model("Offer", offerSchema);

module.exports = OfferModel;
