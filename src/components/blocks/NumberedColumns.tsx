import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils/cn";

/** Shared principle/capability columns; reflows at the existing breakpoints. */
export function NumberedColumns({
  items,
  className,
}: {
  items: readonly { title: string; description: string }[];
  className?: string;
}) {
  return (
    <ol className={cn("numbered-columns", className)}>
      {items.map((item, index) => (
        <li key={item.title}>
          <span className="column-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="column-copy">
            <SectionHeading as="h3" className="portfolio-card-title">
              {item.title}
            </SectionHeading>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
