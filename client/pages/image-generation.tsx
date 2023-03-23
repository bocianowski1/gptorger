import { FormEvent, useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useStateContext } from "@/context/state-context";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

import noImage from "../assets/no-image.png";
import LoadingCircle from "@/components/loading-circle";

export default function ImageGeneration() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [name, setName] = useState("");

  const placeholder = "superhero plush toy drinking soda on the moon";
  const cameraDetails =
    "Hyper Detail, 8K, HD, Octane Rendering, Unreal Engine, V-Ray, full hd -- s5000 --uplight --q 3 --stop 80--w 0.5 --ar 1:3";
  const { setActiveSection, imageURL, setImageURL } = useStateContext();

  useEffect(() => {
    setActiveSection("images");
  }, []);

  const shareImage = async (e: FormEvent) => {
    if (imageURL.length === 0) return alert("No image to share!");
    if (name.length === 0) return alert("Please enter your name!");

    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          prompt: prompt,
          image: imageURL,
        }),
      });

      await response.json();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            prompt.length === 0
              ? placeholder + cameraDetails
              : prompt + cameraDetails,
        }),
      });

      const data = await response.json();
      if (!data) return;
      setImageURL(`data:image/jpeg;base64,${data.image}`);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <m.section
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ x: "-100%" }}
      id="generation-section"
      className="min-h-screen w-full"
    >
      <div className="pt-28 flex flex-col mx-auto">
        <div className="flex min-h-[8.5rem]">
          <div className="flex flex-1 items-start flex-col px-4 overflow-hidden">
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
              IMAGES
            </m.h1>
          </div>
          <div
            className={`p-2 mr-4 ${
              showForm
                ? "border-2 border-black bg-black/10 flex flex-col gap-2"
                : ""
            }`}
          >
            {showForm && (
              <form
                className="flex flex-col gap-1"
                onSubmit={async (e) => await shareImage(e)}
              >
                <label className="font-thin text-sm">Enter Your Name:</label>
                <input
                  className="px-2 py-1"
                  placeholder="John Doe"
                  maxLength={20}
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </form>
            )}
            <div className="flex gap-4 mx-2">
              <button
                onClick={async (e) => {
                  if (!loading) {
                    setShowForm(true);
                    if (showForm) {
                      await shareImage(e);
                    }
                  }
                }}
                className={`bg-sky-400 text-white font-bold border-2 border-black px-12 py-2 rounded-full
                            transition-all duration-200 hover:bg-sky-500 ${
                              loading ? "hover:cursor-not-allowed" : ""
                            }`}
              >
                Share
              </button>
              {showForm && (
                <button
                  className="bg-sky-400 text-lg font-bold w-12 h-12 flex items-center justify-center
                            border-2 border-black p-2 rounded-full
                            transition-all duration-200 hover:bg-sky-500"
                  onClick={() => setShowForm(false)}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        <form className="flex flex-col items-center py-4 mt-4">
          <textarea
            id="imageprompt"
            className="bg-gradient-to-br from-white via-gray-50 to-gray-200
                      px-4 py-2 w-2/3 rounded-sm min-h-[2rem] max-h-[6rem] overflow-x-scroll"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") generateImage();
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
                  loading ? "bg-rose-400" : "bg-rose-500"
                } font-bold border-2 border-black px-12 py-2
                            hover:bg-rose-400 hover:cursor-not-allowed`}
              >
                <LoadingCircle />
              </button>
            ) : (
              <button
                className="bg-rose-500 font-bold border-2 border-black px-12 py-2
                            hover:bg-rose-400"
                onClick={() => {
                  if (prompt.length === 0) setPrompt(placeholder);
                  generateImage();
                }}
              >
                Go!
              </button>
            )}

            <button
              className="bg-rose-500 font-bold border-2 border-black px-12 py-2
                            hover:bg-rose-400"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("imageprompt")?.focus();
                setImageURL("");
                setPrompt("");
                setLoading(false);
              }}
            >
              New
            </button>
          </div>
        </form>
      </div>
      <div
        className={`w-screen ${
          imageURL.length > 0 && "backdrop-blur-sm animate-fadein"
        } pb-4`}
      >
        <div
          className={`w-3/5 md:w-64
           rounded-xl mx-auto mt-4 shadow-xl 
                    animate-fadein ${
                      imageURL.length > 0 &&
                      !loading &&
                      "transition-all duration-500 hover:scale-125 hover:-translate-y-32 hover:pb-28"
                    }`}
        >
          {imageURL.length > 0 ? (
            <img
              className="h-full w-full object-contain rounded-xl shadow-lg"
              src={imageURL}
              alt={`image of ${prompt}`}
            />
          ) : (
            <Image
              className="h-full w-full object-contain rounded-xl shadow-lg"
              src={noImage}
              alt="no image"
              height={200}
              width={200}
            />
          )}
        </div>
      </div>

      {/* <section id="share-section">
        <CreatePost />
      </section> */}
    </m.section>
  );
}
