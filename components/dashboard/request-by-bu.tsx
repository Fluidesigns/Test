"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Segmented } from "@/components/ui/segmented";
import { StackedBarChart } from "@/components/charts/stacked-bar-chart";

const SERIES = [
  { key: "newPurchase",   label: "New Purchase",   color: "var(--chart-1)" },
  { key: "renewal",       label: "Renewal",        color: "var(--chart-2)" },
  { key: "catalogOrder",  label: "Catalog Order",  color: "var(--chart-3)" },
  { key: "po",            label: "PO",             color: "var(--chart-4)" },
];

const BU_ROWS = [
  { label: "Capital Markets",       values: { newPurchase: 12, renewal: 8, catalogOrder: 6, po: 9 } },
  { label: "Technology Management", values: { newPurchase: 10, renewal: 12, catalogOrder: 7, po: 8 } },
  { label: "Financial Planning",    values: { newPurchase: 9,  renewal: 10, catalogOrder: 6, po: 5 } },
  { label: "Strategic Sourcing",    values: { newPurchase: 8,  renewal: 7,  catalogOrder: 10, po: 4 } },
  { label: "Information Security",  values: { newPurchase: 11, renewal: 6,  catalogOrder: 4, po: 6 } },
  { label: "Global Wealth Solut.",  values: { newPurchase: 7,  renewal: 8,  catalogOrder: 5, po: 8 } },
  { label: "Real Estate Equity",    values: { newPurchase: 6,  renewal: 5,  catalogOrder: 6, po: 5 } },
];

const CATEGORY_ROWS = [
  { label: "SaaS Platforms",        values: { newPurchase: 14, renewal: 12, catalogOrder: 5,  po: 6 } },
  { label: "Hardware",              values: { newPurchase: 6,  renewal: 3,  catalogOrder: 12, po: 9 } },
  { label: "Professional Services", values: { newPurchase: 9,  renewal: 8,  catalogOrder: 4,  po: 7 } },
  { label: "Marketing",             values: { newPurchase: 7,  renewal: 9,  catalogOrder: 5,  po: 4 } },
  { label: "Facilities",            values: { newPurchase: 5,  renewal: 6,  catalogOrder: 8,  po: 5 } },
  { label: "Security",              values: { newPurchase: 10, renewal: 5,  catalogOrder: 3,  po: 5 } },
];

export function RequestTypeByBU({ delay = 0 }: { delay?: number }) {
  const [mode, setMode] = useState("BU");
  const rows = mode === "BU" ? BU_ROWS : CATEGORY_ROWS;

  return (
    <Card delay={delay}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-app-text font-display tracking-tight">
          Request Type by {mode} (Count)
        </h3>
        <Segmented
          options={[
            { value: "BU",       label: "BU" },
            { value: "Category", label: "Category" },
          ]}
          value={mode}
          onChange={setMode}
        />
      </div>
      <div style={{ minHeight: "var(--d-chart-h)" }}>
        <StackedBarChart rows={rows} series={SERIES} ticks={6} />
      </div>
      <div className="flex items-center justify-center gap-5 mt-3 flex-wrap">
        {SERIES.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5 text-[11px] text-app-text-muted">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>
    </Card>
  );
}
