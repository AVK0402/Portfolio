import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/** MDX pipeline: .md/.mdx compile as pages/components. */
const withMDX = createMDX({
  options: {
    // Future remark/rehype plugins (reading time, syntax highlighting, etc.) go here.
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx", "md"],
};

export default withMDX(nextConfig);
