/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/runtime/components/**/*.{vue,js,ts,jsx,tsx}",
    "./src/runtime/utils/**/*.{vue,js,ts,jsx,tsx}",
    "./src/runtime/types/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
