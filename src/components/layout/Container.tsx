import { cn } from "@/lib/utils/cn";
import type { ElementType, ReactNode } from "react";

/**
 * Layout primitive: constrains content width and centers it.
 * Horizontal padding is token-driven and steps up deliberately at
 * breakpoints (mobile-first) — never a scaled-down desktop measure.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-(--container-lg)",
        "px-(--space-md) sm:px-(--space-lg) lg:px-(--space-xl)",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Section primitive: vertical page rhythm. Genuine repeated pattern —
 * every page composes sections. Spacing steps intentionally across
 * device classes via --space tokens.
 */
export function Section({
  children,
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("py-(--space-2xl) md:py-(--space-3xl)", className)}>
      {children}
    </Tag>
  );
}
