/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      text: "var(--text)",
      background: "var(--background)",
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      accent: "var(--accent)",
    },

    extend: {
      fontFamily: {
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
