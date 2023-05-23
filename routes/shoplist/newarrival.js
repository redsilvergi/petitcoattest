const express = require("express");
const router = express.Router();
const Product = require("../../models/product");

router.route("/").get(async (req, res) => {
  try {
    const products = await Product.find({ section: "newarrival" }).sort({
      createdAt: -1,
    }); //.limit(10);
    // console.log(products);

    res.render("shoplistpages/newarrival", { products });
  } catch (e) {
    console.log("Error: ", e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
