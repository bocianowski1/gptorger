import { Dispatch, SetStateAction } from "react";

export type Post = {
  _id: string;
  name: string;
  prompt: string;
  image: string;
};

export type ContextType = {
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
  imageURL: string;
  setImageURL: Dispatch<SetStateAction<string>>;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
};
