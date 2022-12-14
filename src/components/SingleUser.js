import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSingleUser } from "../redux/singleUser";
import { FaPlus } from "react-icons/fa";
import Sidebar from "./Sidebar";

const SingleUser = () => {
  const userId = useLocation().pathname.replace("/users/", "");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, []);

  const singleUser = useSelector((state) => state.singleUser);
  return (
    <div>
      <Sidebar />
      <main className="relative top-0 left-[325px] w-[calc(100%-325px)] h-screen">
        <button className="absolute top-5 right-7 mx-10 py-3 px-6 shadow-md rounded-lg border text-right active:scale-90">
          <FaPlus className="inline mr-3" /> Add New
        </button>

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

        <section></section>
      </main>
    </div>
  );
};

export default SingleUser;
