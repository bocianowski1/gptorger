/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          "0%": { opacity: "0%", transform: "translateX(100%)" },
          "50%": {
            opacity: "75%%",
            transform: "translate(-15%)",
          },
          "75%": {
            opacity: "100%",
            transform: "translate(10%)",
            transform: "rotate(3deg)",
          },
        },
        slidein: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideout: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        turn: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(90deg)" },
          "100%": { transform: "rotate(180deg)" },
        },

        wiggle: {
          "0%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(6deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        fadein: "fadein .75s forwards",
        slidein: "slidein .25s normal forwards",
        slideout: "slideout .25s normal forwards",
        turn: "turn .1s normal forwards",
        wiggle: "wiggle .25s normal forwards",
      },
    },
  },
  plugins: [],
};
