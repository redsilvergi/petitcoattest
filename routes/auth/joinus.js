const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("../../config/passport-config");
const flash = require("connect-flash");

router.use(flash());

router
  .route("/")
  .get((req, res) => {
    const errorMessage = req.flash("error");
    res.render("authpages/joinus", { error: errorMessage });
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
            failureFlash: true,
          })(req, res, () => {
            res.redirect("/");
          });
        }
      );
    } catch (e) {
      console.log(e);
      res.redirect("authpages/joinus");
    }
  });

module.exports = router;
