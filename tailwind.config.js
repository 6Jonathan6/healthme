/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popins: ["Poppins"],
      },
      colors: {
        "primary-light": "rgb(243, 246, 250)",
        "primary-action": "rgb(81, 151, 248)",
        secondary: "rgb(0, 90, 214)",
        "gray-1": "rgb(225, 225, 225)",
        lightest: "rgb(243, 246, 250)",
      },
    },
  },
  plugins: [],
};
