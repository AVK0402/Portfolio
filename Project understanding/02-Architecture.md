# Architecture

## Work implementation update — 2026-09-11

Work is now the continuous Productize story from Figma `163:319`, replacing the old `/work` list. `content/work/productize.ts` → `getProductize()` → `ProductizeStory` follows the existing typed file-backed content pattern. All `/work/[slug]` routes and MDX content remain unchanged. Main navigation and the homepage case CTA already point to `/work`. No new client boundary or dependency was needed.

## Homepage implementation update — 2026-09-10

Home is now a Server Component composition of Hero, Perspective, Credibility, Capabilities, and Featured Work, not the baseline placeholder below. Data flows from `content/home.ts` through `src/lib/content/getHome.ts` into typed presentation props. No routes, state libraries, client boundaries, or repositories were added. Shared navigation is Work → `/work`, Thinking → `/ideas`, About → `/about`; homepage CTAs use `/contact` and `/work`. All existing routes remain. The shared footer is hidden only on Home to match the selected frame.

The remaining sections retain the original audit baseline; this update supersedes conflicting homepage/dependency status below.

Last verified: 2026-09-10 against the current working tree.

## Product shape

This is a foundation-stage executive portfolio and thought-leadership website, not an
authenticated application. Its likely visitor journeys are to review work, read ideas,
understand leadership values and speaking history, download a resume, and make contact.
Most copy, media, and detailed page compositions are intentionally placeholders.

## Runtime composition

`src/app/layout.tsx` supplies the shared document shell:

1. Geist font variables and global styles are attached to the document.
2. `MotionProvider` configures lazy motion features and user reduced-motion behavior.
3. `SkipLink`, `Header`, route content, and `Footer` form the visible page shell.
4. `Analytics` mounts outside the motion provider.

Pages are Server Components unless browser behavior requires a client boundary. The
three explicit client files are:

- `src/components/motion/motion-provider.tsx`
- `src/components/motion/Reveal.tsx`
- `src/lib/analytics/providers/vercel.tsx`

ESLint restricts direct imports from Motion and Vercel Analytics to their designated
directories. This keeps provider-specific client code out of route modules.

## Route architecture

| URL             | Source                          | Rendering / content                                         |
| --------------- | ------------------------------- | ----------------------------------------------------------- |
| `/`             | `src/app/page.tsx`              | Static homepage placeholder; lists published work and ideas |
| `/about`        | `src/app/about/page.tsx`        | Static heading placeholder                                  |
| `/work`         | `src/app/work/page.tsx`         | Static list from `getCaseStudies()`                         |
| `/work/[slug]`  | `src/app/work/[slug]/page.tsx`  | Generated params, metadata, 404 guard, hero and metrics     |
| `/values`       | `src/app/values/page.tsx`       | Typed leadership principles                                 |
| `/speaking`     | `src/app/speaking/page.tsx`     | Typed speaking engagements through `EngagementList`         |
| `/ideas`        | `src/app/ideas/page.tsx`        | Static list from `getArticles()`                            |
| `/ideas/[slug]` | `src/app/ideas/[slug]/page.tsx` | Generated params, metadata, JSON-LD, rendered MDX body      |
| `/resume`       | `src/app/resume/page.tsx`       | Counts structured data and links the PDF asset              |
| `/contact`      | `src/app/contact/page.tsx`      | Static heading placeholder                                  |
| `/robots.txt`   | `src/app/robots.ts`             | Generated metadata route                                    |
| `/sitemap.xml`  | `src/app/sitemap.ts`            | Static routes plus published work/article URLs              |

The latest build artifact prerendered all top-level pages plus
`/work/tresata` and `/ideas/example-article`. Dynamic paths remain blocking-capable
for slugs not in that artifact, and both detail pages call `notFound()` for misses.

## Content and data flow

Rich content follows this dependency direction:

```text
content/{work,ideas}/*.mdx
        ↓ gray-matter + Zod
src/lib/content/sources/mdx.ts
        ↓ ContentSource contract
src/lib/content/index.ts (active repository/source selection)
        ↓ collection-specific getters
route Server Components
        ↓ typed props
presentational components
```

`src/lib/content/registry.ts` registers the `work` and `ideas` collections and maps
each collection to its Zod schema. `sources/mdx.ts` is the only module that performs
filesystem reads. Drafts are omitted only when `NODE_ENV === "production"`; content
is sorted newest first by its date string.

Structured content that does not need an MDX body uses typed modules:

- `content/speaking/engagements.ts` → `getSpeaking()`
- `content/values/principles.ts` → `getValues()`
- `src/data/profile.ts`, `experience.ts`, and `awards.ts`

There is no database, API route, Server Action, authentication layer, client-side
fetching, or global application state store. State is limited to library internals,
React-generated form IDs, and the module-level analytics provider reference.

## Presentation boundaries

- Route modules fetch and compose; feature components accept typed presentation props.
- Layout primitives own width and section rhythm.
- UI primitives own recurring accessible element behavior.
- `globals.css` is the visual token source of truth.
- `components/motion` is the only intended animation import surface.
- `lib/seo` and `lib/analytics` isolate cross-cutting integrations.

The intended rule is “content is not presentation,” although a few current pages still
use raw headings and Next.js links rather than every available wrapper. Preserve the
existing direction and consolidate only when a requested feature makes that necessary.

## SEO and discoverability

`buildMetadata()` centralizes canonical URL, Open Graph, and optional no-index values.
The root layout supplies title templating and the default description. Article pages
also embed Article JSON-LD. `personJsonLd()` exists but is currently used only as the
article author payload, not mounted independently on About or Home.

## Testing architecture

- Unit tests protect content schemas, repository delegation, and `TextField` a11y.
- Playwright protects top-level navigation, case-study/article journeys, resume asset
  reachability, contact reachability, page semantics, skip-link behavior, and an axe
  WCAG 2.2 AA scan of the homepage.
- Presentation-only components intentionally have no isolated tests.

## Extension rules

Add rich-content collections through content files, a schema/registry entry, a small
getter, and thin index/detail routes. Add simple structured lists as typed content/data
plus a getter. A future CMS should implement `ContentSource` and be selected in
`src/lib/content/index.ts`; it should not force route or component rewrites.
