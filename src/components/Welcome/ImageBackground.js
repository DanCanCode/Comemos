import React from "react";
import { useSelector } from "react-redux";

const ImageBackground = () => {
  const posts = useSelector((state) => state.posts);
  const images = posts.map((post) => {
    return (
      <div
        key={post._id}
        className="overflow-hidden w-[200px] rounded-2xl shadow-md transition duration-0 hover:duration-500 hover:scale-90"
      >
        <img
          className="object-cover object-center w-full h-full"
          src={post.image}
          alt={post.title}
        />
      </div>
    );
  });

  return (
    <div className="overflow-hidden">
      <div className="flex max-h-[200px] gap-6 animate-slideinLeft">
        {images.slice(0, 6)}
      </div>
      <div
        className="flex max-h-[200px] gap-6 my-5 animate-slideinRight"
        dir="reverse"
      >
        {images.slice(6, 12)}
      </div>
      <div className="flex max-h-[200px] gap-6 my-5 animate-slideinLeft">
        {images.slice(12, 18)}
      </div>
      <div
        className="flex max-h-[200px] gap-6 animate-slideinRight"
        dir="reverse"
      >
        {images.slice(18, 24).reverse()}
      </div>
    </div>
  );
};

export default ImageBackground;
