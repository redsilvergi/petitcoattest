const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(`home log: ${req.user}`);
  res.render("home");
});

module.exports = router;
