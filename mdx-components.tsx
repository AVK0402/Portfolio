import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

/**
 * Global MDX component mapping: content markup is styled through the
 * design system, never raw. When a CMS replaces MDX, its renderer
 * reuses these same component mappings.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children }) => <Link href={href}>{children}</Link>,
    img: ({ src = "", alt = "", width, height }) => (
      <Image
        src={src}
        alt={alt}
        width={Number(width ?? 1200)}
        height={Number(height ?? 630)}
      />
    ),
    ...components,
  };
}
