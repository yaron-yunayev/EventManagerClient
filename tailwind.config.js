// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',    // <-- כאן, ברמה העליונה
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chivo: ['Chivo', 'sans-serif'],
        elegant: ['"Playfair Display"', 'serif'],
      },
      animation: {
        gradient: "gradientShift 5s ease infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        'gradient': '200% 200%',
      },
    },
  },
  plugins: [],
};
