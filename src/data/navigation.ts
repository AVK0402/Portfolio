/**
 * Primary navigation data. Routes are defined in config/navigation.ts;
 * this file maps them to labels. A route appears here only after its
 * page exists.
 */
import { routes } from "@/config/navigation";

export const primaryNavigation: { label: string; href: string }[] = [
  { label: "Work", href: routes.work },
  { label: "Thinking", href: routes.ideas },
  { label: "About", href: routes.about },
];
