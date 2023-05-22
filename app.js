require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport-config");
const fs = require("fs");
const path = require("path");
const routeFiles = fs.readdirSync(path.join(__dirname, "routes"));
const flash = require("connect-flash");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const Product = require("./models/product");

const app = express();
const json = express.json();

app.use(express.static(`${__dirname}`));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// image upload to aws storage setup
const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

app.use(json);

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

//passport setup 1 -session
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }, // the cookie should only be sent over HTTPS
  })
);
app.use(flash());

//passport setup 2
app.use(passport.initialize());
app.use(passport.session());

// Define middleware to make user data available globally
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.sucM = req.flash("success");
  res.locals.errM = req.flash("error");
  next();
});

// mongoose.connect("mongodb://127.0.0.1:27017/petitcoatUserDB");

const connection = mongoose.connect(
  `mongodb+srv://admin-silver:${process.env.DB_PASSWORD}@cluster0.am2adgk.mongodb.net/petitcoattestDB`
);
if (connection) {
  console.log("connected to petitcoattestDB");
}

//app.use modular routes
routeFiles.forEach((file) => {
  if (file.slice(-3) !== ".js") {
    const insideFiles = fs.readdirSync(path.join(__dirname, "routes", file));
    insideFiles.forEach((inside) => {
      app.use(`/${inside.slice(0, -3)}`, require(`./routes/${file}/${inside}`));
    });
  } else if (file === "index.js") {
    app.use("/", require("./routes"));
  } else {
    app.use(`/${file.slice(0, -3)}`, require(`./routes/${file}`));
  }
});

app.get("/success", (req, res) => {
  res.render("success");
});

app
  .route("/cart")
  .get((req, res) => res.render("cart"))
  .post(async (req, res) => {
    let files = req.files.images;
    const { folderName, productName, productDescription, price } = req.body;

    if (!files) {
      res.status(400).send("No files uploaded");
      return;
    }

    // Convert a single file upload to an array
    if (!Array.isArray(files)) {
      files = [files];
    }

    if (!folderName || !productName || !productDescription || !price) {
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
        });
        await product.save();
      });
    } catch (err) {
      console.log("Error", err);
      res.status(500).send("Upload failed");
      return;
    }

    res.redirect("/success"); // Redirect to the home page or any other page after successful upload
  });

// app.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     console.log("Error", err);
//     res.status(500).send("Failed to fetch products");
//   }
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});

// console.log("\x1b[31m%s\x1b[0m", sth);
