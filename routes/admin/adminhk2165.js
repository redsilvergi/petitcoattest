require("dotenv").config();
const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const flash = require("connect-flash");

router.use(flash());

// image upload to aws storage setup
const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

router
  .route("/")
  .get((req, res) => res.render("adminpages/admin"))
  .post(async (req, res) => {
    if (!req.files) {
      res.send(
        "<h1>no file uploaded <a href=/adminhk2165>go back to admin</a></h1>"
      );
      return;
    } else {
      var files = req.files.images;
    }
    const { folderName, productName, productDescription, price, section } =
      req.body;

    // Convert a single file upload to an array
    if (!Array.isArray(files)) {
      files = [files];
    }

    if (
      !folderName ||
      !productName ||
      !productDescription ||
      !price ||
      !section
    ) {
      res.status(400).send("All fields are required");
      return;
    }

    const uploadTime = new Date().getTime();

    try {
      files.map(async (file) => {
        const uploadParams = {
          Bucket: "petitcoatbucket",
          Key: `${folderName}/${uploadTime}${file.name}`,
          Body: file.data,
          ContentType: file.mimetype,
          ACL: "public-read",
        };

        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        const imageURL = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
        console.log("Upload Success", imageURL);

        const product = new Product({
          imageURL,
          productName,
          productDescription,
          price,
          section,
        });
        await product.save();
        req.flash("tt", "Form Submitted Successfully!");
      });
    } catch (err) {
      console.log("Error", err);
      res.status(500).send("Upload failed");
      return;
    }

    res.redirect("/adminhk2165"); // Redirect to the home page or any other page after successful upload
  });

module.exports = router;
