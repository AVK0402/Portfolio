import { principles } from "@content/values/principles";
import type { LeadershipValue } from "@/types/value";

/** Getter for leadership values (typed TS data in content/, not MDX). */
export async function getValues(): Promise<LeadershipValue[]> {
  return principles;
}
