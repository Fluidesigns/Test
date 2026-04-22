import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "danger" | "info" | "accent";

const tones: Record<Tone, string> = {
  neutral: "bg-app-surface-2 text-app-text-muted border-app-border",
  success: "bg-[color:var(--app-success)]/10 text-app-success border-[color:var(--app-success)]/25",
  warning: "bg-[color:var(--app-warning)]/10 text-app-warning border-[color:var(--app-warning)]/25",
  danger:  "bg-[color:var(--app-danger)]/10  text-app-danger  border-[color:var(--app-danger)]/25",
  info:    "bg-app-accent-soft text-app-accent border-app-accent/20",
  accent:  "bg-app-accent text-app-accent-fg border-transparent",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
