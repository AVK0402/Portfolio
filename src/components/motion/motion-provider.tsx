"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion layer boundary. All animation in the app flows through this
 * provider: LazyMotion keeps the animation bundle small, and MotionConfig
 * gives one place to add global reduced-motion handling later.
 *
 * Rule: components import animation primitives from "motion/react" only
 * inside client components under `components/motion/`, keeping the
 * server-rendered tree animation-free.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
