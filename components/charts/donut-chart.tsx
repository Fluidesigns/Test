"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type DonutDatum = { label: string; value: number; color: string };

export function DonutChart({
  data,
  size = 180,
  thickness = 26,
  centerLabel,
  centerSublabel,
}: {
  data: DonutDatum[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSublabel?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--app-divider)"
          strokeWidth={thickness}
          fill="none"
        />
        {data.map((d, i) => {
          const frac = d.value / total;
          const dash = frac * circ;
          const dashoffset = -offset;
          offset += dash;
          const isHover = hover === i;
          return (
            <motion.circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={d.color}
              strokeWidth={isHover ? thickness + 2 : thickness}
              fill="none"
              strokeLinecap="butt"
              strokeDasharray={`${dash} ${circ}`}
              strokeDashoffset={dashoffset}
              initial={{ opacity: 0, strokeDasharray: `0 ${circ}` }}
              animate={{ opacity: 1, strokeDasharray: `${dash} ${circ}` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 + i * 0.1 }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </svg>
      {(centerLabel || centerSublabel) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          {centerLabel && (
            <span className="text-lg font-bold font-display text-app-text">{centerLabel}</span>
          )}
          {centerSublabel && (
            <span className="text-[10px] text-app-text-subtle uppercase tracking-wider">
              {centerSublabel}
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}
