"use client";

import React, { SelectHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  selectSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder,
      helperText,
      errorText,
      selectSize = "md",
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

    const heightMap: Record<"sm" | "md" | "lg", string> = {
      sm: "h-8 text-sm pl-2.5 pr-8",
      md: "h-10 text-sm pl-3 pr-9",
      lg: "h-12 text-base pl-4 pr-10",
    };

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "w-fit")}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text-primary select-none"
          >
            {label}
          </label>
        )}

        <div className={cn("relative", fullWidth ? "w-full" : "w-fit")}>
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={isError}
            className={cn(
              "appearance-none w-full rounded-lg border bg-neutral-0 text-text-primary",
              "transition-all duration-150 outline-none cursor-pointer",
              heightMap[selectSize],
              isError
                ? "border-error-default focus:ring-2 focus:ring-red-200"
                : "border-border-default focus:border-border-focus focus:ring-2 focus:ring-primary-100",
              disabled && "bg-neutral-50 border-border-subtle text-text-disabled cursor-not-allowed",
              className,
            )}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-secondary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {isError ? (
          <p className="text-xs text-error-text" role="alert">{errorText}</p>
        ) : helperText ? (
          <p className="text-xs text-text-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
