const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Firstname: {
    type: "String",
    trim: true,
    required: true
  },
  Lastname: {
    type: "String",
    trim: true,
    required: true
  },
  Role: {
    type: "Number",
    required: true
  },
  Username: {
    type: "String",
    trim: true,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
