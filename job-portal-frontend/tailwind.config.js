/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50: "#effaf8", 100: "#d4f1ec", 200: "#a9e2da", 500: "#14958a", 600: "#0f766e", 700: "#0d5f59", 800: "#0b4a46", 900: "#0a2f2e" },
        accent: { 400: "#fbbf24", 500: "#f59e0b" },
      },
      fontFamily: { sans: ["Inter", "Segoe UI", "system-ui", "-apple-system", "Roboto", "Helvetica Neue", "Arial", "sans-serif"] },
    },
  },
  plugins: [],
};
