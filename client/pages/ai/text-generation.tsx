import Image from "next/image";
import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import { useStateContext } from "@/context/state-context";

import speakingBubble from "../../assets/speaking-bubble.png";
import talkingRobot from "../../assets/talking-robot.png";

const TextGeneration = () => {
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
      console.log(error);
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
            onChange={(e) => {
              setPrompt(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") generateText();
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
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-5 h-5 text-gray-200 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#FFF"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="bg-rose-600 font-bold border-2 border-black px-12 py-2
                            hover:bg-rose-400"
                onClick={() => {
                  if (prompt.length === 0) setPrompt(placeholder);
                  setText("");
                  generateText();
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
        {/* )} */}
      </div>
    </m.div>
  );
};

export default TextGeneration;
