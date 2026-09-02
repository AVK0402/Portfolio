import type { Engagement } from "@/types/speaking";

/** Single speaking engagement row. Presentation only. */
export function SpeakingCard({ engagement }: { engagement: Engagement }) {
  return (
    <article>
      <h3 className="font-semibold">{engagement.title}</h3>
      <p className="text-muted-foreground">
        {engagement.venue} · <time dateTime={engagement.date}>{engagement.date}</time> ·{" "}
        {engagement.format}
      </p>
    </article>
  );
}
