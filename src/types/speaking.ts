export interface Engagement {
  title: string;
  /** Conference / event / institution. */
  venue: string;
  /** ISO 8601 date. */
  date: string;
  /** Talk, keynote, panel, workshop, lecture. */
  format: "talk" | "keynote" | "panel" | "workshop" | "lecture";
  url?: string;
}

export interface SpeakingEngagement extends Engagement {
  slug: string;
}
