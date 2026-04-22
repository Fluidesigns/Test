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

/**
 * Semantic palette backed by CSS variables (see app/globals.css).
 * Light/dark/density switches happen through CSS vars with zero component churn.
 */
const themed = {
  app: {
    bg:               "var(--app-bg)",
    surface:          "var(--app-surface)",
    "surface-2":      "var(--app-surface-2)",
    "surface-hover":  "var(--app-surface-hover)",
    sidebar:          "var(--app-sidebar)",
    "sidebar-hover":  "var(--app-sidebar-hover)",
    "sidebar-active": "var(--app-sidebar-active)",
    text:             "var(--app-text)",
    "text-muted":     "var(--app-text-muted)",
    "text-subtle":    "var(--app-text-subtle)",
    "text-inverse":   "var(--app-text-inverse)",
    border:           "var(--app-border)",
    "border-strong":  "var(--app-border-strong)",
    divider:          "var(--app-divider)",
    accent:           "var(--app-accent)",
    "accent-soft":    "var(--app-accent-soft)",
    "accent-fg":      "var(--app-accent-fg)",
    success:          "var(--app-success)",
    warning:          "var(--app-warning)",
    danger:           "var(--app-danger)",
    teal:             "var(--brand-teal)",
  },
  chart: {
    1: "var(--chart-1)",
    2: "var(--chart-2)",
    3: "var(--chart-3)",
    4: "var(--chart-4)",
    5: "var(--chart-5)",
    6: "var(--chart-6)",
    grid: "var(--chart-grid)",
    axis: "var(--chart-axis)",
  },
};

const config: Config = {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts}",
  ],
  theme: {
    screens,
    extend: {
      colors: { ...colors, ...themed },
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      spacing,
      borderRadius,
      boxShadow,
      keyframes: {
        "fade-in":    { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-up":    {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in":  "fade-in 320ms ease-out both",
        "fade-up":  "fade-up 360ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 280ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
