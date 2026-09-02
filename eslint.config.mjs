import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    // Client-JS containment: animation and analytics bundles may only be
    // imported inside their designated client directories (performance).
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["/motion", "/motion/*", "/framer-motion"],
              message:
                "Import motion primitives from '@/components/motion' — animation is a client boundary at components/motion only.",
            },
            {
              group: ["@vercel/analytics", "@vercel/analytics/*"],
              message:
                "Analytics providers live in lib/analytics/providers — import { Analytics } from '@/components/analytics'.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/motion/**"],
    rules: { "no-restricted-imports": "off" },
  },
  {
    files: ["src/lib/analytics/**"],
    rules: { "no-restricted-imports": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
