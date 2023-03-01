import Navbar from "@/components/navbar";
import Image from "next/image";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

import StateContext from "@/context/state-context";
import Layout from "@/components/layout";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <AnimatePresence>
          <Component key={router.pathname} {...pageProps} />
        </AnimatePresence>
      </Layout>
    </StateContext>
  );
}
