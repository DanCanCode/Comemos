import axios from "axios";

// ACTION TYPE
const SET_SINGLE_RECIPE = "SET_SINGLE_RECIPE";

// ACTION CREATORS
const setSingleRecipe = (recipe) => {
  return {
    type: SET_SINGLE_RECIPE,
    recipe,
  };
};

// THUNKS
export const fetchSingleRecipe = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/recipes/${id}`);
      dispatch(setSingleRecipe(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function singleRecipeReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_RECIPE:
      return action.recipe;
    default:
      return state;
  }
}
