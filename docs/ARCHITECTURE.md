# Executive Platform — Architecture

This repository is the **foundation phase** of a long-term executive digital
platform. Visual design, copy and case-study content are deliberately NOT
defined here. This document records the architecture decisions so the
experience can evolve for 5–10 years without a rewrite.

## Engineering Principles

These rules are binding for all contributions:

1. **Server Components by default.** `"use client"` only where interactivity
   requires it (currently: `motion-provider.tsx`, `lib/analytics/providers/*`).
   Keep the client boundary at the leaves of the tree.
2. **Content ≠ presentation.** Components receive content as props; routes
   fetch via `lib/content` and compose. No page should own presentation logic
   or data access simultaneously.
3. **Data models ≠ UI.** Content/validation shapes live in `lib/content/types.ts`,
   not in components. Components type their props explicitly and never import
   schemas to render.
4. **Composition over inheritance, no clever architecture.** Plain functions,
   explicit props, small modules. If a pattern needs a paragraph of explanation
   beyond its doc comment, it is too complex.
5. **Strict TypeScript everywhere** (`noUncheckedIndexedAccess` on). No `any`;
   the one deliberate cast (`parsed.data` in the MDX adapter) is documented.
6. **Accessibility first-class:** semantic HTML, one `h1` per page, `lang` from
   config, focus-visible styles, `reducedMotion` respected, landmarks (`main`,
   `nav`) used by the layout shell.
7. **Performance first-class:** animation code is code-split behind LazyMotion,
   all imagery via `next/image`, no client-side data fetching for content,
   dependency additions require justification.
8. **SEO first-class:** every route uses `buildMetadata()`, sitemap/robots are
   generated from the content layer, JSON-LD via `lib/seo`.

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

## Accessibility (WCAG 2.2 AA)

Accessibility is part of the component architecture, enforced by tests —
never a final QA pass.

| Requirement           | Where it is enforced                                                                                                                                        |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Semantic HTML         | Landmarks (`main`/`header`/`nav`/`footer`) in layout + pages; semantic primitives (`SectionHeading`, `TextField`, `Divider`) rather than styled divs        |
| Heading hierarchy     | `SectionHeading` restricted to h1/h2/h3; exactly one `h1` per page (detail heroes use `as="h1"`)                                                            |
| Keyboard navigation   | `SkipLink` is the first tab stop (`#main-content` on every page); native focusable elements only — no div-as-button                                         |
| Focus states          | Global `:focus-visible` ring (tokens) in `globals.css`; never `outline: none`                                                                               |
| Accessible navigation | `<nav aria-label="Primary">`, data-driven from `data/navigation.ts`                                                                                         |
| Accessible links      | All internal links via `ui/Link` (next/link); descriptive text, no "click here" copy rule                                                                   |
| Accessible forms      | `ui/TextField` — programmatic label, `aria-describedby` hint, `aria-invalid` + `role="alert"` errors                                                        |
| Image alt text        | `next/image` makes `alt` mandatory via `ui/Image`; decorative images use `alt=""`                                                                           |
| Reduced motion        | Global `MotionConfig reducedMotion="user"`; CSS motion documented per token                                                                                 |
| Sufficient contrast   | Semantic color tokens checked against 4.5:1 (text) / 3:1 (UI) — current neutral palette passes; any new color must be checked before entering `globals.css` |
| Screen readers        | `lang` from config, landmarks, labelled controls, `sr-only` utilities, JSON-LD for content semantics                                                        |

**Automated gates** (must stay green):

- Playwright: axe scan (`wcag2a`, `wcag2aa`, `wcag22aa`) on key pages —
  zero violations; skip-link keyboard test; single-h1 + landmark assertions.
- Unit: `TextField` label/hint/error association tests.
- ESLint `jsx-a11y` rules (via `eslint-config-next/core-web-vitals`) on every file.

New interactive components must ship with their a11y unit tests in the same PR.

## Responsive Strategy

Mobile-first and composition-driven. Four supported device classes
(mobile / tablet / desktop / large desktop) map to the `--breakpoint-*`
tokens (sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1440).

Rules:

1. **Base styles target mobile.** Breakpoint-prefixed utilities only add
   or change behavior upward (`flex` base, `md:grid md:grid-cols-2`).
2. **Intentional composition, not scaling.** Layouts change arrangement
   across device classes (stack → columns, spacing steps) via composed
   primitives (`Container`, `Section`) — never a desktop layout shrunk
   down.
3. **No viewport hacks.** No raw `px` breakpoints, no `min-width`
   media-query CSS in components, no viewport-unit typography tricks.
   Use breakpoint variants and, when a component must adapt to its own
   box rather than the viewport, Tailwind v4 container queries
   (`@container` + `@md:` variants) — e.g. cards that reflow inside
   grids.
4. **Tokens only.** All widths/spacing come from `--container-*` and
   `--space-*`; breakpoints from `--breakpoint-*` only.

## Animation System

Motion is a system, not page effects. Rules are enforced via the barrel
`src/components/motion/index.ts` — components import animations only from
`@/components/motion`.

