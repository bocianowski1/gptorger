import { ReactNode } from "react";
import Image from "next/image";

import background from "../assets/colorsky.jpg";
import Navbar from "./navbar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="pt-4">
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
}
