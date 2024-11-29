import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bluePrimary: "#071427",
        textGray: "#6E6E6E",
        bgRed: "#F05E5E",
        bgGreen: "#85D7B9",
        bgYellow: "#D4AA39",
      },
    },
  },
  plugins: [],
} satisfies Config;