- **Boundary:** `MotionProvider` (LazyMotion `domAnimation`, strict; `m.*`
  components only) keeps the animation bundle minimal; server trees stay
  static. Reduced motion is configured once via `MotionConfig
reducedMotion="user"`.
- **Tokens:** durations/easings come from CSS tokens (`--motion-*`,
  `--ease-*`); `components/motion/tokens.ts` mirrors them for Motion's JS
  API and must stay in sync.
- **Primitives:** one per genuine repeated pattern, content-agnostic
  (children + className only). Today: `Reveal` (viewport entrance) — the
  canonical example of the contract. Future candidates, same contract:
  `FadeIn`, `Stagger`, `ImageReveal`, `TextReveal`, `PageTransition`. Do not
  build them preemptively.

## Design Tokens

All design values live as CSS variables in `src/app/globals.css` (Tailwind v4
CSS-first `@theme` layer). Values are refineable placeholders — the design
phase changes them there, and every component updates automatically.

| Namespace        | Purpose          | Consumption in components                   |
| ---------------- | ---------------- | ------------------------------------------- |
| `--font-*`       | font families    | `font-display`, `font-body` utilities       |
| `--text-*`       | type scale       | `text-lg`, `text-3xl`… utilities            |
| `--space-*`      | semantic spacing | `p-(--space-md)`, `gap-(--space-lg)` syntax |
| `--container-*`  | content measures | `max-w-md`, `max-w-prose`… utilities        |
| `--breakpoint-*` | breakpoints      | `md:`, `lg:`… variants                      |
| `--radius-*`     | corner radii     | `rounded-md`, `rounded-full`… utilities     |
| `--shadow-*`     | elevation ladder | `shadow-sm`, `shadow-lg`… utilities         |
| `--motion-*`     | motion durations | `duration-(--motion-normal)` syntax         |
| `--ease-*`       | motion easings   | `ease-entrance`, `ease-standard` utilities  |
| `--z-*`          | stacking layers  | `z-[var(--z-modal)]` syntax                 |

Rules:

- **No raw values in components.** No `px-6` against an invented scale, no
  `duration-300`, no `z-50`. Use the token or add one to `globals.css` first.
- Semantic color tokens (`--background`, `--foreground`, `--muted`,
  `--muted-foreground`, `--accent`, `--border`) are the only allowed colors.
- Motion durations pair with easings; all motion respects
  `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`.

## Folder Structure

The structure below is the agreed target architecture — keep it current.

```
content/                        # Content sources
  work/*.mdx                    # Case studies (tresata, indegene, walmart, software-ag)
  ideas/*.mdx                   # Thought-leadership articles
  speaking/engagements.ts       # Typed TS data (structured, not MDX)
  values/principles.ts          # Typed TS data (structured, not MDX)
docs/                           # Architecture documentation
public/
  images/{profile,work,speaking,editorial}/
  documents/resume.pdf          # Downloadable resume
  icons/
src/
  app/                          # Next.js App Router — routes ONLY (thin)
    layout.tsx  page.tsx  globals.css  sitemap.ts  robots.ts
    about/  values/  speaking/  resume/  contact/
    work/[slug]/                # Case-study index + SSG detail pages
    ideas/[slug]/               # Article index + SSG detail pages
  components/
    layout/                     # Header, Navigation, Footer, Container
    sections/                   # Homepage sections (composed per design phase)
    work/                       # CaseStudyCard, CaseStudyHero, CaseStudySection, ImpactMetrics
    ideas/                      # ArticleCard, ArticleHeader, ArticleContent
    speaking/                   # SpeakingCard, EngagementList
    ui/                         # Button, Link, SectionHeading, Divider, Image
    motion/                     # Animation boundary (client-only, added for LazyMotion)
    analytics/                  # Provider mount point (added for analytics abstraction)
  config/                       # site.ts (identity + routes), navigation.ts, constants.ts
  content/                      # Getter modules — the ONLY import surface for the UI
    getCaseStudies.ts  getArticles.ts  getSpeaking.ts  getValues.ts
    types.ts                    # Zod frontmatter contracts (not imported by UI)
    sources/mdx.ts              # FS adapter (only module that knows content = files)
  data/                         # Static structured data: profile, experience, awards, navigation
  lib/
    seo/                        # metadata.ts, structured-data.ts
    utils/cn.ts                 # Dependency-free class join
    analytics/                  # Provider-agnostic analytics + adapters
  types/                        # Domain types: profile, work, article, speaking, value
tests/
  unit/                         # Vitest (content contracts, utils)
  e2e/                          # Playwright
mdx-components.tsx              # MDX→design-system component mapping
```

## Content Architecture

- **MDX collections** (`content/work`, `content/ideas`): frontmatter validated
  by Zod at load time (invalid content fails the build). Drafts excluded in
  production. Getters: `getCaseStudies()`, `getCaseStudy(slug)`,
  `getArticles()`, `getArticle(slug)`.
- **Typed TS data** (`content/speaking`, `content/values`, `src/data`): fully
  structured content (engagements, values, profile, experience, awards) lives
  as typed modules — no parser needed, type-checked at compile time.
- UI components import getters only — never `fs`, MDX, or data modules.

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
