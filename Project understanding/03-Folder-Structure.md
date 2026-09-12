# Folder Structure

## Work implementation update — 2026-09-11

Added `content/work/productize.ts`, `src/lib/content/getProductize.ts`, `src/components/work/{ProductizeStory,WorkQuickLinks,WorkDiagrams}.tsx`, `src/app/work.css`, `public/images/work/productize/`, and `tests/e2e/work.spec.ts`. `src/app/work/page.tsx` composes the new landing story. Existing folders own all additions; no route moves.

## Homepage implementation update — 2026-09-10

New files: `content/home.ts`, `src/lib/content/getHome.ts`, `src/app/home.css`; `components/blocks/{HomeHero,HomePerspective,HomeCredibility,HomeCapabilities,SectionIntro,NumberedColumns}.tsx`; `components/work/{FeaturedWork,SystemDiagram}.tsx`; `tests/e2e/home-responsive.spec.ts`. Exact exported illustrations live in `public/images/home/`. Existing folder ownership and route structure are unchanged; the previously empty blocks folder is now in use.

The remaining sections retain the original audit baseline; this update supersedes conflicting homepage/dependency status below.

Last verified: 2026-09-10 against both tracked files and current untracked files.

```text
Mission 2026/
├── content/                         Authored site content
│   ├── ideas/*.mdx                 Article frontmatter + body
│   ├── work/*.mdx                  Case-study frontmatter + body
│   ├── speaking/engagements.ts     Structured speaking records
│   ├── values/principles.ts        Structured leadership values
│   └── README.md                   Content access rules
├── docs/
│   └── ARCHITECTURE.md             Existing authoritative engineering conventions
├── Project understanding/          Maintained project audit and handoff documents
├── public/
│   ├── documents/resume.pdf        Placeholder downloadable resume
│   ├── images/                     Empty categorized media slots
│   │   ├── editorial/
│   │   ├── profile/
│   │   ├── speaking/
│   │   └── work/
│   ├── icons/                      Empty icon slot
│   └── *.svg                       Create-Next-App starter assets, currently unused
├── src/
│   ├── app/                        App Router pages, shared layout, global CSS, metadata routes
│   ├── components/
│   │   ├── analytics/              Provider mount point
│   │   ├── blocks/                 Reserved and currently empty
│   │   ├── ideas/                  Article list/detail presentation
│   │   ├── layout/                 Page shell and layout primitives
│   │   ├── motion/                 Client-only animation boundary and tokens
│   │   ├── speaking/               Speaking list presentation
│   │   ├── ui/                     General UI primitives
│   │   └── work/                   Case-study presentation
│   ├── config/                     Cross-cutting routes, identity, constants
│   ├── data/                       Typed profile/resume/navigation data
│   ├── lib/
│   │   ├── analytics/              Analytics interface and Vercel adapter
│   │   ├── content/                Repository, registry, getters, schemas, MDX source
│   │   ├── seo/                    Metadata and structured-data factories
│   │   ├── utils/                  Small dependency-free helpers
│   │   └── env.ts                  Untracked environment validation module
│   └── types/                      Domain-only TypeScript contracts
├── tests/
│   ├── e2e/                        Playwright critical journeys and a11y smoke tests
│   └── unit/                       Vitest content/repository/component contracts
├── mdx-components.tsx              Global MDX element mappings
├── next.config.ts                  Next.js and @next/mdx configuration
├── package.json / pnpm-lock.yaml   Scripts and pinned dependency graph
├── playwright.config.ts            Production-build E2E configuration
├── postcss.config.mjs              Tailwind 4 PostCSS hook
├── eslint.config.mjs               Lint and client-boundary enforcement
├── tsconfig.json                   Strict TS and path aliases
└── vitest.config.ts                Unit test environment and alias mirroring
```

## Ownership rules

- `src/app`: routing and composition only; avoid embedding reusable presentation logic.
- `src/components`: rendering behavior; feature components receive content through
  props or, for the server-side `EngagementList`, through a public getter.
- `content` and `src/data`: editable copy/data; UI should normally consume it through
  `src/lib/content` getters.
- `src/types`: stable domain shapes; `src/lib/content/types.ts`: source validation and
  repository contracts.
- `src/config`: identity and cross-cutting constants, not page copy.
- `public`: browser-addressable files. Production media categories already exist and
  should be reused rather than creating new arbitrary asset locations.
- `Project understanding`: update the relevant document whenever a feature changes the
  stack, routes, architecture, components, tokens, motion, assets, or constraints.

## Route-to-file map

The static route folders are `about`, `contact`, `ideas`, `resume`, `speaking`,
`values`, and `work`. `ideas/[slug]` and `work/[slug]` are the only dynamic page
segments. There are no route groups, parallel/intercepting routes, API handlers,
loading files, error files, or project-defined not-found page.

## Empty or scaffold areas

- `src/components/blocks` has only `.gitkeep`; the existing architecture document also
  mentions a future `sections` folder that does not exist.
- All four `public/images` categories and `public/icons` are empty except `.gitkeep`.
- `src/data/experience.ts` and `src/data/awards.ts` export empty arrays.
- Several content records and nearly all page copy are placeholders.
- `.next`, `node_modules`, `tsconfig.tsbuildinfo`, `.DS_Store`, and `test-results` are
  generated/local artifacts, not architectural source.

## Existing working-tree changes

Before this audit, the repository already contained modified tracked files and untracked
content-repository work (`src/lib/content/index.ts`, `registry.ts`, `env.ts`, a repository
test, and `PROJECT_UNDERSTANDING.md`). These belong to the existing workspace state and
must not be overwritten or mistaken for changes made by this documentation audit.
