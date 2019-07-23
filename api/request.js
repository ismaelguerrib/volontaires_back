const express = require("express");
const router = new express.Router();
const Request = require("../models/Request");
const getAll = () => Request.find();
const getOne = id => Request.findById(id);
const updateOne = (id, data) => Request.findByIdAndUpdate(id, data);
const updateWhat = (id, data) =>
  Request.findByIdAndUpdate(id, { $push: { data } });
const deleteOne = id => Request.findByIdAndDelete(id);
const create = data => Request.create(data);

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
  console.log(req.body);
  const {
    name,
    userId,
    description,
    location,
    tags,
    time,
    acceptingUser
  } = req.body;
  const newRequest = {
    name,
    userId,
    description,
    location,
    tags,
    time,
    acceptingUser
  };

  console.log(newRequest);
  create(newRequest)
    .then(dbRes => res.status(200).send(dbRes.body))
    .catch(err => {
      console.log(err);
      res.status(500).send("Something went wrong");
    });
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
router.patch("/accept/:id", (req, res) => {
  updateWhat(req.params.id).then(updatedDocument =>
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
