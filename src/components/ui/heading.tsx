import type { ElementType, ReactNode } from "react";

/**
 * Semantic heading mapped to type-scale tokens.
 * Presentation-only; receives all content as props.
 */
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
