import type { ReactNode } from "react";

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
