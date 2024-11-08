import daisyui from "daisyui";

import { dark, cupcake } from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    styled: true,
    base: true,

    utils: true,
    themes: [
      {
        cupcake: {
          ...cupcake,
          primary: "#fe8c46",
          secondary: "#fcf0de",
          "base-100": "#F9F7F3",
        },
      },
      {
        dark: {
          ...dark,

          primary: "#F85E00",
          secondary: "#fcf0de",
        },
      },
    ],
  },
};
