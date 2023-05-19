require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const flash = require("connect-flash");

const app = express();

app.use(express.static(`${__dirname}`));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//passport setup 1
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
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/petitcoatUserDB");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  googleDisplayName: String,
  googleEmail: String,
  name: String,
  mobileNumber: String,
  address: String,
});

//passport setup 3
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

//passport setup 4
passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .exec()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

app.get("/", (req, res) => {
  console.log(`home log: ${req.user}`);
  res.render("home");
});

app
  .route("/joinus")
  .get((req, res) => {
    res.render("joinus");
  })
  .post((req, res) => {
    try {
      User.register(
        new User({
          username: req.body.username,
          name: req.body.name,
          mobileNumber: req.body.mob_no,
          address: req.body.address,
        }),
        req.body.password,
        () => {
          //login right after you register
          passport.authenticate("local", {
            failureRedirect: "/joinus",
          })(req, res, () => {
            res.redirect("/");
          });
        }
      );
    } catch (e) {
      console.log(e);
      res.redirect("joinus");
    }
  });

app
  .route("/login")
  .get((req, res) => {
    const errorMessage = req.flash("error");
    res.render("login", { error: errorMessage }); // Pass the flash message to the view
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (req, res) => {
      if (!req.user) {
        req.flash("error", "Invalid email or password");
        // return res.redirect("/login");
      }
      res.redirect("/");
    }
  );

app.get("/logout", async (req, res) => {
  try {
    req.logout(() => {
      res.redirect("/");
    });
  } catch (e) {
    console.log(e);
  }
});

app.route("/newarrival").get((req, res) => res.render("newarrival"));
app.route("/all").get((req, res) => res.render("ready"));
app.route("/phonecase").get((req, res) => res.render("ready"));
app.route("/griptok").get((req, res) => res.render("ready"));
app.route("/select").get((req, res) => res.render("ready"));
app.route("/brandstory").get((req, res) => res.render("ready"));
app.route("/lookbook").get((req, res) => res.render("ready"));
app.route("/showroom").get((req, res) => res.render("ready"));
app.route("/customercare").get((req, res) => res.render("ready"));
app.route("/cart").get((req, res) => res.render("cart"));

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
