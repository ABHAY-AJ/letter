const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  accessToken: String, // ✅ Store access token here
});

module.exports = mongoose.model("User", UserSchema);
