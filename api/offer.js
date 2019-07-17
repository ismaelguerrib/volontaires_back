const express = require("express");
const router = new express.Router();
const Offer = require("../models/Offer");
const uploader = require("./../config/cloudinary");
const getAll = () => Offer.find();
const getOne = id => Offer.findById(id);
const updateOne = (id, data) => Offer.findByIdAndUpdate(id, data);
const deleteOne = id => Offer.findByIdAndDelete(id);
const create = data => Offer.create(data);

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

router.post("/", uploader.array("coverImages", 3), (req, res) => {
  console.log(req.body);
  const {
    name,
    userId,
    description,
    location,
    tags,
    time,
    userAccepting
  } = req.body;
  const newOffer = {
    name,
    userId,
    description,
    location,
    tags,
    time,
    userAccepting
  };

  req.files.forEach(element => {
    // console.log(element);
    newOffer.coverImages.push(element.secure_url);
  });

  console.log(newArticle);
  create(newArticle)
    .then(dbRes => res.status(200).send(dbRes.body))
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
