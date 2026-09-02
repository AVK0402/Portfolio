import NextImage from "next/image";
import { cn } from "@/lib/utils/cn";

type ImageProps = React.ComponentProps<typeof NextImage> & {
  /** Above-the-fold images only. Default: lazy (performance first). */
  priority?: boolean;
};

/**
 * Image primitive wrapping next/image — enforces optimized, responsive
 * delivery. Lazy loading is the default; pass `priority` only for
 * above-the-fold hero images (a conscious, reviewable decision).
 * `alt` is mandatory.
 */
export function Image({ className, priority = false, ...props }: ImageProps) {
  return (
    <NextImage
      loading={priority ? undefined : "lazy"}
      priority={priority || undefined}
      className={cn("h-auto w-auto", className)}
      {...props}
    />
  );
}
