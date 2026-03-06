"use client";

import React, { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      prefix,
      suffix,
      inputSize = "md",
      fullWidth = false,
      disabled,
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const isError = Boolean(errorText);

    const wrapperHeight: Record<"sm" | "md" | "lg", string> = {
      sm: "h-8 text-sm px-2.5",
      md: "h-10 text-sm px-3",
      lg: "h-12 text-base px-4",
    };

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "w-fit")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text-primary select-none"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border bg-neutral-0 transition-all duration-150",
            wrapperHeight[inputSize],
            // border
            isError
              ? "border-error-default focus-within:ring-2 focus-within:ring-red-200"
              : "border-border-default focus-within:border-border-focus focus-within:ring-2 focus-within:ring-primary-100",
            disabled && "bg-neutral-50 border-border-subtle cursor-not-allowed",
            fullWidth && "w-full",
          )}
        >
          {prefix && (
            <span className="shrink-0 text-text-secondary">{prefix}</span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={isError}
            aria-describedby={
              isError ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none text-text-primary placeholder:text-text-tertiary",
              "disabled:cursor-not-allowed disabled:text-text-disabled",
              className,
            )}
            {...rest}
          />

          {suffix && (
            <span className="shrink-0 text-text-secondary">{suffix}</span>
          )}
        </div>

        {/* Helper / error */}
        {isError ? (
          <p id={`${id}-error`} className="text-xs text-error-text" role="alert">
            {errorText}
          </p>
        ) : helperText ? (
          <p id={`${id}-helper`} className="text-xs text-text-secondary">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
