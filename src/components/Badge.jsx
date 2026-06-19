import { C, mono } from '../lib/theme';

export const Badge = ({ children, v = 'active' }) => {
  const cfg = {
    active:   { border: `1px solid ${C.red}`,   color: C.red },
    filled:   { background: C.red, color: C.white, border: 'none' },
    neutral:  { border: `1px solid ${C.grey}`,  color: C.dim },
    archived: { border: '1px solid #444',        color: '#555' },
  };
  return (
    <span style={{ ...mono(9), padding: '4px 10px', display: 'inline-block', ...cfg[v] }}>
      {children}
    </span>
  );
};
