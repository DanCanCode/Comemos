import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSingleRecipe } from "../../redux/singleRecipe";
import { FaArrowLeft } from "react-icons/fa";
import Sidebar from "../Sidebar";

const SingleRecipe = () => {
  const dispatch = useDispatch();
  const recipeId = useLocation().pathname.replace("/recipes/", "");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleRecipe(recipeId));
  }, []);

  const singleRecipe = useSelector((state) => state.singleRecipe);
  console.log(singleRecipe);
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
            <h1 className="text-2xl font-semibold">{singleRecipe?.title}</h1>
            <div className="h-14 w-14 overflow-hidden rounded-full">
              <img
                className="w-full h-full object-cover object-center"
                src={singleRecipe?.creator?.profilePic}
              />
            </div>
          </div>

          <div className="bg-black/20 p-8 shadow-inner uppercase max-h-72 overflow-y-auto rounded-sm">
            <h2 className="text-center text-xl font-medium pb-4">
              <span className="border-b border-black py-1">Ingredients</span>
            </h2>
            <ul className="grid grid-cols-3 gap-4 place-items-center text-center font-medium py-2">
              {singleRecipe?.ingredients?.map((ingredient) => {
                return (
                  <li className="text-sm">
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
