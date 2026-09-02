# Content

- `work/*.mdx` — case studies (frontmatter contract in `src/lib/content/types.ts`; drafts excluded from production builds)
- `ideas/*.mdx` — thought-leadership articles
- `speaking/engagements.ts` — typed TS data, rendered by `EngagementList`
- `values/principles.ts` — typed TS data, rendered on the values page

Rule: the UI never reads files or data modules directly — only through the
getters in `src/lib/content/`.
