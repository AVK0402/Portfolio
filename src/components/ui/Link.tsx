import NextLink from "next/link";
import { cn } from "@/lib/utils/cn";

type LinkProps = React.ComponentProps<typeof NextLink>;

/**
 * Link primitive wrapping next/link — one place for link styling and
 * future behaviors (e.g. external-link indicators).
 * Internal links only; use plain <a> for external URLs.
 */
export function Link({ className, ...props }: LinkProps) {
  return <NextLink className={cn("hover:underline", className)} {...props} />;
}
