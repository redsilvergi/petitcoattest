require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.use("/public/css", (req, res, next) => {
  res.set("Content-Type", "text/css");
  next();
});

app.use(express.static(`${__dirname}`));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.route("/shop").get((req, res) => res.render("shop"));
app.route("/about").get((req, res) => res.render("about"));
app.route("/login").get((req, res) => res.render("login"));
app.route("/cart").get((req, res) => res.render("cart"));

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
