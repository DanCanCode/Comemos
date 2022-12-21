import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPost } from "../../redux/singlePost";
import { removePost, updatedPost } from "../../redux/posts";
import {
  FaArrowLeft,
  FaRegHeart,
  FaHeart,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import PostForm from "./PostForm";
import Sidebar from "../Sidebar";

const SinglePost = () => {
  const [like, setLike] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const dispatch = useDispatch();
  const postId = useLocation().pathname.replace("/posts/", "");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, []);

  const editPost = () => {
    return (
      <section className="z-50 showPopUp">
        <div className="navBlur relative">
          <div className="bg-white container p-4 rounded-lg mx-auto max-w-[500px] -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2">
            <header className="flex items-center justify-between mb-4 mx-auto">
              <h1 className="text-lg font-semibold tracking-wider">
                Edit Post
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

            <PostForm currentPost={singlePost} />
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

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(removePost(postId));
    navigate("-1");
  };

  const handleLike = () => {
    setLike(!like);
    let likes = singlePost.likeCount;

    if (like == false) {
      likes = likes += 1;
      let postData = { likeCount: likes };
      dispatch(updatedPost({ id: singlePost._id, postData }));
    } else {
      likes = likes -= 1;
      let postData = { likeCount: likes };
      dispatch(updatedPost({ id: singlePost._id, postData }));
    }
  };

  const singlePost = useSelector((state) => state.singlePost);
  const currentUser = useSelector((state) => state.currentUser.user);
  return (
    <div>
      <Sidebar />

      <main className="relative top-0 left-[325px] w-[calc(100%-325px)] h-screen ">
        <button onClick={() => navigate(-1)} className="m-10 mb-6  text-2xl">
          <FaArrowLeft className="inline text-xl" /> back
        </button>

        <section className="grid grid-cols-1 place-items-center pb-8">
          <div className="w-[550px]">
            <header className="mb-4 flex justify-between items-center pb-2 border-b border-black/20">
              <div
                onClick={() => {
                  navigate(`/users/${singlePost.creator?._id}`);
                }}
                className="w-16 h-16 overflow-hidden rounded-full cursor-pointer"
              >
                <img
                  className="object-cover object-center w-full h-full"
                  src={singlePost.creator?.profilePic}
                  alt={singlePost.creator?.username}
                />
              </div>

              <div className="flex gap-4 items-center">
                {currentUser?.posts?.includes(singlePost._id) && (
                  <>
                    <FaEdit
                      onClick={() => setIsPopUpOpen(true)}
                      className="text-center hover:text-[#A4133C] inline-block text-2xl cursor-pointer"
                    />
                    <FaTrashAlt
                      onClick={handleDelete}
                      className="text-center hover:text-[#A4133C] inline-block text-2xl cursor-pointer"
                    />
                  </>
                )}
                <h1 className="text-2xl font-semibold text-right">
                  {singlePost.title}
                </h1>
              </div>
            </header>

            {isPopUpOpen && editPost()}

            <div className="w-[550px] h-[550px] overflow-hidden">
              <img
                className="rounded-md object-cover object-center w-full h-full"
                src={singlePost.image}
                atl={singlePost.title}
              />
            </div>

            <div className="flex justify-between items-center my-2 mx-4">
              <div onClick={handleLike} className="flex items-center gap-3">
                {like ? (
                  <FaHeart className="text-3xl cursor-pointer" />
                ) : (
                  <FaRegHeart className="text-3xl cursor-pointer" />
                )}{" "}
                <p>{singlePost.likeCount}</p>
              </div>
              <p className="text-md font-medium">
                {singlePost.tags?.join(", ")}
              </p>
            </div>

            <div className="flex flex-col gap-2 border-t border-black/20 pt-2">
              <p className="text-lg font-semibold">Description:</p>
              <p className="px-2">{singlePost.description}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SinglePost;
