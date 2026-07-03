import { useRef, useState } from 'react';
import { m, useMotionValue, useSpring } from '../lib/motion';
import { C, F } from '../lib/theme';

const BONE = '#EDEAE4';

/* Magnetic button: nudges toward the pointer on fine-pointer devices. */
export const Btn = ({ children, v = 'primary', onClick, disabled, style: extraStyle = {} }) => {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 20 });
  const y = useSpring(my, { stiffness: 260, damping: 20 });

  const onMove = (e) => {
    if (disabled || !window.matchMedia('(pointer: fine)').matches) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.16);
    my.set((e.clientY - r.top - r.height / 2) * 0.32);
  };
  const reset = () => { mx.set(0); my.set(0); setHov(false); };

  const base = {
    fontFamily: F.g, fontWeight: 600, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
    padding: '14px 30px', cursor: disabled ? 'not-allowed' : 'pointer', borderRadius: 0,
    transition: 'background 0.25s, color 0.25s, border-color 0.25s',
    opacity: disabled ? 0.4 : 1, display: 'inline-block',
  };
  const on = hov && !disabled;
  const variants = {
    primary:   { background: on ? C.ink : C.red, border: `1px solid ${on ? C.ink : C.red}`, color: on ? C.bg : BONE },
    secondary: { background: on ? C.ink : 'transparent', border: `1px solid ${C.ink}`, color: on ? C.bg : C.ink },
    ghost:     { background: on ? C.red : 'transparent', border: `1px solid ${C.red}`, color: on ? BONE : C.red },
  };

  return (
    <m.button ref={ref} onClick={onClick} disabled={disabled}
      onMouseMove={onMove} onMouseEnter={() => setHov(true)} onMouseLeave={reset}
      style={{ ...base, ...variants[v], x, y, ...extraStyle }}>
      {children}
    </m.button>
  );
};
