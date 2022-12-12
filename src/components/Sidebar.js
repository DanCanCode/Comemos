import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaCompass,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUtensils,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => {
    console.log(state);
    return state.currentUser;
  });
  return (
    <div className="overflow-hidden fixed w-[325px] h-screen bg-[#f0f0f0] flex flex-col gap-8 z-50">
      <header className="flex gap-3 justify-start items-center mt-4 ml-4">
        <img
          className="w-10"
          src={"../../public/images/logo.png"}
          alt="comemos"
        />
        <h1 className="text-2xl">comemos</h1>
      </header>

      <section className="grid grid-cols-1 gap-3 place-items-center">
        <div className="overflow-hidden w-24 rounded-full">
          <img
            className="object-cover object-center"
            src={user.profilePic}
            alt={user.username}
          />
        </div>
        <h1 className="text-lg font-semibold">{user.username}</h1>
      </section>

      <div className="flex items-center justify-center divide-black/30 divide-x-[1px]">
        <div className="text-center px-6">
          <p>Posts</p>
          <p>12</p>
        </div>

        <div className="text-center px-6">
          <p>Followers</p>
          <p>483</p>
        </div>

        <div className="text-center px-6">
          <p>Following</p>
          <p>30</p>
        </div>
      </div>

      <section className="flex flex-col gap-8 items-start justify-center ml-4">
        <NavLink
          className="font-medium text-xl transition duration-300 ease-in-out hover:translate-x-6 hover:duration-300"
          to="/explore"
          style={({ isActive }) => ({
            color: isActive ? "#A4133C" : "#000000",
          })}
        >
          <FaCompass className="inline" /> Explore
        </NavLink>

        <NavLink
          className="font-medium text-xl transition duration-300 ease-in-out hover:translate-x-6 hover:duration-300"
          to="/recipes"
          style={({ isActive }) => ({
            color: isActive ? "#A4133C" : "#000000",
          })}
        >
          <FaUtensils className="inline" /> Recipes
        </NavLink>

        <NavLink
          className="font-medium text-xl transition duration-300 ease-in-out hover:translate-x-6 hover:duration-300"
          to="/profile"
          style={({ isActive }) => ({
            color: isActive ? "#A4133C" : "#000000",
          })}
        >
          <FaUser className="inline" /> Profile
        </NavLink>

        <NavLink
          className="font-medium text-xl transition duration-300 ease-in-out hover:translate-x-6 hover:duration-300"
          to="/settings"
          style={({ isActive }) => ({
            color: isActive ? "#A4133C" : "#000000",
          })}
        >
          <FaCog className="inline" /> Settings
        </NavLink>

        <button
          className="font-medium text-xl hover:text-[#A4133C] transition duration-300 ease-in-out hover:translate-x-6 hover:duration-300"
          onClick={() => {
            navigate("/login");
          }}
        >
          <FaSignOutAlt className="inline" /> Logout
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
