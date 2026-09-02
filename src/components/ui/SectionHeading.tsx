import { cn } from "@/lib/utils/cn";

/**
 * Section heading: consistent section header pattern.
 * Default level is h2 — pages own exactly one h1.
 */
export function SectionHeading({
  children,
  as: Tag = "h2",
  className,
}: {
  children: React.ReactNode;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={cn("text-2xl font-semibold tracking-tight", className)}>
      {children}
    </Tag>
  );
}
