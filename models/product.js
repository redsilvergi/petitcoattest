const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  imageURL: String,
  productName: String,
  productDescription: String,
  price: Number,
  section: String,
});

module.exports = mongoose.model("Product", productSchema);
