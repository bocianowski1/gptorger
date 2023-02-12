import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaGithub } from "react-icons/fa";

import logo from "../assets/openai.png";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav
      className=" backdrop-blur-lg py-4 fixed z-10 w-screen top-0 left-0 
              flex items-center justify-between"
    >
      <button
        className="h-8 px-4"
        onClick={() => {
          document.getElementById("index")?.scrollIntoView();
        }}
      >
        <Image
          className="h-full w-full object-cover"
          src={logo}
          alt={"logo"}
          height={200}
          width={200}
        />
      </button>
      <div className="text-sm flex items-center px-6">
        <button
          className="px-4 transition-all ease-in-out duration-300 hover:font-bold"
          onClick={() => {
            document.getElementById("images")?.scrollIntoView();
          }}
        >
          IMAGES
        </button>

        <button
          className="px-4 transition-all ease-in-out duration-300 hover:font-bold"
          onClick={() => {
            document.getElementById("text")?.scrollIntoView();
          }}
        >
          TEXT
        </button>
        <Link className="pl-4" href={"https://github.com/bocianowski1"}>
          <FaGithub />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
