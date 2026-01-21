/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  /* 우선 순위 : tailwind가 먼저 되게 하기 */
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        "netflix-red": "#E50914",
        "netflix-black": "#141414",
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
    base: true,
    utils: true,
  },
};
