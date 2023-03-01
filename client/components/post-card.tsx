import React from "react";

interface Post {
  _id: string;
  name: string;
  prompt: string;
  image: string;
}

const PostCard = ({ _id, name, prompt, image }: Post) => {
  //   const { name, prompt, image } = post;
  return (
    <div className="bg-red-200 w-2/3 group relative my-4 overflow-hidden flex justify-center">
      <img
        className="h-full w-full object-contain rounded-xl shadow-lg"
        src={image}
        alt={`image of ${prompt}`}
      />
      <div className="absolute -bottom-48 bg-slate-700 w-[95%] h-1/2 transition-all duration-500 group-hover:bottom-0">
        <p>Prompt: {prompt}</p>
        <h3>Post by: {name}</h3>
      </div>
    </div>
  );
};

export default PostCard;
