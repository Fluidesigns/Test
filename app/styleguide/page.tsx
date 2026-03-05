import tokens from "@/styles/design-tokens";

// ─── Types ────────────────────────────────────────────────────────────────────

type AnyRecord = Record<string, string | Record<string, string> | unknown>;

// ─── Layout helpers ───────────────────────────────────────────────────────────

function Section({ id, title, subtitle, children }: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 mb-20">
      <div className="mb-6 border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Chip({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-neutral-500">{label}</span>
      <code className={`rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-700 ${mono ? "font-mono" : ""}`}>
        {value}
      </code>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "colors",       label: "Colors"       },
  { id: "typography",   label: "Typography"   },
  { id: "spacing",      label: "Spacing"      },
  { id: "radius",       label: "Border Radius"},
  { id: "shadows",      label: "Shadows"      },
  { id: "breakpoints",  label: "Breakpoints"  },
];

// ─── Color groups ─────────────────────────────────────────────────────────────

type SwatchGroupDef = {
  label: string;
  key: keyof typeof tokens.colors;
  description: string;
};

const COLOR_GROUPS: SwatchGroupDef[] = [
  { label: "Primary",   key: "primary",   description: "Core brand colour — Gokwik Indigo" },
  { label: "Secondary", key: "secondary", description: "Accent brand colour — Gokwik Green" },
  { label: "Neutral",   key: "neutral",   description: "Greys for text, borders, and surfaces" },
  { label: "Success",   key: "success",   description: "Positive states and confirmations" },
  { label: "Warning",   key: "warning",   description: "Caution and degraded states" },
  { label: "Error",     key: "error",     description: "Errors, destructive actions" },
  { label: "Info",      key: "info",      description: "Informational and neutral prompts" },
];

const ALIAS_GROUPS = [
  { label: "Surface",  key: "surface"  },
  { label: "Text",     key: "text"     },
  { label: "Border",   key: "border"   },
] as const;

