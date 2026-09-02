# Executive Platform — Architecture

This repository is the **foundation phase** of a long-term executive digital
platform. Visual design, copy and case-study content are deliberately NOT
defined here. This document records the architecture decisions so the
experience can evolve for 5–10 years without a rewrite.

## Technology Stack (current stable versions at setup time)

| Concern      | Choice                                       |
| ------------ | -------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack)           |
| UI runtime   | React 19 + TypeScript (strict, 5.9 line)     |
| Styling      | Tailwind CSS 4 (CSS-first `@theme` tokens)   |
| Animation    | Motion 13 (LazyMotion, isolated to client)   |
| Content      | MDX behind a **content abstraction layer**   |
| Icons        | lucide-react                                 |
| Images       | `next/image` (responsive, optimized)         |
| Validation   | Zod (content contracts, config)              |
| Package mgmt | pnpm                                         |
| Quality      | ESLint (next/core-web-vitals + TS), Prettier |
| Unit tests   | Vitest 4 + Testing Library (jsdom)           |
| E2E          | Playwright                                   |
| Analytics    | Provider-agnostic; Vercel Analytics adapter  |
| Hosting      | Vercel                                       |

> TypeScript is pinned to the mature 5.x line for toolchain compatibility
> (ESLint/MDX type plugins). Re-evaluate the 7.x native compiler once the
> surrounding tooling ecosystem fully supports it.

## Architectural Principles

1. **Routes are thin.** `src/app/*` fetches data via `lib/content` and composes
   blocks. No presentation logic in route files.
2. **Content is a contract, not a format.** The UI consumes
   `ContentItem` objects. MDX-on-disk is one adapter; a headless CMS later is
   another adapter implementing the same `ContentSource` interface
   (`src/lib/content/sources/`). Only `src/lib/content/index.ts` changes.
3. **Design tokens are semantic.** Components use tokens
   (`bg-background`, `text-muted-foreground`…), never raw values. Visual
   redesigns change `globals.css` values only.
4. **Animation is isolated.** Only client components under
   `components/motion/` import `motion`; the server tree stays static.
5. **Analytics is abstracted.** Call sites use `track()` and `<Analytics />`.
   Swapping providers touches only `src/lib/analytics/`.
6. **Identity has one source.** `src/config/site.ts` holds name, URL, author,
   navigation. Never hardcode identity in components.

## Folder Structure

```
content/                     # MDX collections (content source, today)
  articles/                  # thought leadership
  portfolio/                 # transformation stories (future)
  speaking/                  # talks & teaching (future)
  awards/ media/             # future collections
docs/                        # architecture documentation
src/
  app/                       # Next.js App Router — routes ONLY (thin)
    layout.tsx  page.tsx  sitemap.ts  robots.ts
  components/
    ui/                      # design-system primitives (Container, Heading, Text…)
    blocks/                  # composed sections (hero, article list… — future)
    layout/                  # header/footer/shell (future)
    motion/                  # animation boundaries (client-only)
    analytics/               # provider mount point
  config/site.ts             # single source of truth: identity, nav, env
  lib/
    content/                 # content abstraction layer
      types.ts               # Zod schemas = content contracts
      sources/mdx.ts         # file-system MDX adapter (the only FS-aware module)
      index.ts               # facade: the only import surface for the UI
    analytics/               # provider-agnostic analytics + adapters
    seo/metadata.ts          # metadata + JSON-LD factories
  styles → globals.css       # Tailwind v4 @theme token layer
tests/e2e/                   # Playwright specs
mdx-components.tsx           # MDX→design-system component mapping
```

## Content Architecture

Collections are defined once in `src/lib/content/types.ts`:
`articles`, `portfolio`, `speaking`, `awards`, `media`. Each has a Zod schema
validated at load time (bad frontmatter fails the build — content quality is
enforced, not assumed). Frontmatter contract example:
`content/articles/_example.mdx`.

## Quality Gates

- `pnpm verify` = typecheck + lint + format:check + unit tests + production build.
- Content frontmatter validated by Zod at build time.
- SEO: metadata factory per page, generated sitemap/robots, JSON-LD helpers.
- Accessibility: semantic HTML primitives, MotionConfig `reducedMotion="user"`,
  lang attribute from config; Playwright smoke asserts document structure.
- Performance: no animation code in the server tree (LazyMotion), `next/image`
  for all imagery, minimal dependency surface.

## CMS Migration Path (when needed)

1. Write a new adapter in `src/lib/content/sources/<cms>.ts` implementing
   `ContentSource`.
2. Change delegation in `src/lib/content/index.ts`.
3. Move `siteConfig` values to the CMS if desired — components unchanged.
