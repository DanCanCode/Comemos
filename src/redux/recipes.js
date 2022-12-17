import axios from "axios";

// ACTION TYPES
const ADD_RECIPE = "ADD_RECIPE";
const SET_RECIPES = "SET_RECIPES";
const UPDATE_RECIPE = "UPDATE_RECIPE";
const DELETE_RECIPE = "DELETE_RECIPE";

// ACTION CREATORS
const setRecipes = (recipes) => {
  return {
    type: SET_RECIPES,
    recipess,
  };
};

const addRecipe = (recipe) => {
  return {
    type: ADD_RECIPE,
    recipe,
  };
};

const updateRecipe = (recipe) => {
  return {
    type: UPDATE_RECIPE,
    recipe,
  };
};

const deleteRecipe = (recipe) => {
  return {
    type: DELETE_RECIPE,
    recipe,
  };
};

// THUNKS
export const fetchRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/recipes");
      dispatch(setRecipes(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createRecipe = (recipe) => {
  return async (dispatch) => {
    const { data } = await axios.post("/api/recipes", recipe);
    dispatch(addRecipe(data));
  };
};

export const updatedRecipe = (recipe) => {
  return async (dispatch) => {
    const { id, recipeData } = recipe;
    const { data } = await axios.put(`/api/recipes/${id}`, recipeData);
    console.log(data);
    dispatch(updateRecipe(data));
  };
};

export const removeRecipe = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/recipes/${id}`);
    dispatch(deleteRecipe(data));
  };
};

// REDUCER
export default function recipesReducer(state = [], action) {
  switch (action.type) {
    case SET_RECIPES:
      return action.recipes;
    case ADD_RECIPE:
      return [...state, action.recipe];
    case UPDATE_RECIPE:
      return state.map((recipe) =>
        recipe.id === action.recipe.id ? action.recipe : recipe
      );
    case DELETE_RECIPE:
      return state.filter((recipe) => recipe.id !== action.recipe.id);
    default:
      return state;
  }
}
