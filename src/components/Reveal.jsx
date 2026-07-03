import { m, EASE, VIEWPORT } from '../lib/motion';

/* Scroll-triggered rise+fade. The workhorse reveal for text/blocks. */
export const Reveal = ({ children, delay = 0, y = 28, once = true, amount = VIEWPORT.amount, style, ...rest }) => (
  <m.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, amount }}
    transition={{ duration: 0.7, ease: EASE, delay }}
    style={style}
    {...rest}>
    {children}
  </m.div>
);

/* Clip-path image/panel reveal (curtain up). */
export const ClipReveal = ({ children, delay = 0, style, ...rest }) => (
  <m.div
    initial={{ clipPath: 'inset(100% 0 0 0)' }}
    whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
    viewport={VIEWPORT}
    transition={{ duration: 0.9, ease: EASE, delay }}
    style={style}
    {...rest}>
    {children}
  </m.div>
);
