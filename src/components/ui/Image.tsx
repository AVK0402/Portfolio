import NextImage from "next/image";
import { cn } from "@/lib/utils/cn";

type ImageProps = React.ComponentProps<typeof NextImage>;

/**
 * Image primitive wrapping next/image — enforces optimized, responsive
 * delivery and one place to add standard sizing/loading behavior.
 */
export function Image({ className, ...props }: ImageProps) {
  return <NextImage className={cn("h-auto w-auto", className)} {...props} />;
}
