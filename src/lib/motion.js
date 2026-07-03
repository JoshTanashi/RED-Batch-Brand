/* Single import surface for animation. Always use `m.` components
   (LazyMotion + domAnimation keeps the bundle lean) — never bare `motion.`. */
export {
  m, LazyMotion, domAnimation, AnimatePresence, MotionConfig,
  useScroll, useTransform, useSpring, useMotionValue, useReducedMotion,
} from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1];

/* Shared variants */
export const rise = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
export const riseSoft = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
export const staggerKids = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
export const clipReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show:   { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9, ease: EASE } },
};

export const VIEWPORT = { once: true, amount: 0.25 };
