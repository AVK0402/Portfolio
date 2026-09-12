import { Link } from "@/components/ui/Link";

/** One continuous chapter is supplied. Unavailable chapters have no invented targets. */
export function WorkQuickLinks({
  items,
  activeId,
}: {
  items: readonly { label: string; id?: string }[];
  activeId: string;
}) {
  return (
    <nav className="work-quick-links" aria-label="Quick Links">
      <ul>
        {items.map(({ label, id }) => (
          <li key={label}>
            {id ? (
              <Link
                href={`#${id}`}
                aria-current={id === activeId ? "location" : undefined}
              >
                {label}
              </Link>
            ) : (
              <span aria-disabled="true">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
