import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils/cn";

/** Shared eyebrow, heading, and introductory copy from the Figma sections. */
export function SectionIntro({
  eyebrow,
  title,
  description,
  accent = true,
}: {
  eyebrow: string;
  title: string | readonly string[];
  description: string;
  accent?: boolean;
}) {
  return (
    <div className={cn("section-intro", accent && "section-intro-accent")}>
      <p className="section-eyebrow">{eyebrow}</p>
      <SectionHeading className="portfolio-section-title">
        {typeof title === "string"
          ? title
          : title.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
      </SectionHeading>
      <p className="section-description">{description}</p>
    </div>
  );
}
