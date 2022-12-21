import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../redux/posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";
import Welcome from "./Welcome/Welcome";
import WelcomeForm from "./Welcome/WelcomeForm";
import Explore from "./Explore/Explore";
import Recipes from "./Recipes/Recipes";
import SinglePost from "./Explore/SinglePost";
import SingleRecipe from "./Recipes/SingleRecipe";
import SingleUser from "./SingleUser";
import Settings from "./Settings";
import NotFound from "./NotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/signup" element={<WelcomeForm />} />
        <Route path="/login" element={<WelcomeForm />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route exact path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<SingleRecipe />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
