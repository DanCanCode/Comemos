import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSingleUser } from "../redux/singleUser";
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
        <header className="pt-20 pb-10 mx-20 flex justify-center items-center gap-8  border-b">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              className="object-cover object-center w-full h-full"
              src={singleUser.profilePic}
              alt={singleUser.username}
            />
          </div>

          <div>
            <h1 className="font-medium text-3xl">{singleUser.username}</h1>
            <p>Posts: {`asc`}</p>
          </div>
        </header>

        <section></section>
      </main>
    </div>
  );
};

export default SingleUser;
