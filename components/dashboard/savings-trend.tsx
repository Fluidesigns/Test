"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { LineChart, type LineSeries } from "@/components/charts/line-chart";
import { Segmented } from "@/components/ui/segmented";
import { useState } from "react";

type Range = "6m" | "12m";
type TrendData = { labels: string[]; series: LineSeries[] };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const SAVINGS: Record<Range, TrendData> = {
  "12m": {
    labels: MONTHS,
    series: [
      { key: "cur",  label: "This Year", color: "var(--chart-3)", data: [32, 44, 41, 58, 62, 71, 68, 82, 90, 95, 102, 112] },
      { key: "prev", label: "Last Year", color: "var(--chart-5)", data: [28, 34, 38, 46, 50, 52, 58, 66, 70, 74, 80, 88] },
    ],
  },
  "6m": {
    labels: MONTHS.slice(6),
    series: [
      { key: "cur",  label: "This Year", color: "var(--chart-3)", data: [68, 82, 90, 95, 102, 112] },
      { key: "prev", label: "Last Year", color: "var(--chart-5)", data: [58, 66, 70, 74, 80, 88] },
    ],
  },
};

export function SavingsTrend({ delay = 0 }: { delay?: number }) {
  const [range, setRange] = useState<Range>("12m");
  const d = SAVINGS[range];
  return (
    <Card delay={delay}>
      <CardHeader
        title="Savings Trend (USD, in thousands)"
        right={
          <Segmented
            size="xs"
            options={[
              { value: "6m",  label: "6M" },
              { value: "12m", label: "12M" },
            ]}
            value={range}
            onChange={(v) => setRange(v as Range)}
          />
        }
      />
      <div style={{ minHeight: "var(--d-chart-h)" }}>
        <LineChart
          series={d.series}
          xLabels={d.labels}
          showArea
          formatY={(v) => `$${v}k`}
        />
      </div>
      <div className="flex items-center gap-4 mt-3">
        {d.series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5 text-[11px] text-app-text-muted">
            <span
              className="inline-block h-2 w-5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>
    </Card>
  );
}
