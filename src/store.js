import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import postsReducer from "./redux/posts";
import usersReducer from "./redux/users";
import currentUserReducer from "./redux/currentUser";

const reducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  currentUser: currentUserReducer,
});

const store = configureStore({ reducer }, applyMiddleware(thunk));
export default store;
