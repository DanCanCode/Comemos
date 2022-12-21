import React from "react";
import { Link } from "react-router-dom";
import ImageBackground from "./ImageBackground";

const Welcome = () => {
  return (
    <main>
      <ImageBackground />
      <section className="text-center bg-white/90 rounded-md -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 grid grid-cols-1 gap-3 place-items-center animate-fadein p-10 border-[1px] border-black/10">
        <img className="mx-auto w-16" src={"./public/images/logo.png"} />
        <h1 className="text-2xl uppercase font-semibold">
          welcome to comemos!
        </h1>
        <p className="">Share photos, find recipes, connect with friends!</p>
        <Link
          className="bg-[#254441] font-medium lg:text-base sm:text-sm text-xs p-2 sm:p-3 active:scale-90 inline-block text-white rounded-md"
          to="/signup"
        >
          Sign Up
        </Link>
      </section>
    </main>
  );
};

export default Welcome;
