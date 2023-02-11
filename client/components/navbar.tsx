import Link from "next/link";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <nav className=" bg-gradient-to-b from-gray-100 to-slate-300 relative shadow-lg">
        <Link href={"/"}>
          <h1
            className="font-extrabold text-transparent text-7xl bg-clip-text 
                      bg-gradient-to-br from-purple-500 to-sky-400 text-center
                      flex justify-center py-6"
          >
            GPTorger
            {/* <p className=" animate-spin">🤣</p> */}
          </h1>
        </Link>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="text-4xl flex justify-center items-center 
                          absolute top-0 right-0 mr-8 mt-12 hover:cursor-pointer"
        >
          {showMenu ? (
            <button className="active:animate-turn">
              <FaAngleRight />
            </button>
          ) : (
            <button className="active:animate-turn">
              <FaAngleLeft />
            </button>
          )}
        </div>
      </nav>
      <div className="relative w-screen">
        <div
          className={`bg-slate-300 absolute right-0 w-1/5 
                          flex justify-center py-2 translate-x-full
                           ${
                             showMenu ? "animate-slidein" : "animate-slideout"
                           }`}
        >
          <ul>
            <Link href={"image-generation"}>
              <li>Image</li>
            </Link>

            <Link href={"/text-generation"}>
              <li>Text</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
