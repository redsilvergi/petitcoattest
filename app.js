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

const app = express();

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

mongoose.connect("mongodb://127.0.0.1:27017/petitcoatUserDB");

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

app.route("/cart").get((req, res) => res.render("cart"));

app.post("/cart", async (req, res) => {
  const file = req.files.image;
  const folderName = "testpics3"; // Specify the desired folder name
  const uploadTime = new Date().getTime();

  const uploadParams = {
    Bucket: "petitcoatbucket",
    Key: `${folderName}/${uploadTime}${file.name}`,
    Body: file.data,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    const imageURL = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
    console.log("Upload Success", data, imageURL);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send("Upload failed");
  }

  res.redirect("/"); // Redirect to the home page or any other page after successful upload
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});

// console.log("\x1b[31m%s\x1b[0m", sth);
