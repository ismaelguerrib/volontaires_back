require("dotenv").config();
require("./config/db-connection");
require("./config/passport");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

//authenticating route
const authRoute = require("./auth/auth");
app.use("/auth", authRoute);

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
