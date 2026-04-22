"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type StackedSeries = { key: string; label: string; color: string };
export type StackedRow = { label: string; values: Record<string, number> };

export function StackedBarChart({
  rows,
  series,
  ticks = 6,
  barHeight = 14,
  gap = 18,
  leftLabelWidth = 132,
  formatValue = (v: number) => `${v}`,
}: {
  rows: StackedRow[];
  series: StackedSeries[];
  ticks?: number;
  barHeight?: number;
  gap?: number;
  leftLabelWidth?: number;
  formatValue?: (v: number) => string;
}) {
  const [hover, setHover] = useState<{ row: number; seg: number } | null>(null);

  const rowTotals = rows.map((r) => series.reduce((s, ser) => s + (r.values[ser.key] ?? 0), 0));
  const max = niceMax(Math.max(...rowTotals));
  const plotWidth = 600;
  const rightPad = 12;
  const chartStartX = leftLabelWidth + 8;
  const chartEndX = plotWidth - rightPad;
  const chartW = chartEndX - chartStartX;

  const axisY = rows.length * (barHeight + gap) - gap + 12;
  const height = axisY + 24;

  const tickValues = Array.from({ length: ticks + 1 }, (_, i) => Math.round((max / ticks) * i));

  return (
    <svg
      viewBox={`0 0 ${plotWidth} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Stacked bar chart"
    >
      {tickValues.map((t, i) => {
        const x = chartStartX + (t / max) * chartW;
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

      {rows.map((row, rIdx) => {
        const y = rIdx * (barHeight + gap);
        let cursorX = chartStartX;
        return (
          <g key={row.label}>
            <text
              x={leftLabelWidth}
              y={y + barHeight / 2 + 4}
              textAnchor="end"
              fontSize="10.5"
              fill="var(--app-text-muted)"
              className="font-medium"
            >
              {truncate(row.label, 22)}
            </text>
            {series.map((s, sIdx) => {
              const v = row.values[s.key] ?? 0;
              const w = (v / max) * chartW;
              const segX = cursorX;
              cursorX += w;
              const isHover = hover?.row === rIdx && hover?.seg === sIdx;
              return (
                <motion.rect
                  key={s.key}
                  x={segX}
                  y={y}
                  height={barHeight}
                  fill={s.color}
                  opacity={hover && !isHover ? 0.7 : 1}
                  initial={{ width: 0 }}
                  animate={{ width: w }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: rIdx * 0.05 + sIdx * 0.04,
                  }}
                  onMouseEnter={() => setHover({ row: rIdx, seg: sIdx })}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
            {hover?.row === rIdx && (
              <g>
                <rect
                  x={Math.min(chartStartX + (rowTotals[rIdx] / max) * chartW, chartEndX - 80)}
                  y={y - 22}
                  width={80}
                  height={18}
                  rx={4}
                  fill="var(--app-text)"
                />
                <text
                  x={Math.min(chartStartX + (rowTotals[rIdx] / max) * chartW, chartEndX - 80) + 40}
                  y={y - 9}
                  fontSize="10"
                  fill="var(--app-text-inverse)"
                  textAnchor="middle"
                  className="font-semibold"
                >
                  {series[hover.seg].label}: {formatValue(row.values[series[hover.seg].key] ?? 0)}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {tickValues.map((t, i) => {
        const x = chartStartX + (t / max) * chartW;
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
