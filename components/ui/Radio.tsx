"use client";

import React, { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

// ─── RadioItem ────────────────────────────────────────────────────────────────

export interface RadioItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

export const RadioItem = forwardRef<HTMLInputElement, RadioItemProps>(
  (
    {
      label,
      description,
      size = "md",
      error = false,
      disabled,
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    const dotSize: Record<"sm" | "md" | "lg", string> = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    const labelSize: Record<"sm" | "md" | "lg", string> = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return (
      <div className={cn("flex items-start gap-2.5", disabled && "opacity-50")}>
        <div className="flex items-center pt-0.5">
          <input
            ref={ref}
            type="radio"
            id={id}
            disabled={disabled}
            aria-invalid={error}
            className={cn(
              "appearance-none rounded-full shrink-0 border-2 transition-all duration-150 cursor-pointer",
              "checked:border-primary-500 checked:bg-primary-500",
              "checked:[background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E')]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-1",
              "disabled:cursor-not-allowed",
              error ? "border-error-default" : "border-border-strong hover:border-primary-400",
              dotSize[size],
              className,
            )}
            {...rest}
          />
        </div>

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "font-medium text-text-primary cursor-pointer select-none",
                  labelSize[size],
                  disabled && "cursor-not-allowed",
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn("text-text-secondary", size === "lg" ? "text-sm" : "text-xs")}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);

RadioItem.displayName = "RadioItem";

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  legend?: string;
  children: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function RadioGroup({
  legend,
  children,
  orientation = "vertical",
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-1.5", className)}>
      {legend && (
        <legend className="text-sm font-medium text-text-primary mb-1">
          {legend}
        </legend>
      )}
      <div
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}
