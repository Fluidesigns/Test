#!/usr/bin/env node
/**
 * Figma → design-tokens.ts extractor
 *
 * Run once from your local machine (where api.figma.com is reachable):
 *   npx ts-node scripts/extract-figma-tokens.ts
 *
 * It writes the extracted values directly into styles/design-tokens.ts
 *
 * Requirements:
 *   npm install -D ts-node node-fetch@2
 */

// Set FIGMA_TOKEN in your shell before running:
//   export FIGMA_TOKEN=figd_xxxxxxxxxxxxxxxxxxxx
const FIGMA_TOKEN = process.env.FIGMA_TOKEN ?? "";
const FILE_KEY    = process.env.FIGMA_FILE_KEY ?? "QAhSS6Cl4wNBT1qfFljfhZ";
const NODE_ID     = process.env.FIGMA_NODE_ID  ?? "296-7048";

import fs   from "fs";
import path from "path";
// @ts-ignore
import fetch from "node-fetch";

// ─── Figma API helpers ────────────────────────────────────────────────────────

const api = (endpoint: string) =>
  fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  }).then((r: any) => r.json());

function rgbToHex(r: number, g: number, b: number): string {
  const to255 = (v: number) => Math.round(v * 255);
  return (
    "#" +
    [to255(r), to255(g), to255(b)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  ).toUpperCase();
}

function rgbaStr(r: number, g: number, b: number, a: number): string {
  const to255 = (v: number) => Math.round(v * 255);
  if (a === 1) return rgbToHex(r, g, b);
  return `rgba(${to255(r)}, ${to255(g)}, ${to255(b)}, ${a.toFixed(2)})`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!FIGMA_TOKEN) {
    console.error("❌ FIGMA_TOKEN env variable is not set.");
    console.error("   export FIGMA_TOKEN=figd_your_token_here");
    process.exit(1);
  }
  console.log("⏳ Fetching Figma styles for file:", FILE_KEY);

  // 1. Get all published styles
  const stylesResp = await api(`/files/${FILE_KEY}/styles`);
  if (stylesResp.err) throw new Error("Figma error: " + stylesResp.err);

  const styles: any[] = stylesResp.meta?.styles ?? [];
  console.log(`  Found ${styles.length} styles`);

  // 2. Get all style node details in one batch request
  const ids = styles.map((s: any) => s.node_id).join(",");
  const nodesResp = await api(`/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(ids)}`);
  const nodes: Record<string, any> = nodesResp.nodes ?? {};

  // ── Colour extraction ──────────────────────────────────────────────────────
  interface ColourEntry { name: string; value: string }
  const colorStyles: ColourEntry[] = [];

  for (const style of styles) {
    if (style.style_type !== "FILL") continue;
    const node = nodes[style.node_id]?.document;
    if (!node) continue;
    const fill = node.fills?.[0];
    if (!fill || fill.type !== "SOLID") continue;
    const { r, g, b } = fill.color;
    const a = fill.opacity ?? 1;
    colorStyles.push({ name: style.name, value: rgbaStr(r, g, b, a) });
  }

  // ── Text / typography extraction ──────────────────────────────────────────
  interface TextStyle {
    name: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    lineHeight: string;
    letterSpacing: string;
  }
  const textStyles: TextStyle[] = [];

  for (const style of styles) {
    if (style.style_type !== "TEXT") continue;
    const node = nodes[style.node_id]?.document;
    if (!node) continue;
    const ts = node.style ?? {};
    const lh =
      ts.lineHeightUnit === "AUTO"
        ? "auto"
        : ts.lineHeightUnit === "PERCENT"
        ? (ts.lineHeightPercentFontSize / 100).toFixed(3)
        : `${ts.lineHeightPx}px`;
    const ls =
      ts.letterSpacingUnit === "PERCENT"
        ? `${(ts.letterSpacing / 100).toFixed(3)}em`
        : `${ts.letterSpacing ?? 0}px`;
    textStyles.push({
      name: style.name,
      fontFamily: ts.fontFamily ?? "Inter",
      fontSize: ts.fontSize ?? 16,
      fontWeight: ts.fontWeight ?? 400,
      lineHeight: lh,
      letterSpacing: ls,
    });
  }

  // ── Effect (shadow) extraction ─────────────────────────────────────────────
  interface ShadowEntry { name: string; value: string }
  const shadowStyles: ShadowEntry[] = [];

  for (const style of styles) {
    if (style.style_type !== "EFFECT") continue;
    const node = nodes[style.node_id]?.document;
    if (!node) continue;
    const effects = (node.effects ?? []).filter((e: any) =>
      ["DROP_SHADOW", "INNER_SHADOW"].includes(e.type)
    );
    if (!effects.length) continue;
    const parts = effects.map((e: any) => {
      const inset = e.type === "INNER_SHADOW" ? "inset " : "";
      const { r, g, b } = e.color;
      const a = e.color.a ?? 1;
      return `${inset}${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread ?? 0}px rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${a.toFixed(2)})`;
    });
    shadowStyles.push({ name: style.name, value: parts.join(", ") });
  }

  // ─── Build output ──────────────────────────────────────────────────────────

  // Group colours by Figma path convention:  "Category/Shade" or "Category/Sub/Shade"
  const colorGroups: Record<string, Record<string, string>> = {};
  for (const { name, value } of colorStyles) {
    const parts = name.split("/").map((p: string) => p.trim());
    const group = parts.slice(0, -1).join("/") || "misc";
    const shade = parts[parts.length - 1];
    if (!colorGroups[group]) colorGroups[group] = {};
    colorGroups[group][shade] = value;
  }

  const colorsTs = JSON.stringify(colorGroups, null, 2)
    .replace(/"([^"]+)":/g, "$1:")      // unquote keys that are valid identifiers
    .replace(/"/g, '"');

  // Group text styles
  const fontFamilies = [...new Set(textStyles.map((t) => t.fontFamily))];
  const fontSizes    = [...new Set(textStyles.map((t) => t.fontSize))].sort((a,b) => a-b);
  const fontWeights  = [...new Set(textStyles.map((t) => t.fontWeight))].sort((a,b) => a-b);

  const shadowMap: Record<string, string> = {};
  for (const { name, value } of shadowStyles) {
    const key = name.replace(/\s+/g, "-").toLowerCase();
    shadowMap[key] = value;
  }

  // ─── Write the file ────────────────────────────────────────────────────────

  const out = `// AUTO-GENERATED by scripts/extract-figma-tokens.ts
// File: ${FILE_KEY}  •  Node: ${NODE_ID}
// Run "npx ts-node scripts/extract-figma-tokens.ts" to refresh
// =============================================================================

// ── Colors (from Figma FILL styles) ─────────────────────────────────────────
export const colors = ${colorsTs} as const;

// ── Font families ─────────────────────────────────────────────────────────────
export const fontFamily = {
${fontFamilies.map((f) => `  "${f.toLowerCase()}": ["${f}", "ui-sans-serif", "system-ui", "sans-serif"],`).join("\n")}
} as const;

// ── Font sizes (px → rem) ─────────────────────────────────────────────────────
export const fontSize = {
${fontSizes.map((s) => `  "${s}": "${(s / 16).toFixed(4).replace(/\.?0+$/, "")}rem",`).join("\n")}
} as const;

// ── Font weights ──────────────────────────────────────────────────────────────
export const fontWeight = {
${fontWeights.map((w) => `  "${w}": "${w}",`).join("\n")}
} as const;

// ── Text styles (full spec) ───────────────────────────────────────────────────
export const textStyles = ${JSON.stringify(
    Object.fromEntries(textStyles.map((t) => [
      t.name,
      { fontFamily: t.fontFamily, fontSize: t.fontSize, fontWeight: t.fontWeight, lineHeight: t.lineHeight, letterSpacing: t.letterSpacing }
    ])),
    null, 2
  )} as const;

// ── Shadows (from Figma EFFECT styles) ───────────────────────────────────────
export const boxShadow = ${JSON.stringify(shadowMap, null, 2)} as const;

// ── Spacing — Tailwind 4 px base (not in Figma styles, kept as convention) ──
export const spacing = {
  px: "1px", 0: "0px", 0.5: "0.125rem", 1: "0.25rem", 1.5: "0.375rem",
  2: "0.5rem", 2.5: "0.625rem", 3: "0.75rem", 3.5: "0.875rem", 4: "1rem",
  5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem",
  10: "2.5rem", 11: "2.75rem", 12: "3rem", 14: "3.5rem", 16: "4rem",
  20: "5rem", 24: "6rem", 28: "7rem", 32: "8rem", 36: "9rem", 40: "10rem",
  44: "11rem", 48: "12rem", 52: "13rem", 56: "14rem", 60: "15rem",
  64: "16rem", 72: "18rem", 80: "20rem", 96: "24rem",
} as const;

// ── Border radius ─────────────────────────────────────────────────────────────
export const borderRadius = {
  none: "0px", sm: "0.125rem", DEFAULT: "0.25rem", md: "0.375rem",
  lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", full: "9999px",
} as const;

// ── Breakpoints ───────────────────────────────────────────────────────────────
export const screens = {
  xs: "375px", sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px",
} as const;

// ── Line heights ──────────────────────────────────────────────────────────────
export const lineHeight = {
  none: "1", tight: "1.25", snug: "1.375", normal: "1.5", relaxed: "1.625", loose: "2",
} as const;

const tokens = { colors, fontFamily, fontSize, fontWeight, textStyles, boxShadow, spacing, borderRadius, screens, lineHeight } as const;
export default tokens;
`;

  const dest = path.resolve(__dirname, "../styles/design-tokens.ts");
  fs.writeFileSync(dest, out, "utf8");
  console.log("✅ Written →", dest);
  console.log(`   ${colorStyles.length} colours, ${textStyles.length} text styles, ${shadowStyles.length} shadows`);
}

main().catch((e) => { console.error(e); process.exit(1); });
