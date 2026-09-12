# Tech Stack

## Homepage implementation update — 2026-09-10

Inter is now loaded through the existing `next/font/google` integration for the branded homepage and shared header; Geist/Geist Mono remain for other content. No dependencies or lockfile versions changed. The copied installation was repaired with pnpm 11.16.0 and a frozen lockfile; its previous tree is recoverable at `/private/tmp/mission-dependencies.AWIKNi/node_modules`. TypeScript, lint, 13 unit tests, and a fresh production build pass. Build emits existing MDX dynamic-filesystem tracing warnings.

The remaining sections retain the original audit baseline; this update supersedes conflicting homepage/dependency status below.

Last verified: 2026-09-10 against the current working tree. This document describes
what is present, including pre-existing uncommitted work; it does not assume `HEAD`
is the complete project state.

## Runtime and application framework

| Area            | Project choice                       | Evidence / role                                                              |
| --------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| Framework       | Next.js 16.3.4                       | App Router under `src/app`; Turbopack build artifacts are present in `.next` |
| UI runtime      | React 19.2.8 / React DOM 19.2.8      | Server Components by default; three explicit client files                    |
| Language        | TypeScript 5.9.3                     | Strict mode, `noUncheckedIndexedAccess`, bundler resolution, no emit         |
| Package manager | pnpm 11.16.0                         | Declared in `package.json`; lockfile v9; single-package workspace            |
| Node target     | ES2017 output with DOM + ESNext libs | Defined in `tsconfig.json`; no explicit Node engine is declared              |

Next.js is configured through `next.config.ts`. The application uses the App Router,
async `params` in dynamic pages, file-based metadata routes, Server Components, and
`generateStaticParams`. These conventions match the bundled Next.js 16 documentation;
future Next.js work must continue to consult `node_modules/next/dist/docs/` because the
repository's `AGENTS.md` explicitly treats this version as having breaking changes.

## Presentation stack

| Area    | Project choice                              | Current use                                                                 |
| ------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| Styling | Tailwind CSS 4.3.3                          | CSS-first `@theme inline` token setup in `src/app/globals.css`              |
| PostCSS | `@tailwindcss/postcss` 4.3.3                | Sole PostCSS plugin                                                         |
| Fonts   | Geist and Geist Mono via `next/font/google` | Self-hosted by Next.js and exposed as CSS variables                         |
| Motion  | `motion` 13.1.1                             | `LazyMotion`, `MotionConfig`, and one `Reveal` primitive                    |
| Images  | `next/image`                                | Wrapped by `src/components/ui/Image.tsx`; MDX has a separate direct mapping |
| Icons   | `lucide-react` 1.38.0                       | Installed but unused in the current source tree                             |

## Content, validation, SEO, and analytics

- MDX support uses `@next/mdx` 16.3.4, `@mdx-js/loader` / `@mdx-js/react`
  3.1.1, `gray-matter` 4.0.3, and `next-mdx-remote` 6.0.0.
- Zod 4.5.4 validates MDX frontmatter and, in the current untracked `src/lib/env.ts`,
  public environment variables.
- Next.js Metadata APIs produce per-route metadata, `sitemap.xml`, and `robots.txt`.
  JSON-LD helpers exist for `Person` and `Article`.
- `@vercel/analytics` 2.0.1 is mounted behind a provider abstraction. The configured
  values are `vercel` and `none`.

The MDX dependencies currently serve two separate mechanisms: `@next/mdx` enables
`.md`/`.mdx` page extensions, while `next-mdx-remote/rsc` renders raw article bodies
loaded from the content repository. No MDX page route exists today.

## Quality toolchain

| Concern              | Tooling                                                                              |
| -------------------- | ------------------------------------------------------------------------------------ |
| Lint                 | ESLint 9.39.5, `eslint-config-next` 16.3.4, TypeScript rules, Prettier compatibility |
| Format               | Prettier 3.9.6 + Tailwind class-order plugin 0.8.1                                   |
| Unit/component tests | Vitest 4.1.11, jsdom 30.0.1, Testing Library                                         |
| E2E/accessibility    | Playwright 1.62.1 and `@axe-core/playwright` 4.13.0                                  |
| Full gate            | `pnpm verify`: typecheck, lint, format check, unit tests, production build           |

## Environment and deployment

- `NEXT_PUBLIC_SITE_URL` controls canonical URLs, metadata, sitemap, and JSON-LD;
  the fallback is `http://localhost:3000`.
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` selects `vercel` or `none`; fallback is `vercel`.
- `PLAYWRIGHT_BASE_URL` optionally points E2E tests at an existing deployment.
- The intended host is Vercel, but there is no `vercel.json`, CI workflow, Dockerfile,
  or other deployment configuration in the repository.
- `.next` contains a successful production build from 2026-09-02 showing Next.js
  16.3.4 and prerendered output. It is evidence, not a fresh verification of the
  current working tree.

## Dependency policy

Use the existing stack first. Do not add or upgrade packages without an explicit need
and approval. In particular, prefer the existing components, platform APIs, Tailwind,
and the small dependency-free `cn` helper before adding UI or utility packages.
