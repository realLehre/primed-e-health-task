/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      mobile: "470px",
      tablet: "640px",

      laptop: "1024px",

      desktop: "1280px",
    },
  },
  plugins: [],
};
