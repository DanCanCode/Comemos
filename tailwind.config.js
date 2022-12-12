/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        slideinLeft: "slideinLeft 20s linear infinite",
        slideinRight: "slideinRight 20s linear infinite",
        fadein: "fadein 3s ease 1",
        navslide: "navslide .3s ease-out 1",
      },
      keyframes: {
        slideinLeft: {
          "0%": { left: 0, transform: "translateX(-100%)" },
          "100%": { left: "100%", transform: "translateX(100%)" },
        },
        slideinRight: {
          "0%": { left: "100%", transform: "translateX(100%)" },
          "100%": { left: 0, transform: "translateX(-100%)" },
        },
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
