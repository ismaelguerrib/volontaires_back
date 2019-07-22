require("dotenv").config();
require("./config/db-connection");
require("./config/passport");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: [process.env.frontURL],
  credentials: true, // required to let axios pass the cookie with any request
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 },
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

//authenticating route
const authRoute = require("./auth/auth");
const mailer = require("./mailer/mailer");
app.use("/auth", authRoute);
app.use(mailer);

//api routes

const offerAPI = require("./api/offer");
const userAPI = require("./api/user");
const requestAPI = require("./api/request");
const feedBackAPI = require("./api/feedback");
app.use("/api/users", userAPI.router);
app.use("/api/offers", offerAPI.router);
app.use("/api/requests", requestAPI.router);
app.use("/api/feedback", feedBackAPI.router);

app.listen(process.env.PORT, () => {
  console.log("App hosted on: ", process.env.SITE_URL);
});
