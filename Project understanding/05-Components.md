# Components

## Work implementation update — 2026-09-11

`WorkQuickLinks` is an isolated server-rendered navigation component. It accepts labels, optional target IDs, and the active chapter ID; unavailable chapters render noninteractive disabled text, not broken links. `ProductizeStory` composes shared SectionIntro and local repeated facts, comparison-table and callout patterns. `EngineerDiagram` uses exact SVG connector exports plus accessible text; `BlueprintDiagram` uses semantic content and the original arrow export. All are Server Components. Existing case-study primitives and URLs are retained.

## Homepage implementation update — 2026-09-10

New shared `SectionIntro` owns eyebrow, optional accent marker, heading and intro copy; `NumberedColumns` owns repeated numbered principle/capability lists. Homepage section components compose existing `Container`, `Section`, `SectionHeading`, `Link`, and `Image` primitives. `FeaturedWork` owns teaser/outcomes/CTA; `SystemDiagram` scales the exact exported geometry within one aspect ratio and exposes a single accessible diagram label. No duplicate button/navigation/image primitive or new client component was introduced. The existing Header and Navigation now use centralized identity/routes and the shared Link primitive.

The remaining sections retain the original audit baseline; this update supersedes conflicting homepage/dependency status below.

Last verified: 2026-09-10.

## Layout components

| Component    | Responsibility                                       | Reuse guidance                                           |
| ------------ | ---------------------------------------------------- | -------------------------------------------------------- |
| `Container`  | Centered 80rem max-width and responsive page gutters | Use for page/section content bounds                      |
| `Section`    | Semantic element with responsive vertical rhythm     | Use for top-level page sections; change `as` when needed |
| `Header`     | Brand link plus primary navigation                   | Preserve as the shared shell header                      |
| `Navigation` | Data-driven primary nav with accessible label        | Extend here if responsive nav behavior is requested      |
| `Footer`     | Copyright and shared footer container                | Add future global footer content here                    |
| `SkipLink`   | First keyboard stop targeting `#main-content`        | Every page main must retain that ID                      |

## UI primitives

| Component        | Contract                                              | Notes                                                          |
| ---------------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| `Button`         | Native button props; `primary` / `secondary` variants | Actions only, not navigation                                   |
| `Link`           | Wraps Next.js Link                                    | Internal navigation; hover underline; external links use `<a>` |
| `Image`          | Wraps Next.js Image; lazy unless `priority`           | Requires Next Image props including alt text                   |
| `SectionHeading` | h1/h2/h3 only                                         | Protects heading hierarchy and shared sizing                   |
| `Divider`        | Semantic `<hr>`                                       | Uses the border color token                                    |
| `TextField`      | Input props plus mandatory label, hint, error         | Owns IDs and accessible descriptions/errors                    |

Prefer these primitives in new features. Some current route and feature files predate
full adoption and still use raw headings, raw Next.js links, or raw spacing utilities;
their existence is not a pattern to multiply.

## Feature components

### Work

- `CaseStudyCard`: linked title and optional summary.
- `CaseStudyHero`: detail-page h1, client/role context, and summary.
- `ImpactMetrics`: semantic `<dl>`; returns nothing for an empty metric array.
- `CaseStudySection`: divider, heading, and long-form section wrapper. It exists but
  the current case-study detail page does not render the MDX body or use this component.

### Ideas

- `ArticleCard`: linked article title and optional summary.
- `ArticleHeader`: detail h1 plus date and optional summary.
- `ArticleContent`: renders raw MDX via `next-mdx-remote/rsc` using global mappings.

### Speaking

- `EngagementList`: async Server Component that calls `getSpeaking()` and composes rows.
- `SpeakingCard`: semantic article with title, venue, machine-readable time, and format.

### Motion and analytics

- `MotionProvider`: application-wide `LazyMotion` and reduced-motion policy.
- `Reveal`: viewport-triggered fade/up entrance, once per element; currently exported
  but not used by any page or component.
- `Analytics`: provider-selection mount point.
- `VercelAdapter`: client adapter that mounts Vercel Analytics and registers custom
  event forwarding.

## MDX component mappings

`mdx-components.tsx` maps anchors to Next.js Link and images to Next.js Image, then
allows passed mappings to override defaults. Headings, paragraphs, lists, code, tables,
and callouts currently render as unstyled native MDX output. Work MDX bodies are loaded
but not rendered; only Idea bodies flow through `ArticleContent`.

## Data contracts consumed by components

- `CaseStudy`: slug, title, date, optional summary/client/role, metrics, draft.
- `Article`: slug, title, date, optional summary, tags, draft.
- `SpeakingEngagement`: title, venue, date, constrained format, optional URL, slug.
- `LeadershipValue`: stable ID, title, description.
- `Profile` and `ExperienceEntry`: executive identity and resume data.

Zod validates rich-content metadata at the source boundary. Presentational components
consume domain types and must not import Zod schemas.

## Reuse decision order

1. Compose an existing layout, UI, feature, or motion component.
2. Add a small variant to an existing primitive when the semantic job is the same.
3. Create a feature-local component for a genuinely repeated or isolated responsibility.
4. Add a shared primitive only after the same pattern appears more than once.

Do not create speculative component families, barrels, or third-party UI layers. The
empty `components/blocks` area is not a requirement to invent blocks before they exist.
