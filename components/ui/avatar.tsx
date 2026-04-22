import { cn } from "@/lib/cn";

export function Avatar({
  name,
  src,
  size = 32,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Deterministic color based on name for visual variety but stable re-renders.
  const palette = ["#2563EB", "#7C3AED", "#0EA5E9", "#14B8A6", "#F59E0B", "#EF4444"];
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = palette[hash % palette.length];

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn("rounded-full object-cover border border-app-border", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white text-[11px] select-none",
        className,
      )}
      style={{ width: size, height: size, backgroundColor: bg }}
    >
      {initials}
    </span>
  );
}
