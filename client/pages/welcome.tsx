import React from "react";

const Welcome = () => {
  return (
    <div className="h-screen w-screen flex items-end">
      <div className="py-16 flex flex-col items-center mx-auto">
        <div className="flex items-center flex-col mb-8 px-4 rounded-2xl ">
          <h3 className="backdrop-contrast-100 backdrop-blur-sm text-xl text-gray-800 py-1">
            THE ARTIFICIAL INTELLIGENCE
          </h3>
          <h1
            className="backdrop-contrast-100 font-extrabold text-transparent text-7xl bg-clip-text 
                          bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400"
          >
            EXPLORER
          </h1>
        </div>
        <div className="backdrop-contrast-100 pb-8 text-sm text-center">
          <p className="px-4 py-1 text-white">
            Explore the amazing powers of artificial intelligence
          </p>
          <p className="px-4 py-1 text-white">
            through image and text generation
          </p>
        </div>
        <div>
          <button
            className="bg-rose-600 font-bold border-2 border-black px-12 py-2
                            hover:bg-rose-400"
            onClick={() => {
              document.getElementById("images")?.scrollIntoView();
            }}
          >
            TRY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
