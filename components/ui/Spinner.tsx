import React from "react";
import { cn } from "@/lib/utils";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerColor = "primary" | "secondary" | "white" | "current";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
  label?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  xs: "w-3 h-3 border-[1.5px]",
  sm: "w-4 h-4 border-2",
  md: "w-5 h-5 border-2",
  lg: "w-6 h-6 border-[2.5px]",
  xl: "w-8 h-8 border-[3px]",
};

const colorMap: Record<SpinnerColor, string> = {
  primary:   "border-primary-200 border-t-primary-500",
  secondary: "border-secondary-200 border-t-secondary-500",
  white:     "border-white/30 border-t-white",
  current:   "border-current/20 border-t-current",
};

export function Spinner({
  size = "md",
  color = "primary",
  className,
  label = "Loading…",
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-block rounded-full animate-spin",
        sizeMap[size],
        colorMap[color],
        className,
      )}
    />
  );
}
