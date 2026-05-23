const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  weightGoal: String,
  calorieTarget: Number,
  stepTarget: Number
},
{ timestamps: true });

module.exports =
mongoose.model("Goal", goalSchema);