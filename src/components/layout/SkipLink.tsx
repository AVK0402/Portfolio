import { cn } from "@/lib/utils/cn";

/**
 * Skip link: first focusable element on every page (keyboard nav, WCAG
 * 2.4.1 bypass blocks). Hidden until focused. Target: #main-content
 * on each page's <main>.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only",
        "focus:not-sr-only focus:fixed focus:top-(--space-sm) focus:left-(--space-sm) focus:z-[var(--z-sticky)]",
        "focus:bg-background focus:rounded-md focus:px-(--space-sm) focus:py-(--space-2xs) focus:font-medium",
      )}
    >
      Skip to main content
    </a>
  );
}
