import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariant = "default" | "outlined" | "elevated" | "filled";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

// ─── Variant map ──────────────────────────────────────────────────────────────

const variantClasses: Record<CardVariant, string> = {
  default:  "bg-neutral-0 border border-border-default shadow-xs",
  outlined: "bg-neutral-0 border-2 border-border-default",
  elevated: "bg-neutral-0 border border-border-subtle shadow-md",
  filled:   "bg-neutral-50 border border-border-subtle",
};

const paddingClasses: Record<"none" | "sm" | "md" | "lg", string> = {
  none: "",
  sm:   "p-3",
  md:   "p-4 md:p-5",
  lg:   "p-5 md:p-6",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({
  variant = "default",
  padding = "md",
  children,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── CardHeader ───────────────────────────────────────────────────────────────

export function CardHeader({
  title,
  subtitle,
  action,
  children,
  className,
  ...rest
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 pb-4 border-b border-border-subtle mb-4",
        className,
      )}
      {...rest}
    >
      {(title || subtitle) ? (
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-base font-semibold text-text-primary leading-snug">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-0.5 text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>
      ) : (
        <div className="flex-1 min-w-0">{children}</div>
      )}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ─── CardBody ─────────────────────────────────────────────────────────────────

export function CardBody({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-sm text-text-secondary", className)} {...rest}>
      {children}
    </div>
  );
}

// ─── CardFooter ───────────────────────────────────────────────────────────────

export function CardFooter({
  border = true,
  children,
  className,
  ...rest
}: CardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 mt-4 pt-4",
        border && "border-t border-border-subtle",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
