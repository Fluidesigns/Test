"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type BarDatum = { label: string; value: number };

/** Vertical bar chart. */
export function BarChart({
  data,
  color = "var(--chart-3)",
  height = 180,
  barMaxWidth = 28,
  formatY = (v: number) => `${v}`,
  ticks = 4,
}: {
  data: BarDatum[];
  color?: string;
  height?: number;
  barMaxWidth?: number;
  formatY?: (v: number) => string;
  ticks?: number;
}) {
  const W = 640;
  const H = height;
  const padL = 36;
  const padR = 12;
  const padT = 12;
  const padB = 24;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const max = niceMax(Math.max(...data.map((d) => d.value), 1));
  const slot = plotW / data.length;
  const barW = Math.min(barMaxWidth, slot * 0.6);

  const [hover, setHover] = useState<number | null>(null);
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => (max / ticks) * i);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
      {yTicks.map((t, i) => {
        const y = padT + plotH - (t / max) * plotH;
        return (
          <g key={i}>
            <line
              x1={padL}
              x2={padL + plotW}
              y1={y}
              y2={y}
              stroke="var(--chart-grid)"
              strokeDasharray={i === 0 ? "0" : "2 4"}
            />
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="10" fill="var(--chart-axis)">
              {formatY(Math.round(t))}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const x = padL + i * slot + (slot - barW) / 2;
        const h = (d.value / max) * plotH;
        const y = padT + plotH - h;
        const isHover = hover === i;
        return (
          <g
            key={d.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <motion.rect
              x={x}
              y={y}
              width={barW}
              rx={4}
              fill={color}
              opacity={isHover ? 1 : 0.9}
              initial={{ height: 0, y: padT + plotH }}
              animate={{ height: h, y }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            />
            <text
              x={x + barW / 2}
              y={H - 6}
              textAnchor="middle"
              fontSize="10"
              fill="var(--chart-axis)"
            >
              {d.label}
            </text>
            {isHover && (
              <g>
                <rect x={x - 10} y={y - 22} width={barW + 20} height={18} rx={4} fill="var(--app-text)" />
                <text
                  x={x + barW / 2}
                  y={y - 9}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--app-text-inverse)"
                  className="font-semibold"
                >
                  {formatY(d.value)}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function niceMax(v: number) {
  if (v <= 10) return Math.ceil(v);
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / pow) * pow;
}
