import React from "react";
import { cn } from "@/lib/utils";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";
export type AvatarVariant = "circle" | "rounded";

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  variant?: AvatarVariant;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral";
  className?: string;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const sizeClasses: Record<AvatarSize, { wrapper: string; text: string; status: string }> = {
  xs:  { wrapper: "w-6 h-6",   text: "text-[10px]", status: "w-1.5 h-1.5 border" },
  sm:  { wrapper: "w-8 h-8",   text: "text-xs",     status: "w-2 h-2 border" },
  md:  { wrapper: "w-10 h-10", text: "text-sm",     status: "w-2.5 h-2.5 border-[1.5px]" },
  lg:  { wrapper: "w-12 h-12", text: "text-base",   status: "w-3 h-3 border-2" },
  xl:  { wrapper: "w-16 h-16", text: "text-xl",     status: "w-3.5 h-3.5 border-2" },
  "2xl": { wrapper: "w-20 h-20", text: "text-2xl",  status: "w-4 h-4 border-2" },
};

const statusColors: Record<AvatarStatus, string> = {
  online:  "bg-success-default",
  offline: "bg-neutral-400",
  busy:    "bg-error-default",
  away:    "bg-warning-default",
};

const bgColors: Record<NonNullable<AvatarProps["color"]>, string> = {
  primary:   "bg-primary-100  text-primary-700",
  secondary: "bg-secondary-100 text-secondary-700",
  success:   "bg-success-bg   text-success-text",
  warning:   "bg-warning-bg   text-warning-text",
  error:     "bg-error-bg     text-error-text",
  info:      "bg-info-bg      text-info-text",
  neutral:   "bg-neutral-100  text-neutral-700",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  status,
  variant = "circle",
  color = "primary",
  className,
}: AvatarProps) {
  const sizes = sizeClasses[size];
  const shapeClass = variant === "circle" ? "rounded-full" : "rounded-xl";

  return (
    <span className={cn("relative inline-flex shrink-0", sizes.wrapper, className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover", shapeClass)}
        />
      ) : (
        <span
          className={cn(
            "w-full h-full flex items-center justify-center font-semibold select-none",
            shapeClass,
            bgColors[color],
            sizes.text,
          )}
          aria-label={alt || initials}
        >
          {initials
            ? initials.slice(0, 2).toUpperCase()
            : alt
              ? alt.slice(0, 1).toUpperCase()
              : "?"}
        </span>
      )}

      {status && (
        <span
          aria-label={status}
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-white",
            statusColors[status],
            sizes.status,
          )}
        />
      )}
    </span>
  );
}

// ─── AvatarGroup ──────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: Pick<AvatarProps, "src" | "alt" | "initials" | "color">[];
  size?: AvatarSize;
  max?: number;
  className?: string;
}

export function AvatarGroup({ avatars, size = "md", max = 4, className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const sizes = sizeClasses[size];

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visible.map((av, i) => (
        <div
          key={i}
          className="rounded-full ring-2 ring-white"
          style={{ zIndex: visible.length - i }}
        >
          <Avatar {...av} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="rounded-full ring-2 ring-white"
          style={{ zIndex: 0 }}
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-neutral-200 text-neutral-700 font-medium",
              sizes.wrapper,
              sizes.text,
            )}
          >
            +{overflow}
          </span>
        </div>
      )}
    </div>
  );
}
