import type { ImpactMetric } from "@/types/work";

/**
 * Quantified outcomes grid for a case study.
 * Renders nothing when there are no metrics.
 */
export function ImpactMetrics({ metrics }: { metrics: ImpactMetric[] }) {
  if (metrics.length === 0) return null;
  return (
    <dl className="grid gap-6 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt className="text-muted-foreground">{metric.label}</dt>
          <dd className="text-2xl font-semibold">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
