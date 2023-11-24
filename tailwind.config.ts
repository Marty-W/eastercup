import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#0026FF",
        "brand-red": "#FF0000",
        "brand-yellow": "#FFFF00",
      },
      fontFamily: {
        sans: ["var(--font-pano)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
