"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export type LineSeries = { key: string; label: string; color: string; data: number[] };

export function LineChart({
  series,
  xLabels,
  height = 180,
  showArea = false,
  ticks = 4,
  formatY = (v: number) => `${v}`,
}: {
  series: LineSeries[];
  xLabels: string[];
  height?: number;
  showArea?: boolean;
  ticks?: number;
  formatY?: (v: number) => string;
}) {
  const W = 640;
  const H = height;
  const padL = 36;
  const padR = 12;
  const padT = 12;
  const padB = 24;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const allValues = series.flatMap((s) => s.data);
  const max = Math.max(...allValues, 1);
  const niceMaxV = niceMax(max);
  const stepX = plotW / Math.max(xLabels.length - 1, 1);

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const paths = useMemo(() => {
    return series.map((s) => {
      const points = s.data.map((v, i) => ({
        x: padL + i * stepX,
        y: padT + plotH - (v / niceMaxV) * plotH,
      }));
      const d = smoothPath(points);
      const area =
        d +
        ` L ${padL + plotW} ${padT + plotH} L ${padL} ${padT + plotH} Z`;
      return { series: s, d, area, points };
    });
  }, [series, stepX, plotH, padT, padL, plotW, niceMaxV]);

  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => (niceMaxV / ticks) * i);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
      <defs>
        {series.map((s) => (
          <linearGradient key={s.key} id={`lc-grad-${s.key}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>

      {yTicks.map((t, i) => {
        const y = padT + plotH - (t / niceMaxV) * plotH;
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
            <text
              x={padL - 6}
              y={y + 3}
              textAnchor="end"
              fontSize="10"
              fill="var(--chart-axis)"
            >
              {formatY(t)}
            </text>
          </g>
        );
      })}

      {/* area fills */}
      {showArea &&
        paths.map(({ series: s, area }) => (
          <motion.path
            key={`a-${s.key}`}
            d={area}
            fill={`url(#lc-grad-${s.key})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        ))}

      {/* lines */}
      {paths.map(({ series: s, d }) => (
        <motion.path
          key={`l-${s.key}`}
          d={d}
          stroke={s.color}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* hover capture & tooltip */}
      {xLabels.map((lab, i) => {
        const x = padL + i * stepX;
        return (
          <rect
            key={`h-${i}`}
            x={x - stepX / 2}
            y={0}
            width={stepX}
            height={H}
            fill="transparent"
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
          />
        );
      })}

      {hoverIdx !== null && (
        <g>
          <line
            x1={padL + hoverIdx * stepX}
            x2={padL + hoverIdx * stepX}
            y1={padT}
            y2={padT + plotH}
            stroke="var(--app-border-strong)"
            strokeDasharray="3 3"
          />
          {paths.map(({ series: s, points }) => (
            <circle
              key={`dot-${s.key}`}
              cx={points[hoverIdx!].x}
              cy={points[hoverIdx!].y}
              r={4}
              fill="var(--app-surface)"
              stroke={s.color}
              strokeWidth={2}
            />
          ))}
        </g>
      )}

      {xLabels.map((lab, i) => (
        <text
          key={`xl-${i}`}
          x={padL + i * stepX}
          y={H - 6}
          textAnchor="middle"
          fontSize="10"
          fill="var(--chart-axis)"
        >
          {lab}
        </text>
      ))}
    </svg>
  );
}

function smoothPath(p: { x: number; y: number }[]) {
  if (p.length === 0) return "";
  if (p.length === 1) return `M ${p[0].x} ${p[0].y}`;
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 1; i < p.length; i++) {
    const prev = p[i - 1];
    const cur = p[i];
    const mx = (prev.x + cur.x) / 2;
    d += ` Q ${prev.x} ${prev.y} ${mx} ${(prev.y + cur.y) / 2}`;
    d += ` T ${cur.x} ${cur.y}`;
  }
  return d;
}

function niceMax(v: number) {
  if (v <= 10) return Math.ceil(v);
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / pow) * pow;
}
