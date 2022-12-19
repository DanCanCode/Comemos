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
          <table className="table-auto w-full">
            <thead className="">
              <tr className="text-left">
                <th className="border-b font-medium p-2  pt-0 pb-3">Title</th>
                <th className="border-b font-medium p-2  pt-0 pb-3">
                  Meal Type
                </th>
                <th className="border-b font-medium p-2  pt-0 pb-3">
                  Created By
                </th>
              </tr>
            </thead>

            <tbody className="">
              {recipes
                ?.map((recipe, index) => {
                  return (
                    <tr
                      key={recipe._id}
                      className={` ${index % 2 ? "bg-black/10" : ""} text-left`}
                    >
                      <td
                        onClick={() => {
                          handleClick(recipe._id);
                        }}
                        className="cursor-pointer p-4 hover:text-blue-500"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 overflow-hidden rounded-full">
                            <img
                              className="w-full h-full object-cover object-center"
                              src={recipe.image}
                              alt={recipe.title}
                            />
                          </div>
                          <p className="text-lg font-semibold">
                            {recipe.title}
                          </p>
                        </div>
                      </td>

                      <td className="p-4">
                        <p className="text-lg font-semibold">
                          {recipe.mealType}
                        </p>
                      </td>

                      <td className="p-4">
                        <div
                          onClick={() => {
                            navigate(`/users/${recipe.creator._id}`);
                          }}
                          className="w-12 h-12 overflow-hidden rounded-full cursor-pointer"
                        >
                          <img
                            className="w-full h-full object-cover object-center"
                            src={recipe.creator.profilePic}
                            alt={recipe.creator.username}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Recipes;
