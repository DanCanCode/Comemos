const Recipe = require("../models/Recipe");

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate({
      path: "creator",
      select: "username profilePic",
    });
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};
const getSingleRecipe = async (req, res, next) => {
  const singleRecipe = await Recipe.findOne({ _id: req.params.id })
    .populate({ path: "creator", select: "username profilePic" })
    .then(function (recipe) {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      next(error);
    });
};

const updateRecipe = async (req, res, next) => {
  try {
    const singleRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
      image: req.body.image,
    });
    res.json(singleRecipe);
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const createdRecipe = await new Recipe(req.body);
    createdRecipe.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    res.status(200).json(createdRecipe);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecipes,
  getSingleRecipe,
  updateRecipe,
  createRecipe,
};
