const express = require("express");
const router = new express.Router();
const Chat = require("../models/Chat");
const getAll = () => Chat.find();
// const deleteOne = id => Chat.findByIdAndDelete(id);
const create = data => Chat.create(data);

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.post("/", (req, res) => {
  console.log("req body", req.body);
  const { username, content, img } = req.body;
  const newMessage = {
    username,
    content,
    img
  };
  Chat.create(newMessage)
    .then(dbRes => res.status(200).send(dbRes))
    .catch(err => res.status(500).send(err, "Something went wrong Bro"));
});

module.exports = {
  router,
  getAll,

  create
};
