import type { Config } from "tailwindcss";
import {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  spacing,
  borderRadius,
  boxShadow,
  screens,
} from "./styles/design-tokens";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts}",
  ],
  theme: {
    screens,
    extend: {
      colors,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      spacing,
      borderRadius,
      boxShadow,
    },
  },
  plugins: [],
};

export default config;
