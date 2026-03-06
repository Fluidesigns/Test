import React from "react";
import { cn } from "@/lib/utils";

export type ProgressVariant = "primary" | "success" | "warning" | "error";
export type ProgressSize = "xs" | "sm" | "md" | "lg";

export interface ProgressProps {
  value: number;           // 0–100
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

const fillClasses: Record<ProgressVariant, string> = {
  primary: "bg-primary-500",
  success: "bg-success-default",
  warning: "bg-warning-default",
  error:   "bg-error-default",
};

const trackClasses: Record<ProgressVariant, string> = {
  primary: "bg-primary-100",
  success: "bg-success-bg",
  warning: "bg-warning-bg",
  error:   "bg-error-bg",
};

const heightMap: Record<ProgressSize, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function Progress({
  value,
  max = 100,
  variant = "primary",
  size = "md",
  label,
  showValue = false,
  animated = false,
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <span className="text-sm font-medium text-text-primary">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-text-secondary tabular-nums">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={cn(
          "w-full overflow-hidden rounded-full",
          trackClasses[variant],
          heightMap[size],
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            fillClasses[variant],
            animated && "animate-pulse",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
