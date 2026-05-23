const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  foodItem: String,
  calories: Number,

  mealType: {
    type: String,
    enum: [
      "Breakfast",
      "Lunch",
      "Dinner"
    ]
  }
},
{ timestamps: true });

module.exports =
mongoose.model("Diet",
dietSchema);