/** Merges class strings, filtering falsy values. Zero-dependency cn(). */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
