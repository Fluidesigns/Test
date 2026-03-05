// =============================================================================
// DESIGN TOKENS
// Single source of truth for all design decisions.
// Consumed by tailwind.config.ts and can be imported directly in components.
// =============================================================================

// -----------------------------------------------------------------------------
// COLORS
// -----------------------------------------------------------------------------

export const colors = {
  // Primary — brand blue
  primary: {
    50:  "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // default
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },

  // Secondary — violet
  secondary: {
    50:  "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6", // default
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065",
  },

  // Neutral — slate
  neutral: {
    0:   "#ffffff",
    50:  "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
    1000: "#000000",
  },

  // Semantic — success
  success: {
    50:  "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e", // default
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },

  // Semantic — warning
  warning: {
    50:  "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b", // default
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },

  // Semantic — error / danger
  error: {
    50:  "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // default
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },

  // Semantic — info
  info: {
    50:  "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4", // default
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344",
  },
} as const;

// -----------------------------------------------------------------------------
// TYPOGRAPHY
// -----------------------------------------------------------------------------

export const fontFamily = {
  sans:  ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
  serif: ["Georgia", "Cambria", "ui-serif", "serif"],
  mono:  ["JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
} as const;

/** Font sizes following a Major Third (1.25×) type scale */
export const fontSize = {
  "2xs": ["0.625rem", { lineHeight: "0.875rem" }],  // 10px
  xs:    ["0.75rem",  { lineHeight: "1rem" }],       // 12px
  sm:    ["0.875rem", { lineHeight: "1.25rem" }],    // 14px
  base:  ["1rem",     { lineHeight: "1.5rem" }],     // 16px
  lg:    ["1.125rem", { lineHeight: "1.75rem" }],    // 18px
  xl:    ["1.25rem",  { lineHeight: "1.75rem" }],    // 20px
  "2xl": ["1.5rem",   { lineHeight: "2rem" }],       // 24px
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }],    // 30px
  "4xl": ["2.25rem",  { lineHeight: "2.5rem" }],     // 36px
  "5xl": ["3rem",     { lineHeight: "1" }],           // 48px
  "6xl": ["3.75rem",  { lineHeight: "1" }],           // 60px
  "7xl": ["4.5rem",   { lineHeight: "1" }],           // 72px
  "8xl": ["6rem",     { lineHeight: "1" }],           // 96px
  "9xl": ["8rem",     { lineHeight: "1" }],           // 128px
} as const;

export const fontWeight = {
  thin:       "100",
  extralight: "200",
  light:      "300",
  normal:     "400",
  medium:     "500",
  semibold:   "600",
  bold:       "700",
  extrabold:  "800",
  black:      "900",
} as const;

export const lineHeight = {
  none:    "1",
  tight:   "1.25",
  snug:    "1.375",
  normal:  "1.5",
  relaxed: "1.625",
  loose:   "2",
  3: ".75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
} as const;

// -----------------------------------------------------------------------------
// SPACING  (Tailwind 4px base unit convention)
// -----------------------------------------------------------------------------

export const spacing = {
  px:   "1px",
  0:    "0px",
  0.5:  "0.125rem",  // 2px
  1:    "0.25rem",   // 4px
  1.5:  "0.375rem",  // 6px
  2:    "0.5rem",    // 8px
  2.5:  "0.625rem",  // 10px
  3:    "0.75rem",   // 12px
  3.5:  "0.875rem",  // 14px
  4:    "1rem",      // 16px
  5:    "1.25rem",   // 20px
  6:    "1.5rem",    // 24px
  7:    "1.75rem",   // 28px
  8:    "2rem",      // 32px
  9:    "2.25rem",   // 36px
  10:   "2.5rem",    // 40px
  11:   "2.75rem",   // 44px
  12:   "3rem",      // 48px
  14:   "3.5rem",    // 56px
  16:   "4rem",      // 64px
  20:   "5rem",      // 80px
  24:   "6rem",      // 96px
  28:   "7rem",      // 112px
  32:   "8rem",      // 128px
  36:   "9rem",      // 144px
  40:   "10rem",     // 160px
  44:   "11rem",     // 176px
  48:   "12rem",     // 192px
  52:   "13rem",     // 208px
  56:   "14rem",     // 224px
  60:   "15rem",     // 240px
  64:   "16rem",     // 256px
  72:   "18rem",     // 288px
  80:   "20rem",     // 320px
  96:   "24rem",     // 384px
} as const;

// -----------------------------------------------------------------------------
// BORDER RADIUS
// -----------------------------------------------------------------------------

export const borderRadius = {
  none:  "0px",
  sm:    "0.125rem",  // 2px
  DEFAULT: "0.25rem", // 4px
  md:    "0.375rem",  // 6px
  lg:    "0.5rem",    // 8px
  xl:    "0.75rem",   // 12px
  "2xl": "1rem",      // 16px
  "3xl": "1.5rem",    // 24px
  full:  "9999px",
} as const;

// -----------------------------------------------------------------------------
// SHADOWS
// -----------------------------------------------------------------------------

export const boxShadow = {
  none:    "none",
  xs:      "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm:      "0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)",
  DEFAULT: "0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)",
  md:      "0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)",
  lg:      "0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)",
  xl:      "0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)",
  "2xl":   "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner:   "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  // Colored shadows
  "primary-sm": "0 4px 14px 0 rgb(59 130 246 / 0.30)",
  "primary-md": "0 8px 24px 0 rgb(59 130 246 / 0.35)",
  "secondary-sm": "0 4px 14px 0 rgb(139 92 246 / 0.30)",
  "secondary-md": "0 8px 24px 0 rgb(139 92 246 / 0.35)",
} as const;

// -----------------------------------------------------------------------------
// BREAKPOINTS
// -----------------------------------------------------------------------------

export const screens = {
  xs:  "475px",
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  "2xl": "1536px",
} as const;

// -----------------------------------------------------------------------------
// FLAT EXPORT — convenience object for runtime use
// -----------------------------------------------------------------------------

const tokens = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  borderRadius,
  boxShadow,
  screens,
} as const;

export default tokens;
