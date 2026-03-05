import type { Config } from "tailwindcss";
import { colors, fontFamily, fontSize, fontWeight, lineHeight, spacing, borderRadius, boxShadow, screens } from "./styles/design-tokens";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      spacing,
      borderRadius,
      boxShadow,
      screens,
    },
  },
  plugins: [],
};

export default config;
