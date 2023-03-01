import { ReactNode } from "react";
import Image from "next/image";

import background from "../assets/colorsky.jpg";
import Navbar from "./navbar";
import Scrollbar from "./scrollbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {/* <Scrollbar /> */}
      <main className="">
        <Image
          className="h-full w-full object-cover -z-20 fixed top-0"
          src={background}
          alt={"background"}
          height={400}
          width={400}
        />
        {children}
      </main>
    </>
  );
};

export default Layout;
