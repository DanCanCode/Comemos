import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser, updatedUser } from "../redux/users";
import FileBase from "react-file-base64";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Settings = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [userData, setUserData] = useState({
    profilePic: currentUser?.profilePic,
    username: currentUser?.username,
    email: currentUser?.email,
    password: currentUser?.password,
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updatedUser({ id: currentUser._id, userData }));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(removeUser(currentUser._id));
    navigate("/");
  };

  console.log(userData);
  return (
    <div>
      <Sidebar />

      <main className="relative top-0 left-[325px] w-[calc(100%-325px)] h-screen ">
        <div className="mx-14 pt-4">
          <h1 className="text-3xl font-semibold my-10">Update Profile</h1>
          <form id="form" onSubmit={handleSubmit} className="">
            <div className="py-6 flex justify-between items-center border-b">
              <label
                htmlFor="profilePic"
                className="block mb-2 text-xl text-black"
              >
                Profile Picture
              </label>

              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setUserData({ ...userData, profilePic: base64 })
                }
              />
            </div>

            <div className="py-6 flex justify-between border-b items-center">
              <label
                htmlFor="username"
                className="block mb-2 text-xl text-black"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="TheFoodie12"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                required
                className="w-[350px] px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
              />
            </div>

            <div className="py-6 flex justify-between border-b">
              <label htmlFor="email" className="block mb-2 text-xl text-black">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="johndoe@email.com"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-[350px]  px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
              />
            </div>

            <div className="py-6 flex justify-between border-b">
              <label
                htmlFor="password"
                className="block mb-2 text-xl text-black"
              >
                Password
              </label>

              <div className="flex gap-2">
                {showPassword ? (
                  <FaEye
                    className="text-black/50 text-lg self-center"
                    onClick={() =>
                      setShowPassword((prevShowPassword) => !prevShowPassword)
                    }
                  />
                ) : (
                  <FaEyeSlash
                    className="text-black/50 text-lg self-center"
                    onClick={() =>
                      setShowPassword((prevShowPassword) => !prevShowPassword)
                    }
                  />
                )}
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*************"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className="w-[350px]  px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
                />
              </div>
            </div>

            <div className="py-6 flex justify-center">
              <button
                type="submit"
                className=" w-[350px] px-3 py-4 text-white tracking-wide font-medium rounded-md bg-[#A4133C] hover:bg-[#800F2F] active:scale-90 focus:outline-none"
              >
                Update Profile
              </button>
            </div>
          </form>

          <h1 className="text-3xl font-semibold my-10">Delete Profile</h1>
          <div className="py-6 flex flex-col items-center">
            <button
              onClick={handleDelete}
              type="submit"
              className=" w-[350px] px-3 py-4 text-white tracking-wide font-medium rounded-md bg-[#EA0000] hover:bg-[#af0000] active:scale-90 focus:outline-none"
            >
              Delete Profile
            </button>
            <p className="my-2 text-black/60">This action CANNOT be undone.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
