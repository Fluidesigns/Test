"use client";

import { FileSignature, Wallet, UserPlus, Beaker, Zap, CheckCircle2, UserX } from "lucide-react";
import { AppShell } from "@/components/layout/shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { WorkloadList } from "@/components/dashboard/workload-list";
import { AttentionNeeded } from "@/components/dashboard/attention-needed";
import { PriorityRequests } from "@/components/dashboard/priority-requests";
import { AnnualSavings } from "@/components/dashboard/annual-savings";
import { CustomerSegments } from "@/components/dashboard/customer-segments";
import { CompletionTime } from "@/components/dashboard/completion-time";
import { RequestTypeByBU } from "@/components/dashboard/request-by-bu";
import { FiltersRow } from "@/components/dashboard/filters-row";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <div className="flex flex-col" style={{ gap: "var(--d-section-gap)" }}>
        <FiltersRow />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--d-card-gap)]">
          {/* LEFT 2/3 */}
          <div
            className="lg:col-span-2 flex flex-col"
            style={{ gap: "var(--d-card-gap)" }}
          >
            {/* Top metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-[var(--d-card-gap)]">
              <MetricCard
                label="Contracts Executed"
                value="04"
                valueSuffix="/ 2.8M"
                deltaPercent={7.1}
                icon={FileSignature}
                accent="var(--chart-3)"
                spark={[3, 5, 4, 7, 6, 9, 8, 11, 10, 12]}
                delay={0}
              />
              <MetricCard
                label="Savings (USD)"
                value="$257k"
                deltaPercent={7.1}
                icon={Wallet}
                accent="var(--app-success)"
                spark={[20, 24, 22, 30, 28, 36, 34, 42, 46, 52]}
                delay={0.04}
              />
              <MetricCard
                label="New Onboarding"
                value="36"
                deltaPercent={7.1}
                icon={UserPlus}
                accent="var(--brand-teal)"
                spark={[6, 8, 9, 12, 14, 16, 18, 22, 26, 30]}
                delay={0.08}
              />
              <MetricCard
                label="POC Requests"
                value="28"
                deltaPercent={7.1}
                icon={Beaker}
                accent="var(--chart-2)"
                spark={[10, 12, 11, 14, 13, 18, 16, 22, 24, 28]}
                delay={0.12}
              />
            </div>

            <CompletionTime delay={0.1} />
            <RequestTypeByBU delay={0.14} />
          </div>

          {/* RIGHT 1/3 */}
          <div className="flex flex-col" style={{ gap: "var(--d-card-gap)" }}>
            <StatCard
              label="Active Request"
              value="50"
              icon={Zap}
              accent="var(--chart-3)"
              delay={0.02}
            />
            <StatCard
              label="Completed Requests"
              value="32"
              icon={CheckCircle2}
              accent="var(--app-success)"
              delay={0.06}
            />
            <StatCard
              label="Unassigned Requests"
              value="32"
              icon={UserX}
              accent="var(--app-warning)"
              delay={0.1}
            />
            <WorkloadList delay={0.14} />
            <AttentionNeeded delay={0.18} />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--d-card-gap)]">
          <div className="lg:col-span-2">
            <PriorityRequests delay={0.1} />
          </div>
          <CustomerSegments delay={0.14} />
        </div>

        <div className="grid grid-cols-1">
          <AnnualSavings delay={0.18} />
        </div>
      </div>
    </AppShell>
  );
}