function needsDarkText(hex: string): boolean {
  if (!hex.startsWith("#")) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function SwatchRow({ groupDef }: { groupDef: SwatchGroupDef }) {
  const shades = tokens.colors[groupDef.key] as Record<string, string>;
  const entries = Object.entries(shades);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-baseline gap-3">
        <span className="text-sm font-semibold text-neutral-800">{groupDef.label}</span>
        <span className="text-xs text-neutral-400">{groupDef.description}</span>
      </div>

      {/* Continuous colour strip */}
      <div className="mb-2 flex h-12 overflow-hidden rounded-xl border border-neutral-200">
        {entries.map(([, hex]) => (
          <div key={hex} className="flex-1" style={{ backgroundColor: hex }} />
        ))}
      </div>

      {/* Shade chips */}
      <div className="flex flex-wrap gap-2">
        {entries.map(([shade, hex]) => (
          <div
            key={shade}
            title={hex}
            className="group relative flex flex-col items-center gap-1"
          >
            <div
              className="h-10 w-10 rounded-lg border border-neutral-200 shadow-xs transition-transform group-hover:scale-110"
              style={{ backgroundColor: hex }}
            />
            <span className="font-mono text-[10px] text-neutral-500">{shade}</span>
            {/* Hover tooltip */}
            <span
              className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-0.5 font-mono text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              {hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AliasSwatches({ label, colorKey }: { label: string; colorKey: "surface" | "text" | "border" }) {
  const entries = Object.entries(tokens.colors[colorKey] as Record<string, string>);
  return (
    <div className="mb-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">{label}</p>
      <div className="flex flex-wrap gap-3">
        {entries.map(([name, value]) => {
          const isRgba = value.startsWith("rgba");
          const bg = isRgba ? value : value;
          const textColor = !isRgba && needsDarkText(value) ? "#0F172A" : "#FFFFFF";
          return (
            <div key={name} className="flex flex-col gap-1.5 items-center">
              <div
                className="h-10 w-24 rounded-lg border border-neutral-200 flex items-center justify-center"
                style={{ background: bg }}
              >
                <span style={{ color: textColor, fontSize: 9, fontFamily: "monospace" }}>
                  {name}
                </span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400 max-w-24 truncate text-center">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Typography ───────────────────────────────────────────────────────────────

type FontSizeEntry = [string, [string, { lineHeight: string; letterSpacing: string }]];
const TYPE_SCALE = Object.entries(tokens.fontSize) as FontSizeEntry[];

// ─── Spacing ──────────────────────────────────────────────────────────────────

const SPACING_PREVIEW = Object.entries(tokens.spacing).filter(([k]) =>
  ["0", "1", "2", "3", "4", "6", "8", "10", "12", "16", "20", "24", "32", "40", "48", "64"].includes(k)
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StyleGuidePage() {
  return (
    <div className="flex min-h-screen bg-neutral-50">

      {/* ── Sidebar nav ──────────────────────────────────────────────────── */}
      <aside className="sticky top-0 hidden h-screen w-52 shrink-0 flex-col border-r border-neutral-200 bg-white px-4 py-8 lg:flex">
        <div className="mb-8">
          <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
            <span className="text-xs font-black text-white">GK</span>
          </div>
          <p className="mt-2 text-xs font-semibold text-neutral-800">Gokwik</p>
          <p className="text-xs text-neutral-400">Design System</p>
        </div>

        <nav className="flex flex-col gap-0.5">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto">
          <p className="text-[10px] text-neutral-300 font-mono">QAhSS6Cl4wNBT1qfFljfhZ</p>
          <p className="text-[10px] text-neutral-300">Figma • node 296-7048</p>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="min-w-0 flex-1 px-6 py-10 lg:px-12">

        {/* Header */}
        <header className="mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            <span className="text-xs font-semibold text-primary-600">Design Tokens</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-neutral-900">
            Gokwik Style Guide
          </h1>
          <p className="mt-3 max-w-lg text-base text-neutral-500">
            Single source of truth for all visual decisions. Tokens live in{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-primary-600">
              styles/design-tokens.ts
            </code>
            {" "}and are wired into Tailwind automatically.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://www.figma.com/design/QAhSS6Cl4wNBT1qfFljfhZ/Gokwik-Design-System?node-id=296-7048"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-700 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 38 57" fill="none" aria-hidden="true">
                <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5Z" fill="currentColor" fillOpacity=".5"/>
                <path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5a9.5 9.5 0 0 0 0 19Z" fill="currentColor" fillOpacity=".5"/>
                <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="currentColor" fillOpacity=".5"/>
                <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="currentColor" fillOpacity=".5"/>
                <path d="M19 0V19h9.5a9.5 9.5 0 1 0 0-19Z" fill="currentColor" fillOpacity=".5"/>
              </svg>
              Open in Figma
            </a>
            <span className="inline-flex items-center rounded-lg border border-neutral-200 bg-white px-3 py-1.5 font-mono text-xs text-neutral-500">
              npx ts-node scripts/extract-figma-tokens.ts
            </span>
          </div>
        </header>

        {/* ──────────────────────────────────────────────────────────────── */}
        {/* COLORS                                                          */}
        {/* ──────────────────────────────────────────────────────────────── */}
        <Section
          id="colors"
          title="Colors"
          subtitle="Full palette with semantic aliases. All values are in styles/design-tokens.ts → colors"
        >
          <Sub title="Brand & Semantic Palettes">
            {COLOR_GROUPS.map((g) => (
              <SwatchRow key={g.key} groupDef={g} />
            ))}
          </Sub>

          <Sub title="Semantic Aliases">
            {ALIAS_GROUPS.map(({ label, key }) => (
              <AliasSwatches key={key} label={label} colorKey={key} />
            ))}
          </Sub>
        </Section>

        {/* ──────────────────────────────────────────────────────────────── */}
        {/* TYPOGRAPHY                                                      */}
        {/* ──────────────────────────────────────────────────────────────── */}
        <Section
          id="typography"
          title="Typography"
          subtitle="Font families, type scale, weights, and line heights"
        >
          {/* Families */}
          <Sub title="Font Families">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {(Object.entries(tokens.fontFamily) as [string, readonly string[]][]).map(([name, stack]) => (
                <div key={name} className="rounded-xl border border-neutral-200 bg-white p-5">
                  <p
                    className="mb-1 text-4xl text-neutral-800"
                    style={{ fontFamily: stack.join(", ") }}
                  >
                    Ag
                  </p>
                  <p
                    className="mb-3 text-sm text-neutral-500"
                    style={{ fontFamily: stack.join(", ") }}
                  >
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                    abcdefghijklmnopqrstuvwxyz<br />
                    0123456789
                  </p>
                  <Chip label="token" value={`fontFamily.${name}`} />
                  <div className="mt-1">
                    <Chip label="value" value={stack[0]} />
                  </div>
                </div>
              ))}
            </div>
          </Sub>

          {/* Type scale */}
          <Sub title="Type Scale">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <div className="grid grid-cols-[4rem_5rem_5rem_1fr] gap-x-6 border-b border-neutral-100 bg-neutral-50 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <span>Token</span>
                <span>Size</span>
                <span>Line H.</span>
                <span>Sample</span>
              </div>
              {TYPE_SCALE.map(([name, [size, meta]], i) => (
                <div
                  key={name}
                  className={`grid grid-cols-[4rem_5rem_5rem_1fr] items-center gap-x-6 px-6 py-3 ${
                    i < TYPE_SCALE.length - 1 ? "border-b border-neutral-100" : ""
                  }`}
                >
                  <span className="font-mono text-xs text-neutral-500">{name}</span>
                  <span className="font-mono text-xs text-neutral-400">{size}</span>
                  <span className="font-mono text-xs text-neutral-400">{meta.lineHeight}</span>
                  <p
                    className="truncate text-neutral-800"
                    style={{ fontSize: size, lineHeight: meta.lineHeight }}
                  >
                    Gokwik Design
                  </p>
                </div>
              ))}
            </div>
          </Sub>

          {/* Weights */}
          <Sub title="Font Weights">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {(Object.entries(tokens.fontWeight) as [string, string][]).map(([name, w], i) => (
                <div
                  key={name}
                  className={`flex items-baseline gap-6 px-6 py-3 ${
                    i < Object.keys(tokens.fontWeight).length - 1 ? "border-b border-neutral-100" : ""
                  }`}
                >
                  <span className="w-24 shrink-0 font-mono text-xs text-neutral-400">{name}</span>
                  <span className="w-8 shrink-0 font-mono text-xs text-neutral-300">{w}</span>
                  <p className="text-xl text-neutral-800" style={{ fontWeight: w }}>
                    Checkout made simple
                  </p>
                </div>
              ))}
            </div>
          </Sub>

          {/* Line heights */}
          <Sub title="Line Heights">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {(Object.entries(tokens.lineHeight) as [string, string][]).map(([name, lh]) => (
                <div key={name} className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p
                    className="mb-3 text-sm text-neutral-700"
                    style={{ lineHeight: lh }}
                  >
                    The quick brown fox jumps high.
                  </p>
                  <Chip label={name} value={lh} />
                </div>
              ))}
            </div>
          </Sub>
        </Section>

        {/* ──────────────────────────────────────────────────────────────── */}
        {/* SPACING                                                         */}
        {/* ──────────────────────────────────────────────────────────────── */}
        <Section
          id="spacing"
          title="Spacing"
          subtitle="4 px base unit — Tailwind conventions. Use these consistently for padding, margin, and gap."
        >
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            <div className="grid grid-cols-[4rem_6rem_1fr] border-b border-neutral-100 bg-neutral-50 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <span>Token</span>
              <span>Value</span>
              <span>Visual</span>
            </div>
            {SPACING_PREVIEW.map(([name, val], i) => (
              <div
                key={name}
                className={`grid grid-cols-[4rem_6rem_1fr] items-center px-6 py-2.5 ${
                  i < SPACING_PREVIEW.length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                <span className="font-mono text-xs text-neutral-500">{name}</span>
                <span className="font-mono text-xs text-neutral-400">{val}</span>
                <div className="flex items-center">
                  <div
                    className="h-3 rounded-sm bg-primary-400"
                    style={{
                      width: val === "0px" ? "2px" : val,
                      minWidth: "2px",
                      maxWidth: "20rem",
                      opacity: val === "0px" ? 0.3 : 1,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="px-6 py-2.5 text-xs italic text-neutral-300">
              + {Object.keys(tokens.spacing).length - SPACING_PREVIEW.length} more values in design-tokens.ts
            </div>
          </div>
        </Section>

        {/* ──────────────────────────────────────────────────────────────── */}
        {/* BORDER RADIUS                                                   */}
        {/* ──────────────────────────────────────────────────────────────── */}
        <Section
          id="radius"
          title="Border Radius"
          subtitle="From sharp corners to fully rounded pills"
        >
          <div className="flex flex-wrap gap-6">
            {(Object.entries(tokens.borderRadius) as [string, string][]).map(([name, val]) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 border-2 border-primary-300 bg-primary-50"
                  style={{ borderRadius: val }}
                />
                <div className="text-center">
                  <p className="text-xs font-medium text-neutral-700">
                    {name === "DEFAULT" ? "default" : name}
                  </p>
                  <p className="font-mono text-[10px] text-neutral-400">{val}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ──────────────────────────────────────────────────────────────── */}
        {/* SHADOWS                                                         */}
        {/* ──────────────────────────────────────────────────────────────── */}
        <Section
          id="shadows"
          title="Shadows"
          subtitle="Elevation system plus brand-coloured glows and focus ring"
        >
          <div className="flex flex-wrap gap-6">
            {(Object.entries(tokens.boxShadow) as [string, string][]).map(([name, val]) => (
              <div key={name} className="flex flex-col gap-3">
                <div
                  className="flex h-24 w-36 items-center justify-center rounded-xl bg-white"
                  style={{ boxShadow: val === "none" ? undefined : val }}
                >
                  {val === "none" && (
                    <span className="text-xs text-neutral-300">none</span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-700">{name}</p>
                  <p
                    className="mt-0.5 w-36 truncate font-mono text-[10px] text-neutral-400"
                    title={val}
                  >
                    {val}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ──────────────────────────────────────────────────────────────── */}
        {/* BREAKPOINTS                                                     */}
        {/* ──────────────────────────────────────────────────────────────── */}
        <Section
          id="breakpoints"
          title="Breakpoints"
          subtitle="min-width values for responsive design — used as Tailwind screen prefixes"
        >
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            <div className="grid grid-cols-[4rem_6rem_1fr_auto] border-b border-neutral-100 bg-neutral-50 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <span>Prefix</span>
              <span>min-width</span>
              <span>Scale</span>
              <span>Tailwind usage</span>
            </div>
            {(Object.entries(tokens.screens) as [string, string][]).map(([bp, val], i) => (
              <div
                key={bp}
                className={`grid grid-cols-[4rem_6rem_1fr_auto] items-center gap-4 px-6 py-4 ${
                  i < Object.keys(tokens.screens).length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                <span className="font-mono text-sm font-semibold text-neutral-800">{bp}</span>
                <span className="font-mono text-xs text-neutral-500">{val}</span>
                <div className="relative h-2 rounded-full bg-neutral-100">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary-400"
                    style={{ width: `${(parseInt(val) / 1600) * 100}%` }}
                  />
                </div>
                <code className="whitespace-nowrap rounded bg-neutral-100 px-2 py-0.5 font-mono text-xs text-primary-600">
                  {bp}:class-name
                </code>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="mt-20 flex items-center justify-between border-t border-neutral-200 pt-8 text-xs text-neutral-400">
          <p>
            Gokwik Design System &mdash; tokens in{" "}
            <code className="font-mono text-primary-500">styles/design-tokens.ts</code>
          </p>
          <a
            href="https://www.figma.com/design/QAhSS6Cl4wNBT1qfFljfhZ/Gokwik-Design-System?node-id=296-7048"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-700 transition-colors"
          >
            Figma Source ↗
          </a>
        </footer>

      </main>
    </div>
  );
}
