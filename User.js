const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  age: {
    type: Number
  },

  gender: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String
  },

  fitnessGoals: {
    type: String
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  blocked: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true }
);

module.exports =
mongoose.model("User", userSchema);