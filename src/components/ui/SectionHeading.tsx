import { cn } from "@/lib/utils/cn";

/**
 * Section heading. `as` supports h1 (one per page, detail-page heroes),
 * h2 (default, section titles) and h3 (subsections) so heading
 * hierarchy can never skip levels.
 */
export function SectionHeading({
  children,
  as: Tag = "h2",
  className,
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const styles: Record<"h1" | "h2" | "h3", string> = {
    h1: "text-4xl font-semibold tracking-tight",
    h2: "text-2xl font-semibold tracking-tight",
    h3: "text-xl font-semibold",
  };
  return <Tag className={cn(styles[Tag], className)}>{children}</Tag>;
}
