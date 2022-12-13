const router = require("express").Router();
const {
  getRecipes,
  getSingleRecipe,
  updateRecipe,
  createRecipe,
} = require("../controllers/recipe");

router.get("/", getRecipes);

router.get("/:id", getSingleRecipe);

router.put("/:id", updateRecipe);

router.post("/", createRecipe);

module.exports = router;
