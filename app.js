require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport-config");
const fs = require("fs");
const path = require("path");
const routeFiles = fs.readdirSync(path.join(__dirname, "routes"));
const flash = require("connect-flash");

const app = express();

app.use(express.static(`${__dirname}`));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//passport setup 1 -session
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }, // the cookie should only be sent over HTTPS
  })
);
app.use(flash());

//passport setup 2
app.use(passport.initialize());
app.use(passport.session());

// Define middleware to make user data available globally
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.sucM = req.flash("success");
  res.locals.errM = req.flash("error");
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/petitcoatUserDB");

//app.use modular routes
routeFiles.forEach((file) => {
  if (file.slice(-3) !== ".js") {
    const insideFiles = fs.readdirSync(path.join(__dirname, "routes", file));
    insideFiles.forEach((inside) => {
      app.use(`/${inside.slice(0, -3)}`, require(`./routes/${file}/${inside}`));
    });
  } else if (file === "index.js") {
    app.use("/", require("./routes"));
  } else {
    app.use(`/${file.slice(0, -3)}`, require(`./routes/${file}`));
  }
});

// app.route("/cart").get((req, res) => res.render("cart"));

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});

// console.log("\x1b[31m%s\x1b[0m", sth);
