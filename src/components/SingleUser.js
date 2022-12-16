import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSingleUser } from "../redux/singleUser";
import { FaPlus } from "react-icons/fa";
import Sidebar from "./Sidebar";
import PostForm from "./Posts/PostForm";

const SingleUser = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const userId = useLocation().pathname.replace("/users/", "");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, []);

  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  };

  const showForm = () => {
    return (
      <section className="z-50 showPopUp">
        <div className="navBlur relative">
          <div className="bg-white container p-4 rounded-lg mx-auto max-w-[500px] -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2">
            <header className="flex items-center justify-between mb-4 mx-auto">
              <h1 className="text-lg font-semibold tracking-wider">
                Create Post
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

            <PostForm />
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

  window.onclick = function (event) {
    let dropdownWrapper = document.getElementById("dropdown-wrapper");
    if (
      !dropdownWrapper.contains(event.target) &&
      !menu.classList.contains("hidden")
    ) {
      menu.classList.add("hidden");
    }
  };

  const singleUser = useSelector((state) => state.singleUser);
  console.log(singleUser);
  return (
    <div>
      <Sidebar />
      <main className="relative top-0 left-[325px] w-[calc(100%-325px)] h-screen">
        <div id="dropdown-wrapper">
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-7 mx-10 py-3 px-6 shadow-md rounded-lg border text-right active:scale-90"
          >
            <FaPlus className="inline mr-3" /> Add New
          </button>
          <div
            id="menu"
            className="w-56 absolute top-[72px] right-7 mx-10 rounded-lg hidden flex flex-col bg-white drop-shadow-md"
          >
            <a
              onClick={() => setIsPopUpOpen(true)}
              className="px-5 py-3 rounded-lg hover:bg-[#A4133C] hover:text-white border-b border-gray-200 cursor-pointer"
            >
              Post
            </a>
            <a
              onClick={() => setIsPopUpOpen(true)}
              className="px-5 py-3 rounded-lg hover:bg-[#A4133C] hover:text-white border-b border-gray-200 cursor-pointer"
            >
              Recipe
            </a>
          </div>
          {isPopUpOpen && showForm()}
        </div>

        <header className="pt-20 pb-10 mx-20 flex justify-center items-center gap-12  border-b">
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <img
              className="object-cover object-center w-full h-full"
              src={singleUser.profilePic}
              alt={singleUser.username}
            />
          </div>

          <div>
            <h1 className="font-medium text-3xl mb-6">{singleUser.username}</h1>

            <div className="flex items-center justify-center divide-black/30 divide-x-[1px]">
              <div className="text-center pr-6">
                <p>Posts</p>
                <p>{singleUser.posts?.length}</p>
              </div>

              <div className="text-center px-6">
                <p>Followers</p>
                <p>{singleUser.followers?.length}</p>
              </div>

              <div className="text-center pl-6">
                <p>Following</p>
                <p>{singleUser.following?.length}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="my-8">
          <div className="flex flex-wrap gap-3 justify-center items-center mx-10">
            {singleUser.posts
              ?.map((post) => {
                return (
                  <div
                    onClick={() => {
                      console.log("signle post page");
                    }}
                    key={post._id}
                    className="w-56 h-56 overflow-hidden rounded-md cursor-pointer"
                  >
                    <img
                      className="object-cover object-center w-full h-full"
                      src={post.image}
                      alt={post.title}
                    />
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

export default SingleUser;
