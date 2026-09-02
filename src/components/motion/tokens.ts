/**
 * Motion token mirror.
 *
 * globals.css is the source of truth for motion values
 * (--motion-fast/normal/slow, --ease-*). Motion's JS API needs numeric
 * durations and cubic-bezier strings, so those exact values are mirrored
 * here. When the design phase changes a CSS token, update this file —
 * enforced by review, and kept intentionally tiny to limit drift risk.
 */

export const MOTION_DURATION = {
  fast: 0.15, // --motion-fast (150ms)
  normal: 0.3, // --motion-normal (300ms)
  slow: 0.6, // --motion-slow (600ms)
} as const;

export const MOTION_EASE = {
  standard: [0.4, 0, 0.2, 1], // --ease-standard
  entrance: [0.16, 1, 0.3, 1], // --ease-entrance
  exit: [0.7, 0, 0.84, 0], // --ease-exit
} as const;
