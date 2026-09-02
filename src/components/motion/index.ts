/**
 * Motion system — the ONLY import surface for animation.
 *
 * Rules for every animation in this codebase:
 *
 * 1. Server-first. `motion/*` components are client components; pages
 *    and server components stay animation-free. The client boundary
 *    sits at the leaf (wrap server content inside <Reveal>).
 * 2. Tokens only. Durations/easings come from motion/tokens.ts
 *    (mirroring the --motion and --ease tokens in globals.css). Never
 *    inline numbers or cubic-beziers in components.
 * 3. Content-agnostic. Primitives receive children/className. They
 *    must never import content, data, or know what they are animating.
 * 4. Reduced motion. Global behavior is configured once in
 *    MotionProvider (reducedMotion="user") — primitives must not
 *    override it.
 * 5. Composition over proliferation. One primitive per genuine
 *    repeated pattern; start from Reveal and add others only when the
 *    same animation appears 2+ times in real layouts.
 *
 * Exports today:  Reveal (entrance on viewport)
 * Future candidates (same contract): FadeIn, Stagger, ImageReveal,
 * TextReveal, PageTransition.
 */
export { Reveal } from "./Reveal";
export { MotionProvider } from "./motion-provider";
