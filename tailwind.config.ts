import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#213a8f",
        "brand-red": "#FF0000",
        "brand-yellow": "#ffed03",
      },
      fontFamily: {
        sans: ["var(--font-pano)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
