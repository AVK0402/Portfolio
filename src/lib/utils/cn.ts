/**
 * Conditional class-name join (dependency-free `clsx` equivalent).
 * Falsy values are skipped; entries are space-joined in order.
 */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
