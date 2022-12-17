import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { FaSearch } from "react-icons/fa";
import { fetchRecipes } from "../../redux/recipes";

const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  const handleClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  const recipes = useSelector((state) => state.recipes);
  return (
    <div>
      <Sidebar />

      <main className="relative top-0 left-[325px] w-[calc(100%-325px)] h-screen ">
        <header className="flex justify-between items-center mx-10 pt-4">
          <h1 className="text-3xl font-semibold">Recipes</h1>

          <div className="">
            <FaSearch className="absolute text-black/20 top-7 right-60" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className=" px-3 pl-9 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            />
          </div>
        </header>

        <section className="m-10">
          <h1 className="border-b font-medium text-2xl mb-10">
            Latest Recipes
          </h1>

          {/* <table className="table-auto w-full">
              <thead className="border-b border-black">
                <tr className="text-left">
                  <th>Name</th>
                  <th>No. of People</th>
                  <th>Price</th>
                </tr>
              </thead> */}
          <div className="flex justify-between items-center border-b mb-6 mx-6">
            <h2 className="pl-2 font-bold">Title</h2>
            <h2 className="font-bold">Meal Type</h2>
            <h2 className="pr-2 font-bold">Created By</h2>
          </div>

          <div className="flex flex-col gap-2 justify-center mx-6">
            {recipes
              ?.map((recipe, index) => {
                return (
                  <div
                    key={recipe._id}
                    className={`flex justify-between items-center ${
                      index % 2 ? "bg-black/10" : ""
                    } py-4 px-2`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => {
                          navigate(`/users/${recipe.creator._id}`);
                        }}
                        className="w-16 h-16 overflow-hidden rounded-full cursor-pointer"
                      >
                        <img
                          className="w-full h-full object-cover object-center"
                          src={recipe.image}
                          alt={recipe.title}
                        />
                      </div>
                      <p
                        onClick={() => {
                          handleClick(recipe._id);
                        }}
                        className="text-lg font-semibold cursor-pointer"
                      >
                        {recipe.title}
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold">{recipe.mealType}</p>
                    </div>

                    <div className="w-12 h-12 overflow-hidden rounded-full cursor-pointer">
                      <img
                        className="w-full h-full object-cover object-center"
                        src={recipe.creator.profilePic}
                        alt={recipe.creator.username}
                      />
                    </div>
                  </div>
                );
              })
              .reverse()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Recipes;
