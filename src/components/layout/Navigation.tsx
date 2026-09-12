import { Link } from "@/components/ui/Link";
import { primaryNavigation } from "@/data/navigation";

/**
 * Primary navigation. Renders the data-driven nav from
 * data/navigation.ts; a route appears here only after its page exists.
 */
export function Navigation() {
  return (
    <nav aria-label="Primary">
      <ul className="site-navigation">
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
