import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@mdx-components";

/**
 * Renders an article body. The body is opaque markdown/MDX sourced by
 * the content layer; this component owns HOW it renders (via the
 * global MDX component mapping), never WHAT it contains.
 */
export function ArticleContent({ body }: { body: string }) {
  return <MDXRemote source={body} components={useMDXComponents({})} />;
}
