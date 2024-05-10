/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      darkgreen: "#1C4835",
      putty: "#F8F5F1",
      cream: "#F5F2E1",
      completed: "#208459",
      sage: "#9FBCAD",
    },
    fontFamily: {
      neue: ["NeueMontreal", "sans-serif"],
    },
    height: {
      12.5: "50px",
    },
    lineHeight: {
      7.5: "30px",
    },
  },
  plugins: [],
};
