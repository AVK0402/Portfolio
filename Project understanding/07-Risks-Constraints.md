# Risks and Constraints

## Work implementation update — 2026-09-11

Only Productize content was supplied. Per user clarification, this is one continuous story; Transform, Intent and What’s Next are visible but inactive, without invented targets or empty sections. The product screenshot's pagination dots are static Figma artwork, not a working carousel. Existing case-study URLs remain, although `/work` now presents the story instead of the previous list.

Work's Figma `01` chapter label uses #dbdbdb on white (1.38:1 contrast versus the required 3:1). An axe scan found this single Work-page contrast issue; the exact supplied color is preserved, not silently darkened. The existing homepage contrast failure also remains. No other Work WCAG 2.2 AA violations were reported by that scan. Build, lint, type checks, 13 unit tests and all seven Work browser tests pass; the full browser suite passes 19/20, with only the known homepage contrast failure. Existing MDX dynamic-filesystem tracing and Vitest configuration warnings remain out of scope. Responsive behavior is an implementation adaptation using existing breakpoints because the source contains no mobile frame.

## Homepage implementation update — 2026-09-10

Resolved since baseline: dependencies repaired with frozen lockfile, brand identity/home copy and illustrations implemented, navigation now wraps and references centralized routes. Production build, typecheck, lint and 13 unit tests pass. At 320/375/768/1440px, visual checks found no horizontal overflow or missing images. Figma's #bdbdbd numbered labels have 1.87:1 contrast on white; axe requires 3:1 for this bold 20px text. The supplied color is intentionally preserved; the accessibility test remains enabled and reports this design conflict (six labels). No mobile frame, dark variant, or homepage motion specification was provided. Contact/About, resume PDF, underlying work/article content and production URL remain baseline launch constraints. Existing MDX filesystem tracing warnings remain out of this change's scope.

The remaining sections retain the original audit baseline; this update supersedes conflicting homepage/dependency status below.

Last verified: 2026-09-10. Items are ordered roughly by impact on the next implementation.

## Immediate constraints

1. **The current dependency installation is not safely runnable in this workspace.**
   `node_modules/.bin` shims embed the old path `/Users/arun.kajagar/Desktop/Website`,
   the installed package tree is incomplete for direct Next.js execution, and the
   available pnpm is 11.19.0 while the project declares 11.16.0. Running `pnpm dev`
   proposed deleting and reinstalling `node_modules`, so the audit stopped rather than
   mutate dependencies. A clean install with the declared pnpm version is required
   before fresh build/test/visual verification.
2. **The working tree was already dirty.** Modified and untracked content-architecture
   files predate this audit. Preserve them and review their ownership before commits.
3. **The product is intentionally incomplete.** Identity, copy, imagery, career data,
   contact mechanics, most case-study bodies, and branded design are placeholders.
   Product decisions cannot be inferred from scaffolding alone.

## Responsive and accessibility risks

- Seven primary navigation links are forced into a non-wrapping horizontal row with no
  mobile alternative. Small screens are likely to overflow.
- Automated axe coverage runs only on Home; other route-specific states are not scanned.
- There is no custom not-found experience and no route loading/error UI.
- Button state design is incomplete. New forms or menus will need hover, pressed,
  disabled, loading, validation, focus, and reduced-motion behavior.
- The architecture requires semantic color tokens, but the TextField error border uses
  raw red. Its dark-mode contrast and semantic pairing are not centrally governed.

## Architecture and implementation drift

- Existing docs claim exactly two client boundaries, but source currently has three:
  provider, Reveal, and analytics adapter.
- Existing docs state all visual values are tokens, while multiple components/pages use
  raw Tailwind scale values. Treat the token strategy as the direction, not a fully
  enforced invariant.
- `data/navigation.ts` hardcodes route strings instead of deriving them from
  `config/navigation.ts`, despite route-centralization guidance.
- Several internal links use `next/link` directly instead of `ui/Link`; shared hover or
  future link behavior is therefore inconsistent.
- `mdx-components.tsx` maps directly to Next Link/Image, bypassing local UI wrappers.
- `src/lib/env.ts` validates public environment variables but is not imported by
  `siteConfig`, so current runtime configuration still uses unchecked casts/defaults.
- `docs/ARCHITECTURE.md` describes a `components/sections` directory that does not exist.
- README retains Create-Next-App wording and points to `app/page.tsx` instead of
  `src/app/page.tsx`.

Resolve drift locally when a requested feature touches it; avoid a broad cleanup/refactor
without approval.

## Content and rendering risks

- Work MDX bodies are read and returned but never rendered by the case-study detail page.
- Article MDX has only anchor/image mappings; prose hierarchy, code, lists, tables, and
  media lack a long-form design system.
- Frontmatter dates are checked only as non-empty strings, not valid ISO dates. Sorting
  relies on lexicographic order and sitemap construction calls `new Date(meta.date)`.
- Draft filtering differs by environment: drafts appear in development/test and are
  excluded only in production. Tests and local content counts may differ from launch.
- The filesystem adapter uses synchronous dynamic reads and produces a documented
  Turbopack whole-project tracing warning.
- Both `@next/mdx` and `next-mdx-remote` are installed. Their split is explainable today,
  but `@next/mdx` may be unnecessary unless MDX routes/components are planned.

## Assets, SEO, and deployment risks

- The downloadable PDF is a 241-byte placeholder and must be replaced before launch.
- Image/icon folders contain no production media; starter SVGs and favicon may be
  accidental scaffolding.
- Default name, author, metadata description, canonical URL, and content dates are not
  launch-ready. A missing `NEXT_PUBLIC_SITE_URL` would publish localhost canonicals.
- `personJsonLd()` is not mounted as a standalone profile schema.
- There is no committed CI or deployment configuration; “Vercel” is documented intent,
  not repository-enforced infrastructure.
- No security headers, CSP, form abuse controls, or backend validation exist because no
  data-submitting feature exists yet. Add them with the first relevant feature.

## Performance and verification risks

- The 2026-09-02 build diagnostics report roughly 578–593KB uncompressed first-load JS
  per route. The documented budget is gzipped, so this is not a direct violation, but it
  warrants a fresh measured bundle review after dependencies are repaired.
- `MotionProvider` and Analytics mount globally even though Reveal and custom tracking
  have no visible call sites; measure before optimizing or removing them.
- The existing `.next` build predates current working-tree changes and cannot certify
  them. No fresh typecheck, lint, unit, E2E, or production build was performed during
  this audit because repairing dependencies would be a material workspace mutation.

## Non-negotiable constraints for future work

- Consult bundled Next.js 16 docs before Next.js code changes.
- Preserve Server Components by default, thin routes, typed content boundaries, semantic
  HTML, keyboard behavior, reduced motion, and mobile-first composition.
- Reuse components/tokens; add no package, upgrade, broad refactor, or CMS migration
  without explicit need and approval.
- Never remove working behavior or overwrite pre-existing uncommitted changes.
- Update the corresponding file in `Project understanding` as part of any architectural,
  design-system, route, component, interaction, asset, content, or deployment change.
