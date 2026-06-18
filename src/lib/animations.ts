// @context: Centralized Motion animation presets — shared across all components
// @purpose: Shared transition + variant objects for all Motion components in the app
// @purpose: Includes reduced-motion variants for accessibility (consumed by useReducedMotion hook or MotionConfig)
// @purpose: Shared modalBackdrop/modalContent/dropdownReveal eliminate ~30 lines of duplication per modal (10+ modal components)
// @behavior: Usage: <motion.div {...modalBackdrop} /> or <motion.div {...FADE_UP} transition={TRANSITIONS.SPRING}>
// @performance: All objects are module-level constants — zero runtime allocation, compiled once
// @performance: EASE_OUT cubic-bezier [0.23, 1, 0.32, 1] optimized for natural-feeling UI transitions
// @performance: Reduced variants set duration to 0.01s for near-instant transitions (accessibility compliance)
// @dependencies: motion/react (types only — runtime values, not imports)
// @owner: Core team
// @tests: None — visual regression tests would capture animation timing regressions
// @code-template: Pattern for new modals: import { modalBackdrop, modalContent } from 'lib/animations' — see Modal.tsx

export const EASE_OUT = [0.23, 1, 0.32, 1];

export const TRANSITIONS = {
  SPRING: { type: 'tween', duration: 0.3, ease: EASE_OUT },
  EASE_OUT: { duration: 0.3, ease: EASE_OUT },
  EASE_IN_OUT: { duration: 0.3, ease: 'easeInOut' },
  FAST: { duration: 0.15 },
  NORMAL: { duration: 0.2 },
  SLOW: { duration: 0.4, ease: EASE_OUT },
};

export const REDUCED_TRANSITIONS = {
  SPRING: { duration: 0.01 },
  EASE_OUT: { duration: 0.01 },
  EASE_IN_OUT: { duration: 0.01 },
  FAST: { duration: 0.01 },
  NORMAL: { duration: 0.01 },
  SLOW: { duration: 0.01 },
};

export const VARIANTS = {
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  FADE_UP: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  SCALE_IN: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export const dropdownReveal = {
  initial: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
  animate: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  exit: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
};

export const REDUCED_VARIANTS = {
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  FADE_UP: {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 0 },
  },
  SCALE_IN: {
    initial: { opacity: 0, scale: 1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1 },
  },
};
