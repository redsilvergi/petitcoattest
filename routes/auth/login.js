const express = require("express");
const router = express.Router();
const passport = require("../../config/passport-config");
const flash = require("connect-flash");

router.use(flash());

router
  .route("/")
  .get((req, res) => {
    const errorMessage = req.flash("error");
    res.render("authpages/login", { error: errorMessage }); // Pass the flash message to the view
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (req, res) => {
      if (!req.user) {
        req.flash("error", "Invalid email or password");
        // return res.redirect("/authpages/login");
      }
      res.redirect("/");
    }
  );

module.exports = router;
