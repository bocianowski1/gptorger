import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

import logo from "../assets/openai.png";
import { useStateContext } from "@/context/state-context";

export default function Navbar() {
  const { activeSection } = useStateContext();
  return (
    <nav
      className="bg-white/50 py-4 fixed z-10 w-screen top-0 left-0 
              flex items-center justify-between lg:px-8 lg:py-6"
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
      <div className="text-sm flex gap-6 items-center px-6 lg:text-base lg:gap-12">
        <Link
          id="feed"
          className={` ${
            activeSection === "feed" &&
            "font-extrabold transition-all duration-200 scale-105 underline"
          }`}
          href={"/feed"}
        >
          FEED
        </Link>
        <Link
          id="images"
          className={` ${
            activeSection === "images" &&
            "font-extrabold transition-all duration-200 scale-105 underline"
          }`}
          href={"/image-generation"}
        >
          IMAGES
        </Link>
        <Link
          className={` ${
            activeSection === "text" &&
            "font-extrabold transition-all duration-200 scale-105 underline"
          }`}
          href={"/text-generation"}
        >
          TEXT
        </Link>
        <Link
          className="text-lg"
          href={"https://github.com/bocianowski1"}
          target={"_blank"}
        >
          <FaGithub />
        </Link>
      </div>
    </nav>
  );
}
