# Animations and Interactions

## Continuous branch growth — 2026-09-12

Both arms now continue along a shared stem as two complete paths, each on the same
eight-second timeline without a delayed stem phase. The right curve is adjusted to
join the common stem tangentially. Both gradients reach the same purple at the
junction, eliminating the exposed contrasting round cap. The SVG clips the stem
at the hero edge for a flat bottom. This supersedes the split-path timing below.

## Path-growth correction — 2026-09-12

`HeroBranches` replaces the masked image with inline original Figma vector paths,
split at the junction. Both arms draw along their curves simultaneously for four
seconds; the stem then draws for four seconds. Normalized SVG stroke dash offsets
animate the paths themselves, without a wipe or fading mask. The completed drawing
holds. The SVG reaches the hero bottom and its stem has a butt cap. The eight-second
total, hidden mobile artwork, gradients, and reduced-motion fallback are preserved.
This supersedes the earlier mask-based implementation. Figma 216:34 is a static
layout reference, not an authored motion timeline.

## Hero refinement — 2026-09-12

The hero now contains only the large animated Y; the small accent instance and its
styles were removed. The reveal is slowed to eight seconds and still runs once.
The large SVG fits within the hero with token-based margins, preserving its aspect
ratio and keeping both tips and the stem in bounds. Mobile hiding and reduced-motion
behavior are unchanged. This supersedes the four-second timing below.

## Approved hero reveal — 2026-09-12

The user approved a single simultaneous branch reveal, continuing down the stem,
then remaining static. Figma 216:18 has no motion tracks; the approved behavior is
implemented with a soft CSS mask over the existing SVGs, a 4s hero-duration token,
and the existing standard easing. The large Y retains its exported paths with the
reference's cyan/purple left and coral/purple right gradient stops. The complete
hero artwork is hidden below the existing md (768px) breakpoint, with no animation
applied there. Reduced-motion users see the completed artwork immediately. No loop,
scroll-triggered replay, new library, or layout movement is introduced.

## Primary navigation sticky across routes — 2026-09-12

The shared site header now uses native CSS sticky positioning at the viewport top
at every breakpoint. Header is a small client boundary solely to observe its actual
height with ResizeObserver and publish `--site-header-height`; the Work sticky block
uses this offset so wrapped mobile navigation and font resizing do not overlap it.
No scroll listeners, animation, or dependencies were added.

## Work sticky case-study header — 2026-09-12

Figma 13:259 adds the case-study eyebrow, title, and divider. A native CSS sticky
wrapper in the Work route holds this header and the existing Quick Links; no client
state or dependencies were added. At desktop widths it sticks below the 72px site
header, with Quick Links at 236px (superseding the previous 112px offset). On smaller
screens the text and links wrap together in one sticky block. Continuous scrolling,
the Productize anchor, and reduced-motion behavior are retained. All seven Work
browser tests pass across 320, 375, 768, 1280, and 1440px.

## Work implementation update — 2026-09-11

User clarification: the entire supplied page belongs to Productize and should scroll continuously. Productize therefore remains active throughout; Transform, Intent and What’s Next stay visible without invented destinations. No scroll observer, infinite-loading loop, duplicated content, forced section snapping or carousel behavior was added. Quick Links is CSS sticky (112px desktop; top 0 on smaller layouts). Productize uses an in-page link with native smooth scrolling; `prefers-reduced-motion: reduce` uses immediate scrolling. Browser tests cover stickiness, anchor behavior, active state, reduced motion and style isolation when returning Home. The four dots below the product screenshot are exact static artwork, not controls; no other slides were supplied.

## Homepage implementation update — 2026-09-10

The Figma homepage supplies no motion specification; no reveals, parallax, invented transitions, or diagram interaction were added. Existing hover underline, focus outlines, skip link and reduced-motion provider remain. Navigation is now three wrapping server-rendered links rather than the seven-link baseline below. CTAs navigate using existing routes; the case teaser intentionally opens `/work` as authorized. Diagram and hero artwork are static. Home preserves the supplied light palette instead of adopting the OS dark palette.

The remaining sections retain the original audit baseline; this update supersedes conflicting homepage/dependency status below.

Last verified: 2026-09-10.

## Motion architecture

Motion is intentionally isolated in `src/components/motion` and exposed through its
index module. `MotionProvider` installs `LazyMotion` with `domAnimation`, strict mode,
and `MotionConfig reducedMotion="user"`. This makes user motion preferences a global
default and prevents feature code from importing the animation library directly.

JavaScript motion tokens mirror CSS tokens:

| Token    | Value               | Intended use                  |
| -------- | ------------------- | ----------------------------- |
| Fast     | 150ms               | Hover/focus feedback          |
| Normal   | 300ms               | Reveals and small transitions |
| Slow     | 600ms               | Hero or page-level moments    |
| Standard | `[0.4, 0, 0.2, 1]`  | General UI easing             |
| Entrance | `[0.16, 1, 0.3, 1]` | Entering elements             |
| Exit     | `[0.7, 0, 0.84, 0]` | Leaving elements              |

When motion values change, update both `globals.css` and
`src/components/motion/tokens.ts`. This manual mirror is small but is a known drift risk.

## Existing animation primitive

`Reveal` starts at opacity 0 and y +16, animates to opacity 1 and y 0 when entering the
viewport, runs once, and uses a bottom viewport margin of -10%. It defaults to the
normal/entrance pair and converts an optional millisecond delay to seconds.

`Reveal` is not currently used anywhere in the visible application. Do not add stagger,
page transition, text reveal, or image reveal primitives until a real requested design
shows a repeated need.

## Existing interactions

- Next.js links provide client-side navigation and prefetch behavior.
- `ui/Link` underlines on hover; direct Next.js links do not have a shared hover style.
- Global focus-visible outlines provide keyboard feedback for native controls and links.
- The skip link becomes fixed and visible on focus, then jumps to each page's
  `#main-content` landmark.
- Buttons are native and preserve browser keyboard behavior, but their visual hover,
  pressed, loading, and disabled systems are not yet defined.
- `TextField` uses native input behavior and accessible error announcement. No form is
  currently wired on the Contact page.
- System color scheme switches the semantic palette automatically. There is no manual
  theme toggle or persisted preference.
- Vercel Analytics captures page views; the custom `track()` API exists but has no
  current call sites.

## Responsive interaction status

The header navigation is server-rendered as one horizontal row of seven links. There is
no mobile disclosure, scroll treatment, or wrapping behavior. Any navigation feature
must preserve server-first output, native buttons/links, keyboard and screen-reader
behavior, escape/outside-click semantics where applicable, and focus management.

## Interaction implementation rules

- Keep client boundaries at interactive leaves; do not convert entire routes to client
  components for a small behavior.
- Use CSS for simple hover/focus/active transitions and Motion for coordinated or
  viewport-driven animation that benefits from its lifecycle.
- Use duration/easing tokens, transform/opacity where possible, and avoid layout-heavy
  animation.
- Reduced-motion users must receive a stable, immediately understandable state.
- Do not delay essential content or make animation a prerequisite for navigation.
- Add behavior-oriented tests for critical new interactions, especially forms, menus,
  and focus management.
