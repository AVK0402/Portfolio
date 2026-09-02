import type { ElementType, ReactNode } from "react";

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

/** Semantic heading that maps level to styles via tokens only. */
export function Heading({
  level = 2,
  children,
  className = "",
}: {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}) {
  const Tag: ElementType = `h${level}`;
  const styles: Record<1 | 2 | 3 | 4, string> = {
    1: "text-4xl font-semibold tracking-tight",
    2: "text-2xl font-semibold tracking-tight",
    3: "text-xl font-semibold",
    4: "text-base font-semibold",
  };
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
}

/** Body text using the muted token for secondary content. */
export function Text({
  muted = false,
  className = "",
  children,
}: {
  muted?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={`${muted ? "text-muted-foreground" : "text-foreground"} leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}
