// =============================================================================
// GOKWIK DESIGN TOKENS
// Source of truth for all design decisions.
//
// ⚠️  These values are seeded from the Gokwik brand guide.
//    Run  `npx ts-node scripts/extract-figma-tokens.ts`  to sync exact values
//    directly from the Figma file (QAhSS6Cl4wNBT1qfFljfhZ).
//
// Consumed by:  tailwind.config.ts  and imported directly in components.
// =============================================================================

// -----------------------------------------------------------------------------
// COLORS
// Naming convention mirrors Figma layer paths:  Group / Shade
// -----------------------------------------------------------------------------

export const colors = {

  // ── Primary — Gokwik Indigo ─────────────────────────────────────────────
  primary: {
    25:  "#F5F3FF",
    50:  "#EDE9FE",
    100: "#DDD6FE",
    200: "#C4B5FD",
    300: "#A78BFA",
    400: "#8B5CF6",
    500: "#7C3AED",   // ← brand default
    600: "#6D28D9",
    700: "#5B21B6",
    800: "#4C1D95",
    900: "#3B0F7C",
    950: "#2E1065",
  },

  // ── Secondary — Gokwik Green ────────────────────────────────────────────
  secondary: {
    25:  "#F0FDF4",
    50:  "#DCFCE7",
    100: "#BBF7D0",
    200: "#86EFAC",
    300: "#4ADE80",
    400: "#22C55E",
    500: "#16A34A",   // ← brand default
    600: "#15803D",
    700: "#166534",
    800: "#14532D",
    900: "#0F3D22",
    950: "#052E16",
  },

  // ── Neutral — Slate ─────────────────────────────────────────────────────
  neutral: {
    0:    "#FFFFFF",
    25:   "#FAFAFA",
    50:   "#F8FAFC",
    100:  "#F1F5F9",
    200:  "#E2E8F0",
    300:  "#CBD5E1",
    400:  "#94A3B8",
    500:  "#64748B",
    600:  "#475569",
    700:  "#334155",
    800:  "#1E293B",
    900:  "#0F172A",
    950:  "#020617",
    1000: "#000000",
  },

  // ── Semantic: Success ────────────────────────────────────────────────────
  success: {
    light:   "#DCFCE7",
    default: "#16A34A",
    dark:    "#14532D",
    bg:      "#F0FDF4",
    border:  "#86EFAC",
    text:    "#166534",
  },

  // ── Semantic: Warning ────────────────────────────────────────────────────
  warning: {
    light:   "#FEF3C7",
    default: "#D97706",
    dark:    "#78350F",
    bg:      "#FFFBEB",
    border:  "#FDE68A",
    text:    "#92400E",
  },

  // ── Semantic: Error / Danger ─────────────────────────────────────────────
  error: {
    light:   "#FEE2E2",
    default: "#DC2626",
    dark:    "#7F1D1D",
    bg:      "#FEF2F2",
    border:  "#FECACA",
    text:    "#991B1B",
  },

  // ── Semantic: Info ───────────────────────────────────────────────────────
  info: {
    light:   "#DBEAFE",
    default: "#2563EB",
    dark:    "#1E3A8A",
    bg:      "#EFF6FF",
    border:  "#BFDBFE",
    text:    "#1D4ED8",
  },

  // ── Surface / Background aliases ─────────────────────────────────────────
  surface: {
    page:        "#F8FAFC",
    card:        "#FFFFFF",
    overlay:     "rgba(15, 23, 42, 0.48)",
    "card-hover": "#F1F5F9",
  },

  // ── Text aliases ─────────────────────────────────────────────────────────
  text: {
    primary:   "#0F172A",
    secondary: "#475569",
    tertiary:  "#94A3B8",
    disabled:  "#CBD5E1",
    inverse:   "#FFFFFF",
    link:      "#7C3AED",
    "link-hover": "#6D28D9",
  },

  // ── Border aliases ────────────────────────────────────────────────────────
  border: {
    subtle:  "#F1F5F9",
    default: "#E2E8F0",
    strong:  "#CBD5E1",
    focus:   "#7C3AED",
  },

} as const;

// -----------------------------------------------------------------------------
// TYPOGRAPHY
// -----------------------------------------------------------------------------

