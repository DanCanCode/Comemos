import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSingleRecipe } from "../../redux/singleRecipe";
import { FaArrowLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import Sidebar from "../Sidebar";
import RecipeForm from "./RecipeForm";
import { removeRecipe } from "../../redux/recipes";

const SingleRecipe = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const dispatch = useDispatch();
  const recipeId = useLocation().pathname.replace("/recipes/", "");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleRecipe(recipeId));
  }, []);

  const editRecipe = () => {
    return (
      <section className="z-50 showPopUp">
        <div className="navBlur relative">
          <div className="bg-white container p-4 rounded-lg mx-auto max-w-[500px] -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2">
            <header className="flex items-center justify-between mb-4 mx-auto">
              <h1 className="text-lg font-semibold tracking-wider">
                Edit Recipe
              </h1>
              <div
                className="CROSS-ICON  cursor-pointer"
                onClick={() => setIsPopUpOpen(false)} // change isNavOpen state to false to close the menu
              >
                <svg
                  className="h-8 w-8 "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </header>

            <RecipeForm currentRecipe={singleRecipe} />
          </div>
        </div>

        <style>{`
    .navBlur {
        display: block;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        backdrop-filter: blur(4px);
        background-color: hsla(0,0%,7%,.36);
    }

    .showPopUp {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 50;
    `}</style>
      </section>
    );
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(removeRecipe(recipeId));
    navigate("-1");
  };

  const singleRecipe = useSelector((state) => state.singleRecipe);
  const currentUser = useSelector((state) => state.currentUser.user);
  return (
    <div>
      <Sidebar />

      <main className="relative top-0 left-[325px] w-[calc(100%-325px)] h-screen ">
        <header className="relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute text-2xl text-white mx-10 pt-4 z-50"
          >
            <FaArrowLeft className="inline text-xl" /> back
          </button>

          <div>
            <div className="h-52 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={singleRecipe?.image}
              />
            </div>
            <div className="absolute top-0 w-full h-52 bg-black/20"></div>
          </div>
        </header>

        <section className="mx-10 my-4">
          <div className="flex justify-between items-center border-b py-4">
            <div className="flex gap-4 items-center">
              <h1 className="text-2xl font-semibold">{singleRecipe?.title}</h1>
              {currentUser?.recipes?.includes(singleRecipe._id) && (
                <>
                  <FaEdit
                    onClick={() => setIsPopUpOpen(true)}
                    className="text-center hover:text-[#A4133C] inline-block text-2xl cursor-pointer"
                  />
                  <FaTrashAlt
                    onClick={handleDelete}
                    className="text-center hover:text-[#A4133C] inline-block text-2xl cursor-pointer"
                  />
                </>
              )}
            </div>

            {isPopUpOpen && editRecipe()}

            <div
              onClick={() => {
                navigate(`/users/${singleRecipe?.creator?._id}`);
              }}
              className="h-14 w-14 overflow-hidden rounded-full cursor-pointer"
            >
              <img
                className="w-full h-full object-cover object-center"
                src={singleRecipe?.creator?.profilePic}
              />
            </div>
          </div>

          <div className="bg-black/10 p-8 shadow-inner uppercase max-h-72 overflow-y-auto rounded-sm  font-mono">
            <h2 className="text-center text-xl font-medium pb-4">
              <span className="border-b border-black py-1">Ingredients</span>
            </h2>
            <ul className="grid grid-cols-3 gap-4 place-items-center text-center font-medium py-2">
              {singleRecipe?.ingredients?.map((ingredient, index) => {
                return (
                  <li key={index} className="text-sm">
                    <p>{ingredient}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="py-4">
            <h2 className="text-2xl font-semibold py-4 border-b">
              Instructions:
            </h2>
            <p className="text-left font-medium m-4">
              {singleRecipe?.instructions}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SingleRecipe;
