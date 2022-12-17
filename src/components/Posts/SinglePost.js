import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPost } from "../../redux/singlePost";
import { updatedPost } from "../../redux/posts";
import { FaArrowLeft, FaRegHeart, FaHeart } from "react-icons/fa";
import Sidebar from "../Sidebar";

const SinglePost = () => {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const postId = useLocation().pathname.replace("/posts/", "");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, []);

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

  console.log(like);
  const singlePost = useSelector((state) => state.singlePost);
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
              <h1 className="text-2xl font-semibold text-right">
                {singlePost.title}
              </h1>
            </header>

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
