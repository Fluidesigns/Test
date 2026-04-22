"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { DonutChart, type DonutDatum } from "@/components/charts/donut-chart";

const fmt = new Intl.NumberFormat("en-US");

const segments: DonutDatum[] = [
  { label: "Premium", value: 9450, color: "var(--chart-1)" },
  { label: "Regular", value: 8350, color: "var(--chart-3)" },
  { label: "New",     value: 3280, color: "var(--chart-5)" },
];

export function CustomerSegments({ delay = 0 }: { delay?: number }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  return (
    <Card delay={delay}>
      <CardHeader title="Customer Segments (USD)" />
      <div className="flex items-center gap-5">
        <DonutChart
          data={segments}
          size={156}
          thickness={22}
          centerLabel={`$${(total / 1000).toFixed(1)}k`}
          centerSublabel="Total"
        />
        <ul className="flex-1 space-y-2.5 min-w-0">
          {segments.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-xs">
              <span
                className="inline-block h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-app-text-muted flex-1 min-w-0 truncate">{s.label}</span>
              <span className="font-semibold text-app-text tabular-nums">${fmt.format(s.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
