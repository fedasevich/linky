/** @type {import('tailwindcss').Config} */
// import { colors as defaultColors } from 'tailwindcss/defaultTheme';

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
    },
  },
  plugins: [],
  safelist: [
    "bg-[#5865F2]",
    "bg-[#2457F5]",
    "bg-[#1877F2]",
    "bg-gradient-to-br",
    "from-red-500",
    "via-purple-700",
    "to-cyan-500",
    "bg-black",
    "from-rose-400",
    "to-fuchsia-800",
    "via-cyan-500",
    "bg-[#191414]",
    "bg-gradient-to-r",
    "from-sky-400",
    "to-indigo-600",
    "bg-[#3FAEE8]",
    "bg-[#9146FF]",
    "bg-[#1DA1F2]",
    "bg-[bg-black]"
  ]

}

