const express = require("express");
const router = new express.Router();
const Offer = require("../models/Offer");
const getAll = () => Offer.find();
const getOne = id => Offer.findById(id);
const updateOne = (id, data) =>
  Offer.findByIdAndUpdate(id, data, { new: true });
const updateWhat = (id, data) =>
  Offer.findByIdAndUpdate(
    id,
    { $push: { acceptingUser: data } },
    { new: true }
  );
const acceptUser = (id, data) =>
  Offer.findByIdAndUpdate(id, data, { new: true });
const deleteOne = id => Offer.findByIdAndDelete(id);
const create = data => Offer.create(data);
const findByOwner = data => Offer.find({ userId: data });
const findByUserAccepted = data => Offer.find({ acceptingUser: data });
const deleteOtherUsers = (id, acceptedUserId) =>
  Offer.findByIdAndUpdate(id, { acceptingUser: acceptedUserId });

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.get("/findbyowner/:id", (req, res) => {
  console.log("owner:", req.params.id);
  findByOwner(req.params.id)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.get("/requestinguser/:id", (req, res) => {
  console.log("user yayay", req.body);
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
  console.log("req body tamere", req.body);
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
    meridiem
  } = req.body;
  const newOffer = {
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
    meridiem
  };

  console.log("sent object", newOffer);
  create(newOffer)
    .then(dbRes => res.status(200).send(dbRes.body))
    .catch(err => res.status(500).send(err, "Something went wrong Bro"));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(error => res.status(500).send("Something went wrong"));
});

router.patch("/:id", (req, res) => {
  console.log("ici", req.body);
  updateOne(req.params.id, req.body)
    .then(updatedDocument => {
      console.log(updatedDocument);
      res.status(200).send(updatedDocument);
    })
    .catch(err => console.log(err));
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

router.patch("/removeotherusers/:id", (req, res) => {
  console.log(req);
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
