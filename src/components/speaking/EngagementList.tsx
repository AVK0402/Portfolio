import { getSpeaking } from "@/lib/content/getSpeaking";
import { SpeakingCard } from "./SpeakingCard";

/**
 * Server component: loads speaking engagements via the content layer
 * and renders them as a list. Newest first (guaranteed by the getter).
 */
export async function EngagementList() {
  const engagements = await getSpeaking();
  return (
    <div className="flex flex-col gap-8">
      {engagements.map((engagement) => (
        <SpeakingCard
          key={engagement.slug ?? engagement.title}
          engagement={engagement}
        />
      ))}
    </div>
  );
}
