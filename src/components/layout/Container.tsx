import { cn } from "@/lib/utils/cn";

/**
 * Layout primitive: constrains content width and centers it.
 * Width comes from the --container-* token layer — one place to evolve
 * the global measure later.
 */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-(--container-lg) px-6", className)}>
      {children}
    </div>
  );
}
