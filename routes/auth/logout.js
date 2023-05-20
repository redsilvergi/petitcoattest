const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    req.logout(() => {
      res.redirect("/");
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
