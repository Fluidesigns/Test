"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { HorizontalBarChart } from "@/components/charts/horizontal-bar-chart";

const data = [
  { label: "InfoSec",    value: 22 },
  { label: "Data Privacy", value: 19 },
  { label: "IT",         value: 16 },
  { label: "Procurement",value: 13 },
  { label: "Legal",      value: 10 },
];

export function CompletionTime({ delay = 0 }: { delay?: number }) {
  return (
    <Card delay={delay}>
      <CardHeader title="Completion Time by Functions (Days)" />
      <div style={{ minHeight: "var(--d-chart-h)" }}>
        <HorizontalBarChart
          data={data}
          max={24}
          ticks={8}
          color="var(--chart-1)"
          formatValue={(v) => `${v} d`}
        />
      </div>
    </Card>
  );
}
