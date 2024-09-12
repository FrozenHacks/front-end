import { TbRadio } from "react-icons/tb";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        '60vh': '60vh',
      },
      colors: {
        "website-offwhite": "#FBE3C2",
        "website-purple": "#8560BC",
        "website-purple-dark": "#020316",
        "customYellow": '#FFEB60',
        "customPurple": "#3C2558"
      },
      animation: {
        slideIn: "slideIn 0.5s linear",
        slideOut: "slideOut 0.5s ease-in-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideOut: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};