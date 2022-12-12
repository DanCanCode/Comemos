import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken";

const Explore = () => {
  const navigate = useNavigate();
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navigate("/");
  //     }
  //   }, []);

  const handleClick = (id) => {
    navigate(`/posts/${id}`);
  };

  const posts = useSelector((state) => state.posts);
  return (
    <div>
      <Sidebar />

      <main className="relative top-0 left-[325px] w-[calc(100%-325px)] h-screen ">
        <header className="flex justify-between items-center mx-10 pt-4">
          <h1 className="text-3xl font-semibold">Welcome Back!</h1>

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

        {/* <div className="absolute right-0 mr-6 mt-4">
          <FaSearch className="absolute text-black/20 top-3 left-3" />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="TheFoodie12"
            className=" px-3 pl-9 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
          />
        </div>*/}

        <section className="m-10">
          <h1 className="border-b font-medium text-2xl mb-10">Latest Posts</h1>

          <div className="flex flex-wrap justify-center gap-8 place-items-center">
            {posts
              ?.map((post) => {
                return (
                  <div
                    key={post._id}
                    className="border rounded-lg overflow-hidden shadow-md hover:scale-90 hover:duration-300 transition duration-300 ease-in-out"
                  >
                    <div className="w-96 h-96 overflow-hidden">
                      <img
                        onClick={() => handleClick(post._id)}
                        className="object-cover object-center w-full h-full cursor-pointer"
                        src={post.image}
                        alt={post.title}
                      />
                    </div>

                    <p className="text-lg font-medium m-4">{post.title}</p>
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

export default Explore;
