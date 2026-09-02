import type { SpeakingEngagement } from "@/types/speaking";

/**
 * Speaking engagements. Copy is deferred — replace placeholder entries
 * during the content phase. Kept as typed TS (not MDX) because this
 * data is fully structured and rendered by EngagementList.
 */
export const engagements: SpeakingEngagement[] = [
  {
    slug: "example-engagement",
    title: "Example Talk Title", // TODO: content phase
    venue: "Example Conference",
    date: "2026-01-01",
    format: "talk",
  },
];
