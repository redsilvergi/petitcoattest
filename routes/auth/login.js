const express = require("express");
const router = express.Router();
const passport = require("../../config/passport-config");
const flash = require("connect-flash");

router.use(flash());

router
  .route("/")
  .get((req, res) => {
    // const errorMessage = req.flash("error");
    res.render("authpages/login"); // Pass the flash message to the view
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true, // put string to change error message
    }),
    (req, res) => {
      res.redirect("/");
    }
  );

module.exports = router;
