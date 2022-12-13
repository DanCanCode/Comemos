import React from "react";
import Sidebar from "./Sidebar";

const Recipes = () => {
  return (
    <div>
      <Sidebar />

      <main className="relative top-0 left-[325px] w-[calc(100%-325px)] h-screen ">
        <h1>hello recipes</h1>
      </main>
    </div>
  );
};

export default Recipes;
