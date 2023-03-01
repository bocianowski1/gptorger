import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useStateContext } from "@/context/state-context";
import Image from "next/image";

import noImage from "../../assets/no-image.png";

const ImageGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const placeholder = "superhero plush toy drinking soda on the moon";
  const cameraDetails =
    "Hyper Detail, 8K, HD, Octane Rendering, Unreal Engine, V-Ray, full hd -- s5000 --uplight --q 3 --stop 80--w 0.5 --ar 1:3";
  const { setActiveSection, imageURL, setImageURL, posts, setPosts } =
    useStateContext();

  useEffect(() => {
    setActiveSection("images");
  }, []);

  const shareImage = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Torger",
          prompt: prompt,
          image: imageURL,
        }),
      });

      await response.json();
      // await getAllPosts();
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
      console.log(error);
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
      className="min-h-screen  w-full"
    >
      <div className="pt-28 flex flex-col mx-auto">
        <div className="flex">
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
              IMAGES
            </m.h1>
          </div>
          {/* <div className="w-1/2 flex flex-col">
            <button
              className="bg-sky-400 text-white 
                        font-bold border-2 border-black px-8 hover:bg-black"
              onClick={(e) => shareImage(e)}
            >
              Share
            </button>
          </div> */}
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
                  generateImage();
                }}
              >
                Go!
              </button>
            )}

            <button
              className="bg-rose-600 font-bold border-2 border-black px-12 py-2
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
          className={`w-3/5 rounded-xl mx-auto mt-4 shadow-xl 
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
};

export default ImageGeneration;
