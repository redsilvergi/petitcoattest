const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  googleDisplayName: String,
  googleEmail: String,
  name: String,
  mobileNumber: String,
  address: String,
});

//tool plugin (passport setup 3)
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
