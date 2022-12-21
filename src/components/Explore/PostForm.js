import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatedPost } from "../../redux/posts";
import FileBase from "react-file-base64";

const PostForm = (props) => {
  const currentUser = useSelector((state) => state.currentUser.user);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    tags: [],
    creator: currentUser._id,
    image: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const currentPost = props.currentPost;
    if (currentPost) {
      setPostData({
        ...postData,
        title: currentPost.title,
        description: currentPost.description,
        tags: currentPost.tags,
        image: currentPost.image,
      });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.currentPost) {
      dispatch(updatedPost({ id: props.currentPost._id, postData }));
    } else {
      dispatch(createPost(postData));
      setPostData({
        ...postData,
        title: "",
        description: "",
        tags: "",
        image: "",
      });
    }
  };

  console.log(postData);

  return (
    <main>
      <section id="FORM" className="container mx-auto max-w-[400px]">
        <form id="form" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm text-black/40">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="post title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              required
              className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="tags" className="block mb-2 text-sm text-black/40">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="#organic, #healthy"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
              className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            />
          </div>

          <div className="IMAGE mb-6">
            <label htmlFor="image" className="block mb-2 text-sm text-black/40">
              Image
            </label>

            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, image: base64 })
              }
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm text-black/40"
            >
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              id="description"
              placeholder="Your Description"
              value={postData.description}
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
              className="w-full px-3 py-2 placeholder-black/30 border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            ></textarea>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-3 py-4 text-white tracking-wide font-medium rounded-md bg-[#A4133C] hover:bg-[#800F2F] active:scale-90 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default PostForm;
