import type { ReactNode } from "react";

/**
 * Layout primitive: constrains content width and centers it.
 * All page content should be wrapped in this — one place to evolve
 * the global rhythm later.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}