export const fontFamily = {
  sans:    ["Inter",          "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
  display: ["Plus Jakarta Sans", "Inter",     "ui-sans-serif", "sans-serif"],
  mono:    ["JetBrains Mono", "Fira Code",    "ui-monospace",  "monospace"],
} as const;

/**
 * Type scale — Major Third (×1.25) with px equivalents shown.
 * Tuple: [fontSize, { lineHeight, letterSpacing }]
 */
export const fontSize = {
  "2xs": ["0.625rem",  { lineHeight: "0.875rem", letterSpacing: "0em"     }],  // 10 px
  xs:    ["0.75rem",   { lineHeight: "1rem",      letterSpacing: "0em"     }],  // 12 px
  sm:    ["0.875rem",  { lineHeight: "1.25rem",   letterSpacing: "0em"     }],  // 14 px
  base:  ["1rem",      { lineHeight: "1.5rem",    letterSpacing: "0em"     }],  // 16 px
  lg:    ["1.125rem",  { lineHeight: "1.75rem",   letterSpacing: "-0.01em" }],  // 18 px
  xl:    ["1.25rem",   { lineHeight: "1.75rem",   letterSpacing: "-0.01em" }],  // 20 px
  "2xl": ["1.5rem",    { lineHeight: "2rem",      letterSpacing: "-0.02em" }],  // 24 px
  "3xl": ["1.875rem",  { lineHeight: "2.25rem",   letterSpacing: "-0.02em" }],  // 30 px
  "4xl": ["2.25rem",   { lineHeight: "2.5rem",    letterSpacing: "-0.03em" }],  // 36 px
  "5xl": ["3rem",      { lineHeight: "1",          letterSpacing: "-0.03em" }],  // 48 px
  "6xl": ["3.75rem",   { lineHeight: "1",          letterSpacing: "-0.04em" }],  // 60 px
  "7xl": ["4.5rem",    { lineHeight: "1",          letterSpacing: "-0.04em" }],  // 72 px
  "8xl": ["6rem",      { lineHeight: "1",          letterSpacing: "-0.04em" }],  // 96 px
  "9xl": ["8rem",      { lineHeight: "1",          letterSpacing: "-0.04em" }],  // 128px
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
} as const;

export const letterSpacing = {
  tighter: "-0.05em",
  tight:   "-0.025em",
  normal:  "0em",
  wide:    "0.025em",
  wider:   "0.05em",
  widest:  "0.1em",
} as const;

// -----------------------------------------------------------------------------
// SPACING  (4 px base unit — Tailwind convention)
// -----------------------------------------------------------------------------

export const spacing = {
  px:   "1px",
  0:    "0px",
  0.5:  "0.125rem",   // 2 px
  1:    "0.25rem",    // 4 px
  1.5:  "0.375rem",   // 6 px
  2:    "0.5rem",     // 8 px
  2.5:  "0.625rem",   // 10 px
  3:    "0.75rem",    // 12 px
  3.5:  "0.875rem",   // 14 px
  4:    "1rem",       // 16 px
  5:    "1.25rem",    // 20 px
  6:    "1.5rem",     // 24 px
  7:    "1.75rem",    // 28 px
  8:    "2rem",       // 32 px
  9:    "2.25rem",    // 36 px
  10:   "2.5rem",     // 40 px
  11:   "2.75rem",    // 44 px
  12:   "3rem",       // 48 px
  14:   "3.5rem",     // 56 px
  16:   "4rem",       // 64 px
  20:   "5rem",       // 80 px
  24:   "6rem",       // 96 px
  28:   "7rem",       // 112 px
  32:   "8rem",       // 128 px
  36:   "9rem",       // 144 px
  40:   "10rem",      // 160 px
  44:   "11rem",      // 176 px
  48:   "12rem",      // 192 px
  52:   "13rem",      // 208 px
  56:   "14rem",      // 224 px
  60:   "15rem",      // 240 px
  64:   "16rem",      // 256 px
  72:   "18rem",      // 288 px
  80:   "20rem",      // 320 px
  96:   "24rem",      // 384 px
} as const;

// -----------------------------------------------------------------------------
// BORDER RADIUS
// -----------------------------------------------------------------------------

export const borderRadius = {
  none:    "0px",
  xs:      "0.125rem",   // 2 px
  sm:      "0.25rem",    // 4 px
  DEFAULT: "0.375rem",   // 6 px
  md:      "0.5rem",     // 8 px
  lg:      "0.75rem",    // 12 px
  xl:      "1rem",       // 16 px
  "2xl":   "1.25rem",    // 20 px
  "3xl":   "1.5rem",     // 24 px
  full:    "9999px",
} as const;

// -----------------------------------------------------------------------------
// SHADOWS
// -----------------------------------------------------------------------------

export const boxShadow = {
  none:  "none",

  // Elevation system
  xs:    "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
  sm:    "0 1px 3px 0 rgba(15, 23, 42, 0.10), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
  md:    "0 4px 6px -1px rgba(15, 23, 42, 0.10), 0 2px 4px -2px rgba(15, 23, 42, 0.06)",
  lg:    "0 10px 15px -3px rgba(15, 23, 42, 0.10), 0 4px 6px -4px rgba(15, 23, 42, 0.05)",
  xl:    "0 20px 25px -5px rgba(15, 23, 42, 0.10), 0 8px 10px -6px rgba(15, 23, 42, 0.04)",
  "2xl": "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(15, 23, 42, 0.05)",

  // Brand-coloured glows
  "primary-sm": "0 4px 14px 0 rgba(124, 58, 237, 0.25)",
  "primary-md": "0 8px 24px 0 rgba(124, 58, 237, 0.30)",
  "secondary-sm": "0 4px 14px 0 rgba(22, 163, 74, 0.25)",
  "secondary-md": "0 8px 24px 0 rgba(22, 163, 74, 0.30)",

  // Focus ring (used for interactive states)
  focus: "0 0 0 3px rgba(124, 58, 237, 0.35)",
} as const;

// -----------------------------------------------------------------------------
// BREAKPOINTS
// -----------------------------------------------------------------------------

export const screens = {
  xs:    "375px",   // Small mobile
  sm:    "640px",   // Mobile landscape / large mobile
  md:    "768px",   // Tablet portrait
  lg:    "1024px",  // Tablet landscape / small desktop
  xl:    "1280px",  // Desktop
  "2xl": "1536px",  // Large desktop
} as const;

// -----------------------------------------------------------------------------
// FLAT DEFAULT EXPORT — runtime use & extraction script
// -----------------------------------------------------------------------------

const tokens = {
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
} as const;

export default tokens;
