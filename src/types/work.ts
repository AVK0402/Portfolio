/**
 * Case study (work / transformation story) domain type.
 * MDX frontmatter is validated against this contract in lib/content.
 */

export interface ImpactMetric {
  /** Metric label, e.g. "NPS uplift". */
  label: string;
  /** Metric value, e.g. "+32" or "4x". */
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** ISO 8601 date. */
  date: string;
  summary?: string;
  /** Organization the transformation was delivered at. */
  client?: string;
  /** Role the executive played. */
  role?: string;
  /** Quantified outcomes rendered by ImpactMetrics. */
  metrics: ImpactMetric[];
  draft: boolean;
}
