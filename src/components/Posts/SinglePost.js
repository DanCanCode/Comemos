import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPost } from "../../redux/singlePost";
import { FaArrowLeft } from "react-icons/fa";
import Sidebar from "../Sidebar";

const SinglePost = () => {
  const dispatch = useDispatch();
  const postId = useLocation().pathname.replace("/posts/", "");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPost(postId));
    // const singlePost = useSelector((state) => state.singlePost);
    console.log(singlePost);
    // dispatch(setSingleUser(singlePost.creator));
  }, []);

  const singlePost = useSelector((state) => state.singlePost);
  return (
    <div>
      <Sidebar />

      <main className="relative top-0 left-[325px] w-[calc(100%-325px)] h-screen ">
        <button onClick={() => navigate(-1)} className="m-10  text-2xl">
          <FaArrowLeft className="inline" /> back
        </button>

        <section className="grid grid-cols-1 place-items-center">
          <div className="">
            <header className="mb-4">
              <img />
              <h1 className="text-3xl font-semibold text-right">
                {singlePost.title}
              </h1>
            </header>

            <div className="w-[600px] h-[600px] overflow-hidden">
              <img
                className="rounded-md object-cover object-center w-full h-full"
                src={singlePost.image}
                atl={singlePost.title}
              />
            </div>
            <p></p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SinglePost;
