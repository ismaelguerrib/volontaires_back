const express = require("express");
const router = new express.Router();
const Request = require("../models/Request");
const getAll = () => Request.find();
const getOne = id => Request.findById(id);
const updateOne = (id, data) =>
  Request.findByIdAndUpdate(id, data, { new: true });
const updateWhat = (id, data) =>
  Request.findByIdAndUpdate(
    id,
    { $push: { acceptingUser: data } },
    { new: true }
  );
const acceptUser = (id, data) =>
  Request.findByIdAndUpdate(id, data, { new: true });
const deleteOne = id => Request.findByIdAndDelete(id);
const create = data => Request.create(data);
const findByOwner = data => Request.find({ userId: data });
const findByUserAccepted = data => Request.find({ acceptingUser: data });
const deleteOtherUsers = (id, acceptedUserId) =>
  Request.findByIdAndUpdate(id, { acceptingUser: acceptedUserId });

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.get("/requestinguser/:id", (req, res) => {
  console.log("user requesting:", req.params.id);
  findByUserAccepted(req.params.id)
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
    date,
    month,
    year,
    hour,
    minute,
    second,
    meridiem,
    acceptingUser
  } = req.body;
  const newRequest = {
    name,
    userId,
    description,
    location,
    tags,
    date,
    month,
    year,
    hour,
    minute,
    second,
    meridiem,
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

router.get("/findbyowner/:id", (req, res) => {
  console.log(req.params.id);
  findByOwner(req.params.id)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.patch("/:id", (req, res) => {
  // console.log("updating ", req.body);
  updateOne(req.params.id, req.body).then(updatedDocument =>
    res.status(200).send(updatedDocument)
  );
});
router.patch("/accept/:id", (req, res) => {
  updateWhat(req.params.id, req.body.acceptingUser).then(updatedDocument => {
    res.status(200).send(updatedDocument);
    console.log(updatedDocument);
  });
});
router.patch("/isaccepted/:id", (req, res) => {
  console.log(req.body);
  acceptUser(req.params.id, req.body).then(updatedDocument =>
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
  getAll,
  getOne,
  updateOne,
  updateWhat,
  acceptUser,
  deleteOne,
  create,
  findByOwner,
  findByUserAccepted
};
