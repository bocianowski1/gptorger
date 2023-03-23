import Image from "next/image";
import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import { useStateContext } from "@/context/state-context";

import speakingBubble from "../assets/speaking-bubble.png";
import talkingRobot from "../assets/talking-robot.png";
import LoadingCircle from "@/components/loading-circle";

export default function TextGeneration() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const { setActiveSection, text, setText } = useStateContext();

  const placeholder = "What's the meaning of life?";

  useEffect(() => {
    setActiveSection("text");
  }, []);

  const generateText = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.length === 0 ? placeholder : prompt,
        }),
      });
      const data = response.body;
      if (!data) return;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);
        setText((prev: string) => (prev += chunk));
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ x: "-100%" }}
      className="h-screen absolute top-0 left-0 w-full"
    >
      <div className="pt-28 flex flex-col mx-auto">
        <div className="flex items-start flex-col px-4 overflow-hidden">
          <m.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="backdrop-contrast-100 backdrop-blur-sm text-lg text-gray-800"
          >
            AI GENERATED
          </m.h3>
          <m.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="backdrop-contrast-100 font-extrabold text-transparent text-6xl bg-clip-text 
                          bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400"
          >
            TEXT
          </m.h1>
        </div>

        <form className="flex flex-col items-center py-4 mt-4">
          <textarea
            id="textfield"
            className="bg-gradient-to-br from-white via-gray-50 to-gray-200
                      px-4 py-2 w-2/3 rounded-sm min-h-[2rem] max-h-[6rem] overflow-x-scroll"
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                setText("");
                await generateText();
              }
              if (e.key === "Tab") setPrompt(placeholder);
            }}
            placeholder={placeholder}
          />
          <div className="flex justify-center pt-4">
            {loading ? (
              <button
                disabled
                type="button"
                className={`${
                  loading ? "bg-rose-400" : "bg-rose-600"
                } font-bold border-2 border-black px-12 py-2
                            hover:bg-rose-400 hover:cursor-not-allowed`}
              >
                <LoadingCircle />
              </button>
            ) : (
              <button
                className="bg-rose-600 font-bold border-2 border-black px-12 py-2
                            hover:bg-rose-400"
                onClick={async () => {
                  if (prompt.length === 0) setPrompt(placeholder);
                  setText("");
                  await generateText();
                }}
              >
                Go!
              </button>
            )}
            {
              <button
                className="bg-rose-600 font-bold border-2 border-black px-12 py-2
                            hover:bg-rose-400"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("textfield")?.focus();
                  setText("");
                  setPrompt("");
                  setLoading(false);
                }}
              >
                New
              </button>
            }
          </div>
        </form>

        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative w-2/3 ml-44 mt-2 z-20"
          >
            <Image
              className="w-full h-full object-cover"
              alt="text"
              src={speakingBubble}
              height={200}
              width={200}
            />
            <p className="p-2 rounded-lg max-h-[10rem] overflow-scroll text-ellipsis absolute top-0 max-w-[80%] ml-5 mt-3">
              {text.length > 0 ? text : loading ? "Hmmm" : "Let's talk!"}
            </p>
          </m.div>
          <Image
            className={`absolute -bottom-12 left-10 -rotate-[20deg] animate-slideup ${
              loading && "animate-wiggle"
            }`}
            alt="robot"
            src={talkingRobot}
            height={200}
            width={200}
          />
        </>
      </div>
    </m.div>
  );
}
