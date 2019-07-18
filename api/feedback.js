const express = require("express");
const router = new express.Router();
const Feedback = require("../models/Feedback");
const getAll = () => Feedback.find();
const getOne = id => Feedback.findById(id);
const updateOne = (id, data) => Feedback.findByIdAndUpdate(id, data);
const deleteOne = id => Feedback.findByIdAndDelete(id);
const create = data => Feedback.create(data);

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.post("/", (req, res) => {
  create(req.body)
    .then(dbRes => res.status(200).send(dbRes))
    .catch(err => res.status(500).send("Something went wrong"));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.patch("/:id", (req, res) => {
  updateOne(req.params.id).then(updatedDocument =>
    res.status(200).send(updatedDocument)
  );
});

//TODO Validation ??
module.exports = {
  router,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  create
};
