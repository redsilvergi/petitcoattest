const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  imageURL: String,
  productName: String,
  productDescription: String,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);
