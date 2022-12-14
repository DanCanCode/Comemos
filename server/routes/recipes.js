const router = require("express").Router();
const {
  getRecipes,
  getSingleRecipe,
  updateRecipe,
  createRecipe,
} = require("../controllers/recipes");

router.get("/", getRecipes);

router.get("/:id", getSingleRecipe);

router.put("/:id", updateRecipe);

router.post("/", createRecipe);

module.exports = router;
