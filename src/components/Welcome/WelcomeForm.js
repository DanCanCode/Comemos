import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageBackground from "./ImageBackground";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser, createUser } from "../../redux/currentUser";

const UserForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation().pathname.replace("/", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (location == "signup") {
      try {
        setError("");
        setLoading(true);
        dispatch(createUser(userData));
        navigate("/explore");
      } catch (error) {
        setError(error.message);
        console.log("ERROR", error.message);
      }
    } else if (location == "login") {
      try {
        setError("");
        setLoading(true);
        dispatch(
          loginUser({ email: userData.email, password: userData.password })
        );
        navigate("/explore");
      } catch (error) {
        setError(error.message);
        console.log("ERROR", error.message);
      }
    }
    setLoading(false);
  };

  return (
    <main>
      <ImageBackground />

      <section className="grid grid-cols-1 gap-3 container mx-auto max-w-[500px] bg-white/90 rounded-md -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2  animate-fadein p-10 border-[1px] border-black/10">
        <img className="mx-auto w-16" src={"./public/images/logo.png"} />
        <h1 className="text-center text-2xl uppercase font-semibold">
          {location == "signup" ? "Signup" : "Login"}
        </h1>
        <form
          id="form"
          className="grid grid-cols-1 gap-4"
          onSubmit={handleSubmit}
        >
          {location == "signup" && (
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm text-black/50"
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
                className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-black/50">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="yourname@email.com"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
              className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-black/50"
            >
              Password
            </label>

            <div className="flex gap-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="********"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
                className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
              />

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
            </div>
          </div>

          <div className="justify-self-center">
            <button
              type="submit"
              className="bg-[#254441] font-medium lg:text-base sm:text-sm text-xs p-2 sm:p-3 active:scale-90 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="text-center">
          <p>
            {location == "signup"
              ? "Already have an account?"
              : "New to Comemos?"}
          </p>
          <Link
            className="underline hover:no-underline hover:text-blue-600"
            to={location == "signup" ? "/login" : "/signup"}
          >
            {location == "signup" ? "Log in" : "Sign up"}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default UserForm;
