import { C, mono } from '../lib/theme';

export const Badge = ({ children, v = 'active' }) => {
  const cfg = {
    active:   { border: `1px solid ${C.red}`,  color: C.red },
    filled:   { background: C.red, color: '#EDEAE4', border: 'none' },
    neutral:  { border: `1px solid ${C.line}`, color: C.dim },
    archived: { border: `1px solid ${C.line}`, color: C.dim, opacity: 0.6 },
  };
  return (
    <span style={{ ...mono(9), padding: '4px 10px', display: 'inline-block', ...cfg[v] }}>
      {children}
    </span>
  );
};
