const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

/* GET home page */

router.post("/send-email", (req, res, next) => {
  console.log(req.body);
  const { name, lastname, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_ADRESS,
      pass: process.env.MAIL_PASS
    }
  });

  // return console.log(transporter.options.auth.user);
  transporter
    .sendMail({
      from: email,
      to: transporter.options.auth.user,
      subject: `${subject}`,
      text: `${message}`,
      html: `
      <p>you got a message from ${name} - ${lastname}</p>
      <hr>
      <p>${message}</p>
      `
    })
    .then(info => res.send("email sent successfully"))
    .catch(error => {
      res.json({ error });
    });
});

module.exports = router;
