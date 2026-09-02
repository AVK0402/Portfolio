import Link from "next/link";
import { primaryNavigation } from "@/data/navigation";

/**
 * Primary navigation. Renders the data-driven nav from
 * data/navigation.ts; a route appears here only after its page exists.
 */
export function Navigation() {
  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-6">
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
