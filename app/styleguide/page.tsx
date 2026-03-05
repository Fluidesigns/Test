import tokens from "@/styles/design-tokens";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 border-b border-neutral-200 pb-3 text-2xl font-bold text-neutral-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TokenLabel({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold text-neutral-700">{name}</span>
      <span className="font-mono text-2xs text-neutral-400">{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLOR_GROUPS = [
  { label: "Primary",   key: "primary"   },
  { label: "Secondary", key: "secondary" },
  { label: "Neutral",   key: "neutral"   },
  { label: "Success",   key: "success"   },
  { label: "Warning",   key: "warning"   },
  { label: "Error",     key: "error"     },
  { label: "Info",      key: "info"      },
] as const;

function ColorGroup({ label, colorKey }: { label: string; colorKey: keyof typeof tokens.colors }) {
  const shades = tokens.colors[colorKey] as Record<string, string>;
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">
        {label}
      </h3>
      <div className="flex flex-wrap gap-3">
        {Object.entries(shades).map(([shade, hex]) => (
          <div key={shade} className="flex flex-col items-center gap-1.5">
            <div
              className="h-12 w-12 rounded-lg border border-neutral-200 shadow-xs"
              style={{ backgroundColor: hex }}
            />
            <TokenLabel name={shade} value={hex} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

const TYPE_SCALE_ENTRIES = Object.entries(tokens.fontSize) as Array<
  [string, [string, { lineHeight: string }]]
>;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

const SPACING_ENTRIES = Object.entries(tokens.spacing).slice(0, 20); // show first 20

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

const RADIUS_ENTRIES = Object.entries(tokens.borderRadius);

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

const SHADOW_ENTRIES = Object.entries(tokens.boxShadow);

// ---------------------------------------------------------------------------
// Breakpoints
// ---------------------------------------------------------------------------

const SCREEN_ENTRIES = Object.entries(tokens.screens);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-14">
        <span className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-600">
          Design System
        </span>
        <h1 className="text-5xl font-black text-neutral-900">Style Guide</h1>
        <p className="mt-3 max-w-xl text-lg text-neutral-500">
          All design tokens in one place. Import from{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-primary-600">
            @/styles/design-tokens
          </code>{" "}
          to use them in your components.
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* COLORS                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Colors">
        {COLOR_GROUPS.map(({ label, key }) => (
          <ColorGroup key={key} label={label} colorKey={key} />
        ))}
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* TYPOGRAPHY                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Typography">
        {/* Font families */}
        <div className="mb-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Font Families
          </h3>
          <div className="flex flex-wrap gap-6">
            {Object.entries(tokens.fontFamily).map(([name, stack]) => (
              <div
                key={name}
                className="flex-1 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <p
                  className="mb-2 text-3xl"
                  style={{ fontFamily: Array.isArray(stack) ? stack.join(", ") : stack }}
                >
                  Aa Bb Cc
                </p>
                <TokenLabel name={name} value={Array.isArray(stack) ? stack[0] : stack} />
              </div>
            ))}
          </div>
        </div>

        {/* Type scale */}
        <div className="mb-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Type Scale
          </h3>
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            {TYPE_SCALE_ENTRIES.map(([name, [size, { lineHeight }]], i) => (
              <div
                key={name}
                className={`flex items-baseline gap-6 px-6 py-4 ${
                  i < TYPE_SCALE_ENTRIES.length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                <div className="w-16 shrink-0">
                  <span className="font-mono text-xs text-neutral-400">{name}</span>
                </div>
                <div className="w-24 shrink-0 text-right">
                  <span className="font-mono text-xs text-neutral-400">{size}</span>
                </div>
                <p
                  className="min-w-0 truncate text-neutral-800"
                  style={{ fontSize: size, lineHeight }}
                >
                  The quick brown fox
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Font weights */}
        <div className="mb-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Font Weights
          </h3>
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            {Object.entries(tokens.fontWeight).map(([name, weight], i) => (
              <div
                key={name}
                className={`flex items-center gap-6 px-6 py-3 ${
                  i < Object.keys(tokens.fontWeight).length - 1
                    ? "border-b border-neutral-100"
                    : ""
                }`}
              >
                <div className="w-28 shrink-0">
                  <span className="font-mono text-xs text-neutral-400">{name}</span>
                </div>
                <div className="w-12 shrink-0 text-right">
                  <span className="font-mono text-xs text-neutral-400">{weight}</span>
                </div>
                <p
                  className="text-xl text-neutral-800"
                  style={{ fontWeight: weight }}
                >
                  Design System
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Line heights */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Line Heights
          </h3>
          <div className="flex flex-wrap gap-4">
            {(["none", "tight", "snug", "normal", "relaxed", "loose"] as const).map((name) => (
              <div
                key={name}
                className="w-44 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <p
                  className="mb-3 text-sm text-neutral-700"
                  style={{ lineHeight: tokens.lineHeight[name] }}
                >
                  The quick brown fox jumps over the lazy dog. A second line.
                </p>
                <TokenLabel name={name} value={tokens.lineHeight[name]} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SPACING                                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Spacing">
        <p className="mb-4 text-sm text-neutral-500">
          4px base unit — follows Tailwind spacing conventions.
        </p>
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {SPACING_ENTRIES.map(([name, value], i) => (
            <div
              key={name}
              className={`flex items-center gap-4 px-6 py-3 ${
                i < SPACING_ENTRIES.length - 1 ? "border-b border-neutral-100" : ""
              }`}
            >
              <span className="w-8 shrink-0 font-mono text-xs text-neutral-400">{name}</span>
              <span className="w-16 shrink-0 font-mono text-xs text-neutral-400">{value}</span>
              <div
                className="h-4 rounded-sm bg-primary-400"
                style={{ width: value === "0px" ? "2px" : value, minWidth: "2px", maxWidth: "100%" }}
              />
            </div>
          ))}
          <div className="px-6 py-3 text-xs text-neutral-400 italic">
            + {Object.keys(tokens.spacing).length - SPACING_ENTRIES.length} more values…
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BORDER RADIUS                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Border Radius">
        <div className="flex flex-wrap gap-6">
          {RADIUS_ENTRIES.map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div
                className="h-16 w-16 bg-primary-100 border-2 border-primary-300"
                style={{ borderRadius: value }}
              />
              <TokenLabel name={name === "DEFAULT" ? "default" : name} value={value} />
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SHADOWS                                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Shadows">
        <div className="flex flex-wrap gap-6">
          {SHADOW_ENTRIES.map(([name, value]) => (
            <div
              key={name}
              className="flex flex-col gap-3"
            >
              <div
                className="flex h-20 w-36 items-center justify-center rounded-xl bg-white"
                style={{ boxShadow: value }}
              >
                <span className="text-xs font-medium text-neutral-400">
                  {name === "DEFAULT" ? "default" : name}
                </span>
              </div>
              <span className="font-mono text-2xs text-neutral-400 max-w-36 truncate" title={value}>
                {value === "none" ? "none" : value.substring(0, 30) + "…"}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BREAKPOINTS                                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Breakpoints">
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {SCREEN_ENTRIES.map(([name, value], i) => (
            <div
              key={name}
              className={`flex items-center gap-6 px-6 py-4 ${
                i < SCREEN_ENTRIES.length - 1 ? "border-b border-neutral-100" : ""
              }`}
            >
              <div className="w-12 shrink-0">
                <span className="font-mono text-sm font-semibold text-neutral-700">{name}</span>
              </div>
              <div className="w-20 shrink-0">
                <span className="font-mono text-xs text-neutral-400">{value}</span>
              </div>
              <div className="flex-1">
                <div className="relative h-2 rounded-full bg-neutral-100">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-primary-400"
                    style={{
                      width: `${(parseInt(value) / 1600) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-neutral-400">
                min-width: {value}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 pt-8 text-center text-sm text-neutral-400">
        <p>
          All tokens defined in{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-primary-600">
            styles/design-tokens.ts
          </code>
        </p>
      </footer>
    </div>
  );
}
