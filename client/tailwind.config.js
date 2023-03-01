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
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
        slideup: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": { transform: "translateX(0%)" },
        },
        slowspin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },

        wiggle: {
          "0%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(6deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        fadein: "fadein .75s normal forwards",
        slideup: "slideup .5s normal forwards",
        slowspin: "slowspin 2s linear infinite",
        superslowspin: "slowspin 10s linear infinite",
        wiggle: "wiggle .25s normal forwards",
      },
    },
  },
  plugins: [],
};
