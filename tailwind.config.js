import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-in-out",
        "fade-in-up": "fade-in-up 1s ease-in-out",
      },
      colors: {
        primaryColor: {
          DEFAULT: "#FE5800",
          50: "#FFF0E8",
          100: "#FFDBCC",
          200: "#FFB499",
          300: "#FF8C66",
          400: "#FE7433",
          500: "#FE5800", // Base color
          600: "#D94700",
          700: "#B23600",
          800: "#8A2800",
          900: "#631B00",
        },
        secondaryColor: {
          DEFAULT: "#FBC471",
          50: "#FFF9EC",
          100: "#FEF0D6",
          200: "#FDD9AA",
          300: "#FCC27F",
          400: "#FBB661",
          500: "#FBC471", // Base color
          600: "#D9A45E",
          700: "#B6854B",
          800: "#946639",
          900: "#704A28",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
