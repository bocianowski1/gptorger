import { ContextType, Post } from "@/utils/types";
import { useState, useContext, createContext, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Context = createContext({} as ContextType);

const StateContext = ({ children }: Props) => {
  const [activeSection, setActiveSection] = useState("index");
  const [imageURL, setImageURL] = useState("");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

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
