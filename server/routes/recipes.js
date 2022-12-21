const router = require("express").Router();
const {
  getRecipes,
  getSingleRecipe,
  updateRecipe,
  createRecipe,
  deleteRecipe,
} = require("../controllers/recipes");

router.get("/", getRecipes);

router.get("/:id", getSingleRecipe);

router.put("/:id", updateRecipe);

router.post("/", createRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;
