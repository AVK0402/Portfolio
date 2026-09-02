export interface Profile {
  name: string;
  role: string;
  /** One-paragraph executive positioning (copy phase). */
  bio?: string;
  location?: string;
  email?: string;
  socials?: { label: string; url: string }[];
}

export interface ExperienceEntry {
  company: string;
  title: string;
  /** ISO 8601 date or "Present". */
  start: string;
  end?: string;
  summary?: string;
}
