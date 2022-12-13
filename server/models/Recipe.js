const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  mealType: { type: String, required: true },
  image: String,
  ingredients: { type: [String], required: true },
  instructions: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
