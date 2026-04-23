"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type HBarDatum = { label: string; value: number };

/**
 * Horizontal bar chart. Colors come from the themed --chart-* palette so it
 * auto-adapts to light/dark mode.
 */
export function HorizontalBarChart({
  data,
  max,
  ticks = 5,
  barHeight = 14,
  gap = 18,
  leftLabelWidth = 96,
  color = "var(--chart-1)",
  formatValue = (v: number) => `${v}`,
}: {
  data: HBarDatum[];
  max?: number;
  ticks?: number;
  barHeight?: number;
  gap?: number;
  leftLabelWidth?: number;
  color?: string;
  formatValue?: (v: number) => string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const computedMax = max ?? niceMax(Math.max(...data.map((d) => d.value)));
  const plotWidth = 560; // viewBox units — scales responsively
  const rightPad = 12;
  const chartStartX = leftLabelWidth + 8;
  const chartEndX = plotWidth - rightPad;
  const chartW = chartEndX - chartStartX;

  const axisY = data.length * (barHeight + gap) - gap + 10;
  const height = axisY + 22;

  const tickValues = Array.from({ length: ticks + 1 }, (_, i) =>
    Math.round((computedMax / ticks) * i),
  );

  return (
    <svg
      viewBox={`0 0 ${plotWidth} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Horizontal bar chart"
    >
      {/* vertical gridlines */}
      {tickValues.map((t, i) => {
        const x = chartStartX + (t / computedMax) * chartW;
        return (
          <line
            key={i}
            x1={x}
            x2={x}
            y1={0}
            y2={axisY}
            stroke="var(--chart-grid)"
            strokeDasharray={i === 0 ? "0" : "2 4"}
            strokeWidth={1}
          />
        );
      })}

      {/* bars */}
      {data.map((d, i) => {
        const y = i * (barHeight + gap);
        const w = (d.value / computedMax) * chartW;
        const isHover = hover === i;
        return (
          <g key={d.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <text
              x={leftLabelWidth}
              y={y + barHeight / 2 + 4}
              textAnchor="end"
              fontSize="10.5"
              fill="var(--app-text-muted)"
              className="font-medium"
            >
              {truncate(d.label, 16)}
            </text>
            <motion.rect
              x={chartStartX}
              y={y}
              height={barHeight}
              rx={3}
              fill={color}
              opacity={isHover ? 1 : 0.92}
              initial={{ width: 0 }}
              animate={{ width: w }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            />
            {isHover && (
              <g>
                <rect
                  x={chartStartX + w - 2}
                  y={y - 20}
                  width={48}
                  height={18}
                  rx={4}
                  fill="var(--app-text)"
                />
                <text
                  x={chartStartX + w + 22}
                  y={y - 7}
                  fontSize="10"
                  fill="var(--app-text-inverse)"
                  textAnchor="middle"
                  className="font-semibold"
                >
                  {formatValue(d.value)}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* x-axis tick labels */}
      {tickValues.map((t, i) => {
        const x = chartStartX + (t / computedMax) * chartW;
        return (
          <text
            key={`lab-${i}`}
            x={x}
            y={axisY + 14}
            textAnchor="middle"
            fontSize="10"
            fill="var(--chart-axis)"
          >
            {t}
          </text>
        );
      })}
    </svg>
  );
}

function niceMax(v: number) {
  if (v <= 10) return 10;
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / pow) * pow;
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
