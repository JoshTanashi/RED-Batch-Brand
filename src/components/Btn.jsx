import { useState } from 'react';
import { C, grotesk } from '../lib/theme';

export const Btn = ({ children, v = 'primary', onClick, disabled, style: extraStyle = {} }) => {
  const [hov, setHov] = useState(false);
  const base = {
    ...grotesk(11, 600), letterSpacing: '0.2em', textTransform: 'uppercase',
    padding: '13px 28px', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 0, transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
    ...extraStyle,
  };
  const variants = {
    primary:   { background: hov ? '#8B1A1A' : C.red, color: C.white, opacity: disabled ? 0.4 : 1 },
    secondary: { background: 'transparent', border: `1px solid ${hov ? C.white : C.grey}`, color: hov ? C.white : C.dim },
    ghost:     { background: 'transparent', border: `1px solid ${hov ? C.red : C.grey}`,   color: hov ? C.red   : C.dim },
  };
  return (
    <button className="btn-fill" onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, ...variants[v] }}>
      {children}
    </button>
  );
};
