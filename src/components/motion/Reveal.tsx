"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { MOTION_DURATION, MOTION_EASE } from "./tokens";

/**
 * Reveal — the canonical entrance primitive: content fades in and
 * rises slightly when it enters the viewport.
 *
 * System rules (see components/motion/index.ts):
 * - Content-agnostic: children only; no props reference content shape.
 * - Token-driven: values come from motion/tokens (mirroring globals.css).
 * - Reduced motion is honored globally by MotionProvider
 *   (MotionConfig reducedMotion="user") — transforms are disabled for
 *   users who prefer reduced motion; opacity remains instant.
 *
 * Do not create further primitives until a genuine repeated pattern
 * exists (candidates: FadeIn, Stagger, ImageReveal, TextReveal,
 * PageTransition — each must follow this same contract).
 */
export function Reveal({
  children,
  className,
  /** Delay in ms — use sparingly; prefer Stagger for sequences (future). */
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: MOTION_DURATION.normal,
        ease: MOTION_EASE.entrance,
        delay: delay / 1000,
      }}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}
