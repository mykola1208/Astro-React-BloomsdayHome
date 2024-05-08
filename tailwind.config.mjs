/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      everglade: "#1C4835",
      springwood: "#F8F5F1",
      ecruwhite: "#F5F2E1",
    },
    fontFamily: {
      neue: ['NeueMontreal', 'sans-serif'],
    },
    fontSize: {
      sm: "16px",
      md: "18px",
      normal: "22px",
    },
    fontWeight: {
      sm: "500",
      normal: "700",
    },
    lineHeight: {
      sm: "16px",
      md: "19.8px",
      normal: "24.2px",
    },
  },
  plugins: [],
};
