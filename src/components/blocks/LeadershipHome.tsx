import type { HomeContent } from "@/lib/content/getHome";
import { LeadershipMotion } from "./LeadershipMotion";

export function LeadershipHome({ content }: { content: HomeContent }) {
  return (
    <>
      <div
        className="portfolio-final"
        dangerouslySetInnerHTML={{ __html: content.markup }}
      />
      <LeadershipMotion />
    </>
  );
}
