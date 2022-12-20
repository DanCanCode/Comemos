import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import postsReducer from "./redux/posts";
import usersReducer from "./redux/users";
import recipesReducer from "./redux/recipes";
import currentUserReducer from "./redux/currentUser";
import singlePostReducer from "./redux/singlePost";
import singleUserReducer from "./redux/singleUser";
import singleRecipeReducer from "./redux/singleRecipe";

const reducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  recipes: recipesReducer,
  currentUser: currentUserReducer,
  singlePost: singlePostReducer,
  singleUser: singleUserReducer,
  singleRecipe: singleRecipeReducer,
});

const store = configureStore({ reducer }, applyMiddleware(thunk));
export default store;
