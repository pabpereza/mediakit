/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Extending slate if needed, but slate-950 is standard in recent Tailwind versions
      }
    },
  },
  plugins: [],
}
