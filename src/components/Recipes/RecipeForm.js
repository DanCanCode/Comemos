import React, { useEffect, useState, uuseEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, updatedRecipe } from "../../redux/recipes";
import FileBase from "react-file-base64";

const RecipeForm = (props) => {
  const currentUser = useSelector((state) => state.currentUser.user);
  const [recipeData, setRecipeData] = useState({
    title: "",
    mealType: "",
    image: "",
    ingredients: [],
    instructions: "",
    creator: currentUser._id,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const currentRecipe = props.currentRecipe;
    if (currentRecipe) {
      setRecipeData({
        ...recipeData,
        title: currentRecipe.title,
        mealType: currentRecipe.mealType,
        image: currentRecipe.image,
        ingredients: currentRecipe.ingredients,
        instructions: currentRecipe.instructions,
      });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.currentRecipe) {
      dispatch(updatedRecipe({ id: props.currentRecipe._id, recipeData }));
    } else {
      dispatch(createRecipe(recipeData));
      setRecipeData({
        ...recipeData,
        title: "",
        mealType: "",
        image: "",
        ingredients: [],
        instructions: "",
      });
    }
  };

  return (
    <main>
      <section id="FORM" className="container mx-auto max-w-[400px]">
        <form id="form" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm text-black/40">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Perfect Pancakes"
              value={recipeData.title}
              onChange={(e) =>
                setRecipeData({ ...recipeData, title: e.target.value })
              }
              required
              className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="mealType"
              className="block mb-2 text-sm text-black/40"
            >
              Meal Type
            </label>
            <select
              id="mealType"
              name="mealType"
              defaultValue={props?.currentRecipe?.mealType || "default"}
              onChange={(e) =>
                setRecipeData({
                  ...recipeData,
                  mealType: e.target.value,
                })
              }
              required
              className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            >
              <option value="default" disabled>
                Choose Meal Type
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="IMAGE mb-6">
            <label htmlFor="image" className="block mb-2 text-sm text-black/40">
              Image
            </label>

            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setRecipeData({ ...recipeData, image: base64 })
              }
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="ingredients"
              className="block mb-2 text-sm text-black/40"
            >
              Ingredients
            </label>
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              placeholder="3 Eggs, 1 Cup Milk"
              value={recipeData.ingredients}
              onChange={(e) =>
                setRecipeData({
                  ...recipeData,
                  ingredients: e.target.value.split(","),
                })
              }
              className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="instructions"
              className="block mb-2 text-sm text-black/40"
            >
              Instructions
            </label>

            <textarea
              rows="5"
              name="instructions"
              id="instructions"
              placeholder="Your instructions"
              value={recipeData.instructions}
              onChange={(e) =>
                setRecipeData({ ...recipeData, instructions: e.target.value })
              }
              className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            ></textarea>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-3 py-4 text-white tracking-wide font-medium rounded-md bg-[#A4133C] hover:bg-[#800F2F] active:scale-90 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default RecipeForm;
