import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../redux/posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import PrivateRoute from "./PrivateRoute";
import Welcome from "./Welcome/Welcome";
import WelcomeForm from "./Welcome/WelcomeForm";
import Explore from "./Explore/Explore";
import Recipes from "./Recipes/Recipes";
import SinglePost from "./Explore/SinglePost";
import SingleRecipe from "./Recipes/SingleRecipe";
import SingleUser from "./SingleUser";
import Settings from "./Settings";
//import NotFound from "./NotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/signup" element={<WelcomeForm />} />
        <Route exact path="/login" element={<WelcomeForm />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/posts/:id" element={<SinglePost />} />
        <Route exact path="/recipes" element={<Recipes />} />
        <Route exact path="/recipes/:id" element={<SingleRecipe />} />
        <Route exact path="/users/:id" element={<SingleUser />} />
        <Route exact path="/settings" element={<Settings />} />

        {/*
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
