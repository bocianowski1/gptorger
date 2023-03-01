import { useState, useContext, createContext, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface Post {
  name: string;
  prompt: string;
  imageURL: string;
}

const Context = createContext({} as any);

const StateContext = ({ children }: Props) => {
  const [activeSection, setActiveSection] = useState("index");
  const [imageURL, setImageURL] = useState("");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<Promise<Post>[]>([]);

  return (
    <Context.Provider
      value={{
        activeSection,
        setActiveSection,
        imageURL,
        setImageURL,
        text,
        setText,
        posts,
        setPosts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

export default StateContext;
