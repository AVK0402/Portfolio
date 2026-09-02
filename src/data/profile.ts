import type { Profile } from "@/types/profile";

/**
 * Executive profile data. Copy is intentionally deferred — replace
 * placeholders during the copy phase. Consumed via lib/content
 * getters, never imported by components directly.
 */
export const profile: Profile = {
  name: "Full Name", // TODO: copy phase
  role: "VP Design / Chief Design Officer",
};
