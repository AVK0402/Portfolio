# Architecture

## Transform capability system — 2026-10-18

Transform remains inside the existing `#tp-transform` tab panel in the trusted
homepage markup. `content/home.ts` now supplies the approved idea rationale,
capability cloud and concept-film shell; `public/scripts/home-final.js` owns cloud
layout/selection and the film scene lifecycle. Both initializers are idempotent for
React Strict Mode. No route, shared component, data source or secondary page changed.

## Productize product film — 2026-10-18

The Productize chapter remains part of the trusted homepage markup in
`content/home.ts`. Its former horizontal placeholder gallery was replaced by the
approved thirteen-scene product film. The existing `LeadershipMotion` client leaf
continues to load one route-local runtime; `public/scripts/home-final.js` initializes
the film once and owns its scene lifecycle. No route, shared component boundary or
secondary page changed.

## Updated homepage header — 2026-10-18

The standalone homepage header remains inside the trusted `content/home.ts` markup.
Its Work, Leadership and About anchors are unchanged. The former Conversation anchor
was replaced by a native download link to the existing protected public-document path
and an external LinkedIn link; no client boundary, route or runtime handler was added.

## Non-expiring portfolio access — 2026-10-18

The grant schema accepts `expiresAt: null` only when non-expiring access is intentional;
an omitted or malformed expiry still fails closed. Active-grant and signed-session
verification preserve the existing end-date checks for dated grants, while non-expiring
grants remain valid until removed. Session cookies still receive the configured finite
expiry, and the existing version/secret revocation paths are unchanged.

## Portable private-access engine — 2026-10-15

`src/proxy.ts` is now the request boundary for the portfolio, public media, downloads,
image optimization and sitemap. Only `/access`, the two access Route Handlers,
`robots.txt`, the favicon and framework runtime files are public. Anonymous page
requests redirect to `/access` with a sanitized return path; anonymous API requests
receive 401. Invalid or absent production configuration fails closed.

`src/lib/access` owns configuration validation, scrypt password verification, return
path/cookie policy and HMAC session issue/verification. Every request re-checks the
signed session against the current grant ID, grant window and global access version,
so removing one grant revokes that invitation and changing the version revokes all
sessions. `/api/access/login` independently validates the form and origin before
setting the cookie; `/api/access/logout` clears both secure and local cookie forms.
The existing routes, content sources and page compositions are unchanged behind this
boundary.

## Final crisp homepage replacement — 2026-10-15

Only `/` was replaced. `content/home.ts` contains the trusted nine-section markup and
route-local visual system; `LeadershipHome` renders it from `getHome()`, and the small
`LeadershipMotion` client leaf loads the approved browser runtime after hydration.
The final homepage owns its sticky header and footer while mounted. Its Work,
Leadership and About items are in-page anchors exactly as supplied. Existing `/work`,
detail, Ideas, Resume and other routes remain available and unchanged.

## Complete homepage replacement — 2026-10-14

Only `/` was replaced. `content/home.ts` now holds the approved, trusted standalone
homepage markup and route-scoped design source; `getHome()` remains the content boundary
and `page.tsx` remains a thin Server Component. `LeadershipHome` renders the trusted
local markup, while `LeadershipMotion` is the single client leaf that initializes the
theme control, leadership reading selector, Canvas hero and three SVG diagrams.

The homepage continues to suppress the shared shell only while its root is mounted.
The Work item retains `/work`; all other supplied navigation anchors remain in-page.
No other route, content source, or shared component changed.

## Leadership homepage update — 2026-10-12

`/` is now the approved long-form leadership portfolio: proof, Productize narrative,
five cinematic black chapters, impact, validation, and business shift. `page.tsx`
remains a thin Server Component and composes typed `content/home.ts` through
`getHome()` into `LeadershipHome`. Only `LeadershipMotion` is a Client Component.

The homepage owns a route-local sticky header and footer. The shared shell is hidden
only while `.leadership-home` is present, so `/work` and every other route preserve
their existing header, footer, rendering, content, and behavior. No route changed.

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
