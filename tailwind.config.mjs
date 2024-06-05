const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        darkgreen: "#1C4835",
        putty: "#F8F5F1",
        cream: "#F5F2E1",
        completed: "#208459",
        "completed-light": "#D4F2D6",
        sage: "#9FBCAD",
        "cream-light": "#FAF9F4",
        gray: colors.gray,
        white: colors.white,
        mint: "#EAF1E6",
        "gray-20": "#DDE1E6",
        alert: "#DB4F57",
        "alert-light": "#FFE0E1",
        warning: "#ed9d00",
        "warning-light": "#FAEFC6",
        "gray-20": "#DDE1E6",
        "gray-30": "#C1C7CD",
        "gray-50": "#878D96",
      },
      padding: {
        9.5: "38px",
        22.5: "90px",
      },
      fontFamily: {
        neue: ["NeueMontreal", "sans-serif"],
      },
      fontSize: {
        "0.5xs": "10px",
        "1.5xl": "22px",
      },
      height: {
        7.5: "30px",
        12.5: "50px",
      },

      maxHeight: {
        102: "408px",
      },
      width: {
        12.5: "50px",
        65: "260px",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
