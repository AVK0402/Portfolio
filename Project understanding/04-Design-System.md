# Design System

## Work case-study header — 2026-09-12

Figma 13:259 uses existing Inter, brand navy, secondary text, paper background, and
divider tokens. The desktop title is 28px/65px at weight 600; the uppercase eyebrow
is 14px/20px at weight 500. New Work tokens centralize the 119px header height,
45px story offset, and 28px title size. The sticky offset is derived from these and
the existing site-header height. Copy lives in `content/work/productize.ts`.
Mobile uses the existing 24px type token and natural wrapping; the supplied frame
only specifies desktop. No new graphics or animations are required.

## Work implementation update — 2026-09-11

Work uses Figma `163:319` (1440 × 6339). Reuses Inter, navy/purple/gray/paper tokens, 55/67px headings, SectionIntro, Image, Link, SectionHeading, Section and Container. Added only Work shell/layout/fact tokens to `globals.css`: 72px header, 112px sticky offset, 1007px story column, 31px sidebar gap, 22px facts, and 155px chapter spacing. Work-scoped CSS hides the header subtitle/footer and marks Work in navigation, without changing Home/detail routes. Original exported SVG connectors and PNG product screen are local; no redrawn paths or stock imagery. The desktop section/callout/screenshot positions and total height match Figma. Minor 1–2px callout-width allowances preserve Figma wrapping with the bundled Inter glyph metrics. Below the existing xl breakpoint, Quick Links forms a sticky wrapping row; content/table/diagrams adapt using existing sm/lg breakpoints.

## Homepage implementation update — 2026-09-10

Figma file `V817xNNWNd29akCHsBjVY4`, node `146:3` (1440 × 4027) is the homepage visual reference. The neutral baseline below still applies outside the branded homepage/shared header. `globals.css` extends the existing Tailwind theme with semantic `--color-brand-*`, type, line-height, weight, spacing, container and CTA tokens; `home.css` consumes them. Brand: navy #00184c, pale surface #eff3f9, gray #61676b, purple #a326d5, white, divider #dbdbdb. Inter desktop headings are 75/91, 55/67, and 40/65px. Desktop content is 1135px wide; header 1212px. Existing 640/768/1024/1280/1440 breakpoints remain; no mobile Figma frame was supplied, so mobile uses authorized content-led wrapping/stacking. Exact Figma SVG/PNG assets are committed locally; no stock art or generated vectors. Home stays light under system dark mode; other routes retain their existing theme. One-off illustration coordinates stay local to the illustration styles.

The remaining sections retain the original audit baseline; this update supersedes conflicting homepage/dependency status below.

Last verified: 2026-09-10. The current system is an architectural foundation with a
neutral placeholder aesthetic, not a finished brand language.

## Visual character

The rendered intent is restrained and editorial: black/near-black text, white or
near-black backgrounds, neutral muted text, light borders, minimal elevation, rounded
controls, and generous whitespace. There are no production illustrations, photography,
brand colors, decorative textures, or icon usage yet. Dark mode follows the operating
system through `prefers-color-scheme`.

## Typography

- Display and body: Geist Sans through `next/font/google`.
- Monospace: Geist Mono.
- Root body size is the browser default `1rem`; body family is `--font-body`.
- Scale: 12, 14, 16, 18, 20, 24, 32, 40, 52, and 64px equivalents.
- Current heading pattern: semibold with tight tracking for h1/h2; h3 is semibold.
- `SectionHeading` maps h1/h2/h3 to 40/24/20px respectively.

The type tokens are ready to change centrally, but the current UI uses only a subset.
Long-form article body typography has no dedicated prose styles yet.

## Color system

| Semantic role    | Light     | Dark      | Intended use                    |
| ---------------- | --------- | --------- | ------------------------------- |
| Background       | `#ffffff` | `#0a0a0a` | Page and surface background     |
| Foreground       | `#171717` | `#ededed` | Primary text and filled actions |
| Muted            | `#f5f5f5` | `#1a1a1a` | Quiet surfaces                  |
| Muted foreground | `#737373` | `#a3a3a3` | Secondary copy and metadata     |
| Accent           | `#171717` | `#ededed` | Focus outline / emphasis        |
| Border           | `#e5e5e5` | `#262626` | Rules and outlined controls     |

These semantic variables are surfaced as Tailwind color utilities. New colors should
be added semantically and contrast-checked. One current exception is `border-red-600`
in `TextField` error state, which bypasses the semantic palette and needs design-system
resolution when form visuals are developed.

## Spacing and layout

- Spacing follows a 4px base grid: 4, 8, 12, 16, 24, 32, 48, 64, and 96px.
- `Container` centers content at a maximum of 80rem, with responsive inline padding:
  24px base, 32px from 640px, and 48px from 1024px.
- `Section` uses 64px vertical padding, increasing to 96px at 768px.
- Content widths are defined for prose (44rem), narrow (48rem), standard (64rem),
  wide (80rem), and maximum (90rem), although only the wide container is in active use.
- Homepage lists switch from source-order block flow to two columns at 768px; Work
  becomes three columns at 1024px. Impact metrics become three columns at 640px.

The intended policy is token-only spacing. Current code contains legacy/raw Tailwind
steps such as `py-10`, `gap-6`, `gap-8`, `mt-10`, `px-5`, and `py-2.5`; do not copy
those into new work. Prefer the documented CSS variables when touching nearby code.

## Responsive rules

The token breakpoints are 640, 768, 1024, 1280, and 1440px. The architecture is
mobile-first: base styles target the smallest viewport and breakpoint variants add
larger compositions. Avoid custom pixel media queries, viewport-unit typography, and
desktop layouts merely scaled down.

The current primary navigation is a single seven-item flex row with no wrap, collapse,
or mobile menu. It is therefore the most important existing responsive limitation.

## Shape, elevation, and layering

- Radius scale: 0, 4, 8, 12, 16px, and pill/full.
- Shadow scale: xs through lg, deliberately low opacity; none is currently prominent.
- Named z-index layers: base 0, dropdown 100, sticky 200, overlay 300, modal 400,
  toast 500.
- The default aesthetic is flat. Do not introduce strong shadows, glass effects, or
  arbitrary radii without an explicit design direction.

## Interaction states and accessibility

- A global 2px accent `:focus-visible` outline with 2px offset applies everywhere.
- Internal `ui/Link` adds underline on hover; several components still use raw
  `next/link` and therefore do not receive this behavior.
- Button variants are filled primary and outlined secondary, with no explicit hover,
  active, disabled, or transition styling yet.
- `TextField` provides visible labels, linked hints, `aria-invalid`, and live error
  announcements.
- The shell provides a keyboard skip link, language, main/nav/header/footer landmarks,
  and one-h1 conventions.

Preserve native semantics, keyboard operability, reduced-motion support, descriptive
links, required image alt text, and WCAG 2.2 AA intent in all additions.

## Assets

The site currently has no production imagery or icons. The image component wraps
`next/image`, is lazy by default, and exposes `priority` for above-the-fold assets.
MDX image rendering directly uses `next/image` with fallback dimensions 1200×630.
The favicon is the only active branded-format asset, though it appears to be starter
material. Root SVG files and the 241-byte resume PDF are placeholders.
