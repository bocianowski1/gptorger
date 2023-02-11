import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-gray-900 to-slate-700 min-h-screen h-fit">
        <Component {...pageProps} />
      </main>
    </>
  );
}
