/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "netflix-red": "#E50914",
        "netflix-black": "#141414",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
    base: true,
    utils: true,
  },
};
