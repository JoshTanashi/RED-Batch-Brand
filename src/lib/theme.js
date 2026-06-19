/* ── TOKENS ── */
export const C = {
  black: '#0D0D0D', g2: '#1A1A1A', grey: '#2A2A2A',
  dim: '#888', white: '#F0F0F0', red: '#B22222',
};
export const F = { g: "'Space Grotesk', sans-serif", m: "'Space Mono', monospace" };

/* ── STYLE HELPERS ── */
export const mono    = (size = 9, color = C.dim, extra = {}) => ({ fontFamily: F.m, fontSize: size, letterSpacing: '0.16em', textTransform: 'uppercase', color, ...extra });
export const grotesk = (size = 14, weight = 400, color = C.white, extra = {}) => ({ fontFamily: F.g, fontSize: size, fontWeight: weight, color, ...extra });
