const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  exerciseType: String,
  duration: Number,
  caloriesBurned: Number
},
{ timestamps: true });

module.exports =
mongoose.model("Workout",
workoutSchema);