const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema({
  username: String,
  content: String,
  img: String
});

// offerSchema.index({ email: 1 }, { unique: true }); // ensure unique email
const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
