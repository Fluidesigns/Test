import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary:   "bg-primary-50  text-primary-700  border-primary-200",
  secondary: "bg-secondary-50 text-secondary-700 border-secondary-200",
  success:   "bg-success-bg  text-success-text  border-success-border",
  warning:   "bg-warning-bg  text-warning-text  border-warning-border",
  error:     "bg-error-bg    text-error-text    border-error-border",
  info:      "bg-info-bg     text-info-text     border-info-border",
  neutral:   "bg-neutral-100 text-neutral-700   border-neutral-200",
};

const dotClasses: Record<BadgeVariant, string> = {
  primary:   "bg-primary-500",
  secondary: "bg-secondary-500",
  success:   "bg-success-default",
  warning:   "bg-warning-default",
  error:     "bg-error-default",
  info:      "bg-info-default",
  neutral:   "bg-neutral-500",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-xs gap-1",
  md: "px-2 py-0.5 text-xs gap-1.5",
  lg: "px-2.5 py-1 text-sm gap-1.5",
};

const dotSizeClasses: Record<BadgeSize, string> = {
  sm: "w-1.5 h-1.5",
  md: "w-1.5 h-1.5",
  lg: "w-2 h-2",
};

export function Badge({
  variant = "primary",
  size = "md",
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "rounded-full shrink-0",
            dotClasses[variant],
            dotSizeClasses[size],
          )}
        />
      )}
      {children}
    </span>
  );
}
