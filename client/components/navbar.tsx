import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

import logo from "../assets/openai.png";
import { useStateContext } from "@/context/state-context";

const Navbar = () => {
  const { activeSection, isSignedIn, setIsSignedIn } = useStateContext();
  return (
    <nav
      className=" backdrop-blur-lg py-4 fixed z-10 w-screen top-0 left-0 
              flex items-center justify-between"
    >
      <Link
        id="text"
        className="h-8 px-4 rounded-full animate-superslowspin hover:animate-slowspin "
        href={"/"}
      >
        <Image
          className="h-full w-full object-cover"
          src={logo}
          alt={"logo"}
          height={200}
          width={200}
        />
      </Link>
      <div className="text-sm flex items-center px-6">
        <Link
          id="images"
          className={`px-4 ${
            activeSection === "images" &&
            "font-extrabold transition-all duration-200 scale-105 underline"
          }`}
          href={"/ai/image-generation"}
        >
          IMAGES
        </Link>
        <Link
          className={`px-4 ${
            activeSection === "text" &&
            "font-extrabold transition-all duration-200 scale-105 underline"
          }`}
          href={"/ai/text-generation"}
        >
          TEXT
        </Link>
        {/* <Link
          className="pl-2 text-lg"
          href={"https://github.com/bocianowski1"}
          target={"_blank"}
        >
          <FaGithub />
        </Link> */}
        <Link className="pl-2 text-lg" href={"/user/profile"}>
          <BsPersonCircle />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
