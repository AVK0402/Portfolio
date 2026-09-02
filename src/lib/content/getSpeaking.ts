import { engagements } from "@content/speaking/engagements";
import type { SpeakingEngagement } from "@/types/speaking";

/**
 * Getter for speaking engagements (typed TS data in content/, not MDX).
 * Newest first. A future CMS adapter would replace the data import —
 * the return type stays the contract.
 */
export async function getSpeaking(): Promise<SpeakingEngagement[]> {
  return [...engagements].sort((a, b) => (a.date < b.date ? 1 : -1));
}
