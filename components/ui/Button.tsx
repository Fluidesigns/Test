"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "outline"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

// ─── Variant & size maps ──────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary-500 text-white border border-transparent",
    "hover:bg-primary-600 active:bg-primary-700",
    "disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed",
    "shadow-primary-sm hover:shadow-primary-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  ].join(" "),

  secondary: [
    "bg-secondary-500 text-white border border-transparent",
    "hover:bg-secondary-600 active:bg-secondary-700",
    "disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed",
    "shadow-secondary-sm hover:shadow-secondary-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2",
  ].join(" "),

  outline: [
    "bg-transparent text-primary-600 border border-primary-400",
    "hover:bg-primary-25 hover:border-primary-500 active:bg-primary-50",
    "disabled:border-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  ].join(" "),

  ghost: [
    "bg-transparent text-neutral-700 border border-transparent",
    "hover:bg-neutral-100 active:bg-neutral-200",
    "disabled:text-neutral-400 disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
  ].join(" "),

  danger: [
    "bg-error-default text-white border border-transparent",
    "hover:bg-red-700 active:bg-red-800",
    "disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
  ].join(" "),

  link: [
    "bg-transparent text-primary-500 border border-transparent underline-offset-4",
    "hover:underline hover:text-primary-600 active:text-primary-700",
    "disabled:text-neutral-400 disabled:cursor-not-allowed disabled:no-underline",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-6 px-2 text-xs rounded gap-1",
  sm: "h-8 px-3 text-sm rounded-md gap-1.5",
  md: "h-10 px-4 text-sm rounded-lg gap-2",
  lg: "h-11 px-5 text-base rounded-lg gap-2",
  xl: "h-12 px-6 text-base rounded-xl gap-2.5",
};

const spinnerSizeMap: Record<ButtonSize, "xs" | "sm" | "md"> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "sm",
  xl: "md",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      disabled,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // base
          "inline-flex items-center justify-center font-medium transition-all duration-150 select-none whitespace-nowrap",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          loading && "pointer-events-none",
          className,
        )}
        {...rest}
      >
        {loading ? (
          <Spinner
            size={spinnerSizeMap[size]}
            color={variant === "ghost" || variant === "outline" || variant === "link" ? "primary" : "white"}
          />
        ) : (
          iconLeft && <span className="shrink-0">{iconLeft}</span>
        )}

        {children && (
          <span className={cn(loading && "opacity-70")}>{children}</span>
        )}

        {!loading && iconRight && (
          <span className="shrink-0">{iconRight}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
