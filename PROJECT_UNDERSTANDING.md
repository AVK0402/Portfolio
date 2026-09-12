# Project Overview

A **foundation-phase** static marketing/personal site for an executive digital
platform (working title "Executive Platform"). The repository is explicitly
positioned (in `docs/ARCHITECTURE.md` and the README) as the _foundation_ of a
long-term (5–10 year) site: visual design, real copy, and case-study content are
**deliberately not defined yet**. Almost every user-facing page is a structural
placeholder that demonstrates the architecture rather than a finished product.

The goal of this phase is to lock in the architecture (routing, content
abstraction, design tokens, quality gates) so the experience can evolve later
without a rewrite.

> **Evidence:** `README.md`, `docs/ARCHITECTURE.md`, `src/app/page.tsx`
> ("Architecture foundation ready."), pervasive `// TODO: content phase` /
> `// TODO: copy phase` comments, placeholder content in `content/`.

---

# Current Technology Stack

| Concern     | Choice (confirmed in `package.json` / `docs/ARCHITECTURE.md`)                          |
| ----------- | -------------------------------------------------------------------------------------- |
| Framework   | Next.js **16.3.4** (App Router, Turbopack, `next.config.ts`)                           |
| UI runtime  | React **19.2.8** + TypeScript (strict, `noUncheckedIndexedAccess`)                     |
| Styling     | Tailwind CSS **4** (CSS-first `@theme` tokens in `globals.css`)                        |
| Animation   | Motion **13** (`LazyMotion`, isolated to client boundary)                              |
| Content     | MDX (`@next/mdx`, `next-mdx-remote`, `gray-matter`) behind a content abstraction layer |
| Icons       | `lucide-react` (installed, **not yet used** anywhere in `src/`)                        |
| Images      | `next/image` (wrapped by `ui/Image`)                                                   |
| Validation  | Zod **4** (content contracts, env)                                                     |
| Package mgr | pnpm **11.16.0** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`)                             |
| Lint/format | ESLint 9 (`next/core-web-vitals` + TS + custom rules), Prettier 3                      |
| Unit tests  | Vitest 4 + Testing Library (jsdom)                                                     |
| E2E         | Playwright + `@axe-core/playwright`                                                    |
| Analytics   | Provider-agnostic abstraction; Vercel Web Analytics adapter                            |
| Hosting     | Vercel (per docs; no config files present)                                             |

---

# Repository Structure

```
content/                    # Content sources
  work/*.mdx                # Case studies (tresata, walmart, indegene, software-ag)
  ideas/*.mdx               # Thought-leadership articles (example-article)
  speaking/engagements.ts   # Typed TS data (structured, not MDX)
  values/principles.ts      # Typed TS data (structured, not MDX)
  README.md                 # Rules: UI reads content only via lib/content getters
docs/
  ARCHITECTURE.md           # The authoritative architecture + conventions doc
public/
  images/{profile,work,speaking,editorial}/   # empty (.gitkeep)
  documents/resume.pdf      # placeholder PDF (~241 bytes)
  icons/                    # empty (.gitkeep)
  *.svg                     # leftover Create-Next-App assets
src/
  app/                      # App Router — routes only (thin)
    layout.tsx  page.tsx  globals.css  sitemap.ts  robots.ts
    about/  values/  speaking/  resume/  contact/
    work/[slug]/  ideas/[slug]/
  components/
    layout/   # Header, Navigation, Footer, Container(+Section), SkipLink
    ui/       # Button, Link, SectionHeading, Divider, Image, TextField
    work/     # CaseStudyCard, CaseStudyHero, CaseStudySection, ImpactMetrics
    ideas/    # ArticleCard, ArticleHeader, ArticleContent
    speaking/ # EngagementList, SpeakingCard
    motion/   # Reveal, MotionProvider, tokens (client boundary)
    analytics/# Analytics mount point
    blocks/   # EMPTY (.gitkeep only)
  config/     # site.ts, navigation.ts, constants.ts
  data/       # profile.ts, experience.ts, awards.ts, navigation.ts
  lib/
    content/  # registry.ts (extension point) + getters + index.ts (repository) + types.ts + sources/
    seo/      # metadata.ts, structured-data.ts
    analytics/# index.ts (track), providers/vercel.tsx
    utils/cn.ts
    env.ts    # Zod env validation (NEW / untracked)
  types/      # work.ts, article.ts, profile.ts, speaking.ts, value.ts
tests/
  unit/       # content.test.ts, text-field.test.tsx
  e2e/        # smoke.spec.ts, flows.spec.ts
mdx-components.tsx          # MDX → design-system component mapping
next.config.ts  tsconfig.json  eslint.config.mjs  postcss.config.mjs
playwright.config.ts  vitest.config.ts  vitest.setup.ts
```

---

# Application Architecture

- **Routes are thin**: `src/app/*` fetch via `lib/content` getters and compose
  components. Pages do not own presentation or data access at the same time.
- **Server Components by default.** Exactly **three** `"use client"` files exist
  (confirmed by grep): `motion/motion-provider.tsx`, `motion/Reveal.tsx`,
  `lib/analytics/providers/vercel.tsx`. ESLint `no-restricted-imports` enforces
  that `motion/*` and `@vercel/analytics` are only imported inside their
  designated directories.
- **Content abstraction**: `lib/content/registry.ts` is the single additive
  extension point for rich-content collections (`MdxCollectionId`/`CollectionMeta`
  derive from it — adding a collection is one registry entry, no restructuring);
  `types.ts` defines Zod contracts and the `ContentSource` interface;
  `index.ts` is the **content repository** (delegation point selecting the active
  source); `sources/mdx.ts` is the concrete MDX adapter (only module that knows
  content = files on disk); getters are the only import surface the UI uses. A
  future CMS adapter implements the same `ContentSource` interface and is
  swapped in `index.ts`.
- **Static generation**: all routes are static or SSG
  (`generateStaticParams` for `/work/[slug]`, `/ideas/[slug]`). No runtime data
  fetching.
- **Design tokens are semantic** (CSS variables in `globals.css`); components
  consume tokens, never raw values.
- **SEO**: `buildMetadata()` per route, generated `sitemap.ts`/`robots.ts` from
  the content layer, JSON-LD via `lib/seo`.
- **Analytics abstracted**: call sites use `track()` / `<Analytics/>`; provider

---

# Product Understanding

**Facts from the repo** (naming, content, config):

- It is a personal/executive site for a design executive (`siteConfig.author`:
  "VP Design / Chief Design Officer"; `data/profile.ts` role: same).
- Content collections imply the core domains: **Work** (case studies /
  transformations), **Ideas** (thought-leadership articles), **Speaking**
  (engagements), **Values** (leadership principles), plus **About**, **Resume**
  (with downloadable PDF), and **Contact**.
- Case-study content references real organizations (tresata, walmart, indegene,
  software-ag) as placeholder filenames — the actual identity is TBD.

**Assumptions (not stated in repo):**

- The primary user is a _visitor/recruiter/client_ evaluating the executive
  (portfolio + credibility), not an authenticated end-user — there is no auth,
  no accounts, no dynamic personalization.
- The primary user goals are: learn about the person, review past work/case
  studies, read articles, view speaking history, and contact them / download a
  resume.
- This is a **content/marketing site**, not an application with business logic.

---

# User & Core Workflows

Inferred core journeys (some already covered by E2E tests in `tests/e2e/flows.spec.ts`):

1. **Home → Work → Case study detail** (tested): browse transformation stories,
   read metrics/body.
2. **Home → Ideas → Article detail** (tested): read thought-leadership articles
   (MDX body renders).
3. **Resume**: view page + download PDF (tested).
4. **Contact**: reach the contact page (tested; mechanics not built).
5. **About / Values / Speaking**: informational pages (reachable via primary
   nav, tested for reachability).

---

# Current UX/UI Foundation

- **Layout system**: `Container` (max-width `--container-lg`, token-stepped
  horizontal padding) + `Section` (vertical rhythm, `py-(--space-2xl)` →
  `md:py-(--space-3xl)`). Root layout uses a flex-column body with `Header`,
  `Footer`, `SkipLink`, `MotionProvider`, `Analytics`.
- **Responsive**: mobile-first; base styles target mobile, breakpoint variants
  add upward (`--breakpoint-sm/md/lg/xl/2xl`). Docs forbid raw-px breakpoints
  and viewport-unit hacks.
- **Design tokens** (`globals.css`): typography (`--font-*`, `--text-*`),
  spacing (`--space-*`, 4px grid), containers, breakpoints, radius, shadows,
  motion (`--motion-*`, `--ease-*`), z-index, and a semantic color set
  (`--background/foreground/muted/muted-foreground/accent/border`) with a
  `prefers-color-scheme: dark` variant.
- **Typography**: Geist + Geist Mono via `next/font`; `font-display/body/mono`
  tokens.
- **Components**: layout, UI primitives (Button, Link, SectionHeading, Divider,
  Image, TextField), and feature components (work/ideas/speaking).
- **States/interaction**: minimal — link hover underline, Button variants,
  `TextField` label/hint/error; `Reveal` entrance animation.
- **Forms**: only the `TextField` primitive exists (accessible); **no actual
  form is built** (Contact is a heading placeholder).
- **Accessibility (WCAG 2.2 AA)**: skip link (first tab stop), single `h1` per
  page, semantic landmarks, global `:focus-visible` ring, `lang` from config,
  `MotionConfig reducedMotion="user"`, axe E2E gates, accessible `TextField`.
  Docs also state a contrast requirement for any new color.
- **Assessment**: This is a **token/architecture foundation, not a finished
  design system**. There is no visual design language yet (flat, neutral
  placeholders), no real homepage, and no `sections/` directory. The UI is being
  built _primitive-by-primitive_, not screen-by-screen, and pages are mostly
  placeholder headings.
  swap touches only `lib/analytics`.

---

# Existing Components

**Layout:** `Header`, `Navigation` (data-driven from `data/navigation.ts`),
`Footer`, `Container` (+ `Section`), `SkipLink`.

**UI primitives:** `Button`, `Link`, `SectionHeading` (h1/h2/h3),
`Divider`, `Image` (wraps `next/image`, lazy-by-default, `priority` prop),
`TextField` (accessible label/hint/error).

**Work:** `CaseStudyCard`, `CaseStudyHero` (single h1), `CaseStudySection`,
`ImpactMetrics` (dl grid).

**Ideas:** `ArticleCard`, `ArticleHeader`, `ArticleContent` (renders MDX via
`next-mdx-remote` + global `mdx-components.tsx` mapping).

**Speaking:** `EngagementList` (server component, fetches via getter),
`SpeakingCard`.

**Motion:** `MotionProvider` (LazyMotion + reduced-motion), `Reveal`
(content-agnostic entrance), `tokens.ts` (mirrors CSS motion tokens).

**Analytics:** `Analytics` mount point, `lib/analytics` (`track()`,
`AnalyticsProvider` interface), `providers/vercel.tsx`.

---

# Routing & Navigation

**Routes** (from `config/navigation.ts`, all exist as pages):
`/` (home), `/about`, `/work`, `/work/[slug]`, `/values`, `/speaking`, `/ideas`,
`/ideas/[slug]`, `/resume`, `/contact`.

- **Primary nav** (`data/navigation.ts`): About, Work, Values, Speaking, Ideas,
  Resume, Contact (7 items; home is the brand link in `Header`).
- **Dynamic routes** are SSG with `generateStaticParams` and `notFound()` for
  missing slugs.
- **Metadata**: `buildMetadata()` per page; `sitemap.ts` generated from content;
  `robots.ts` points to sitemap.
- **Nav model**: simple top-level header nav; **no mobile menu exists yet**
  (Header doc-comment says interactivity is added "only when the design phase
  requires it"). `aria-label="Primary"` nav.

---

# Data & Integrations

- **Content sources**:
  - MDX collections: `content/work` (case studies), `content/ideas` (articles).
  - Typed TS data: `content/speaking/engagements.ts`, `content/values/principles.ts`.
  - Static TS data: `src/data/profile.ts`, `experience.ts`, `awards.ts`,
    `navigation.ts`.
- **Content contracts**: Zod (`caseStudySchema`, `articleSchema`) validated at
  load time; invalid content fails the build; drafts excluded in production.
- **No backend/API/database.** All content is read at build time (SSG). No
  client-side data fetching.
- **Analytics**: Vercel Web Analytics (cookie-less) via `@vercel/analytics`,
  abstracted behind `lib/analytics`.
- **SEO**: JSON-LD `Person` and `Article` factories in `lib/seo`.

---

# Configuration

- **`next.config.ts`**: MDX pipeline (`@next/mdx`), `pageExtensions` includes
  `mdx`/`md`.
- **`tsconfig.json`**: strict, `noUncheckedIndexedAccess`, path aliases `@/*`
  (src), `@content/*`, `@mdx-components`.
- **`eslint.config.mjs`**: next core-web-vitals + TS + prettier; custom
  `no-restricted-imports` enforcing client boundaries; global ignores.
- **`vitest.config.ts` / `playwright.config.ts`**: unit (jsdom) and E2E
  (production build) configs; aliases mirrored.
- **`postcss.config.mjs`**: `@tailwindcss/postcss`.
- **`.prettierrc.json`**: semi, double quotes, trailingComma all, printWidth 88,
  `prettier-plugin-tailwindcss`.
- **`pnpm-workspace.yaml`**: single package.

**Environment variables** (`.env.example`; validated by `lib/env.ts`):

- `NEXT_PUBLIC_SITE_URL` (default `http://localhost:3000`)
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` (`vercel` | `none`, default `vercel`)
- `PLAYWRIGHT_BASE_URL` (E2E, via `playwright.config.ts`)

**Build/deploy**: `pnpm dev/build/start/lint/typecheck/test/test:e2e/verify`
(`verify` = typecheck + lint + format:check + unit tests + build). Hosting is
Vercel per docs; no Vercel/CI config files are present in the repo.
---

# Stable Foundation

Confirmed solid / intentional and likely to persist:

- Next.js 16 App Router + React 19 + strict TypeScript + Tailwind 4 stack.
- **Content abstraction layer** (getters → content repository `index.ts` →
  `sources/mdx.ts` adapter, driven by the `registry.ts` extension point) — a
  clean seam for a future CMS because content is never read by the UI directly,
  adding a rich-content collection is one registry entry, and swapping storage
  touches only `index.ts`.
- **Design token layer** (typography, spacing, containers, breakpoints, radius,
  shadows, motion, z-index, semantic colors + dark mode) — the single source of
  truth for visual values.
- **Server-first architecture** with lint-enforced client boundaries (motion,
  analytics only).
- **Static generation everywhere** — performance-friendly, no runtime data fetch.
- **Accessibility-first** primitives (`TextField`, `SectionHeading`, `SkipLink`,
  focus ring, reduced motion) with axe + unit gates.
- **Quality gates**: `pnpm verify`, Playwright E2E, Vitest unit tests,
  ESLint/Prettier.
- **SEO foundation**: metadata factory, generated sitemap/robots, JSON-LD.
- **Well-documented conventions** in `docs/ARCHITECTURE.md`.

---

# Work In Progress

- **All real content is placeholder** (`// TODO: content phase` / `copy phase`);
  only `tresata` case study and `example-article` are non-draft; the rest of the
  MDX is `draft: true`.
- **Homepage** is a placeholder ("Architecture foundation ready.") composed of
  Work/Ideas sections; no hero, no real `sections/` composition.
- **About / Contact / Resume / Values / Speaking** pages are mostly single
  headings; Resume shows counts only.
- **`lib/env.ts`** is a new, **untracked** file (present on disk, not in git).
- **Contact mechanics** (form, mailto, endpoint) explicitly deferred.
- **Mobile navigation** not implemented (desktop-only header nav).
- **`src/components/blocks/`** is empty (`.gitkeep`); docs reference a
  `sections/` dir that does not exist yet.

---

# Temporary / Experimental Areas

- **Create-Next-App leftovers**: `public/*.svg` (file/globe/next/vercel/window),
  the stock README "Getting Started / Learn More / Deploy on Vercel" sections,
  and the Geist font default. These are scaffolding, not product.
- **Placeholder resume PDF** (`public/documents/resume.pdf`, ~241 bytes) — a
  stub for the E2E download test.
- **`next-mdx-remote` + `@next/mdx`** both present: two MDX pipelines coexist
  (`@next/mdx` for page compilation, `next-mdx-remote` for rendering article
  bodies via `ArticleContent`). Worth confirming the intended split.
- **`lucide-react`** installed but unused — dependency is present but has no
  consumers yet.
- **Docs/code drift (partial)**: `docs/ARCHITECTURE.md` references
  `src/lib/content/index.ts` as the delegation point. This file now **exists**
  (the content repository selecting the active `ContentSource`) and the
  folder tree was updated; the docs also list `sections/` in the folder tree
  (not present).

---

# Missing Foundation

- **Visual design language / real design system**: no color/typography "look",
  no component states (hover/active/focus variants beyond basics), no design
  phase applied. Tokens exist; the _aesthetic_ does not.
- **Homepage sections** (`src/components/sections/`) — referenced but not built.
- **Real content/copy** for all collections and the profile/identity.
- **Contact form / mechanism**.
- **Mobile/tablet navigation** (responsive menu).
- **Image assets** — all `public/images/*` dirs are empty; no real imagery.
- **Component states & variants** (loading, empty, disabled, error for more
  than TextField) and **icon usage** (lucide unused).
- **Server-only env handling** (docs note secrets must not be `NEXT_PUBLIC_*`;
  no server-only module exists yet).
- **CI / deployment config** (no GitHub Actions / vercel config in repo).
- **404 / error pages** (only Next default; `_not-found` present in build output
  but no custom page).
- **Case-study body rendering** — `work/[slug]` has a comment "Case study body
  sections render here in the content phase" but no body renderer yet (unlike
  articles).

---

# Risks & Technical Debt

1. **Docs/code drift (partial)** — `docs/ARCHITECTURE.md` referenced a
   `lib/content/index.ts` that previously did not exist; it now does (the
   content repository) and the doc was updated. The `sections/` folder listed
   in docs is still absent.
2. **Magic-value inconsistencies**: several pages/components use raw values
   (`mt-10`, `gap-10`, `px-5`, `py-2.5`, `py-6`, `py-10`, `gap-6`) that
   contradict the "tokens only / no magic values" rule (e.g. `values`, `work`,
   `ideas`, `speaking` pages use `mt-10`/`gap-10`; `Button` uses `px-5 py-2.5`;
   `Header`/`Footer`/`Navigation` use `py-6`/`py-10`/`gap-6`). `TextField` also
   uses a raw `border-red-600` color that is not a semantic token. This is
   minor now but will compound as the design phase lands.
3. **Duplicate page scaffolding**: every index page repeats the same
   `<h1 className="text-4xl ...">` + `mt-10 flex flex-col gap-10` pattern
   instead of using `SectionHeading`/`Container` consistently — a candidate for
   a shared list-page primitive.
4. **Two MDX pipelines** coexist; if not intentional, it's redundant surface.
5. **Unused dependency** (`lucide-react`) — harmless but against the
   "documented purpose for every dependency" rule.
6. **Hardcoded identity placeholders** ("Full Name", "VP Design / Chief Design
   Officer") — the site is not launchable until these are defined; they are
   centralized (good) but unset.
7. **`Section`/`Container` are in `components/layout/`** while docs describe
   them as primitives — minor naming/placement ambiguity vs. `components/ui/`.
8. **Button uses raw padding** and has no `size`/`as` support; `SectionHeading`
   and `Button` overlap in heading styling (duplicated `text-4xl font-semibold
tracking-tight` string across pages and `SectionHeading`).
9. **`env.ts` is untracked** — if it's meant to be part of the foundation it
   should be committed (currently only on disk).
10. **No `not-found`/error boundaries** — fragile UX for unknown slugs beyond
    `notFound()` in dynamic routes (which is handled).

---

# Assumptions

- The site is a **public, static, content-driven personal/executive site** — no
  auth, accounts, or dynamic personalization is planned.
- The executive is a **design leader** (role "VP Design / Chief Design Officer").
- Vercel is the intended host (from docs); no repo config confirms it.
- The two MDX pipelines (`@next/mdx` for page compilation, `next-mdx-remote`
  for body rendering) are **assumed intentional** but unverified.
- `lucide-react` is **assumed intended** for the design phase (icons), currently
  unused.
- Content will eventually migrate to a headless CMS via the content abstraction
  (per docs), so the MDX files are a temporary-but-supported format.
- The visual design phase will **change token values only**, not component
  structure (per architecture).

---

# Recommended Next Foundation Steps

> These are _observations_, not changes — nothing was modified. Prioritize
> before building features.

1. **Decide the identity/content**: define the real name/role/bio, and decide
   whether to fill content now or keep placeholders. Everything downstream
   (About, Resume, home hero, SEO, JSON-LD) depends on this.
2. **Reconcile docs vs. code**: either create `lib/content/index.ts` (the
   documented delegation point) or update `docs/ARCHITECTURE.md`, and decide
   whether to add the documented `components/sections/` directory.
3. **Commit `lib/env.ts`** if it's part of the foundation (currently untracked).
4. **Enforce the token rule consistently**: replace raw `mt-10`/`gap-10`/`px-5`
   /`py-2.5`/`py-6`/`py-10`/`gap-6` and the raw `border-red-600` in `TextField`
   with semantic tokens before the design phase multiplies them.
5. **Introduce a shared list-page primitive** to dedupe the repeated
   index-page scaffolding (heading + `mt-10 flex flex-col gap-10`).
6. **Clarify the MDX pipeline split** (`@next/mdx` vs `next-mdx-remote`) and
   remove or document the redundancy.
7. **Build the homepage `sections/`** once the design phase begins; the
   architecture is ready for it.
8. **Plan the mobile navigation** and **contact mechanism** (form vs. mailto)
   as the next user-facing features.
9. **Add custom `not-found` / error boundaries** before launch.
10. **Only then** begin the visual design phase (change token values in
    `globals.css`), since component structure is already token-driven.
