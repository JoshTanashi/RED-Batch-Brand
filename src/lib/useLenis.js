import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/* Smooth-scroll the native window scroll (motion's useScroll stays accurate).
   Skipped entirely under prefers-reduced-motion; callers must handle a null ref. */
export const useLenis = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.1 });
    ref.current = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => { cancelAnimationFrame(raf); lenis.destroy(); ref.current = null; };
  }, []);
  return ref;
};
