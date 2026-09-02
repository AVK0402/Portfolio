import { cn } from "@/lib/utils/cn";

/** Horizontal rule using the semantic border token. */
export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-border", className)} />;
}
