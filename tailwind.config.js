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
        slideDown: "slideDown 1s ease-out 1",
        slideinLeft: "slideinLeft 20s linear infinite",
        slideinRight: "slideinRight 20s linear infinite",
        fadein: "fadein 3s ease 1",
        navslide: "navslide .3s ease-out 1",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-20%)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
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
