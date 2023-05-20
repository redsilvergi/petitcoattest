const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => res.render("shoplistpages/newarrival"));

module.exports = router;
