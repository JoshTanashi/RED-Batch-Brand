/* ── TONES — per-section CSS custom properties ──
   A <Section tone="light|dark"> sets these; :root in styles.css carries
   the light values as defaults. Components style with C.* var() tokens,
   so the same component reads correctly on bone or charcoal. */
export const TONES = {
  light: {
    '--bg': '#EDEAE4', '--bg2': '#E3DFD7', '--ink': '#141414', '--dim': '#6B665E',
    '--line': '#D3CEC4', '--red': '#C22B26', '--veil': 'rgba(20,20,20,0.06)',
  },
  dark: {
    '--bg': '#141414', '--bg2': '#1C1C1C', '--ink': '#EDEAE4', '--dim': '#8B867D',
    '--line': '#2C2C2C', '--red': '#DA5147', '--veil': 'rgba(237,234,228,0.07)',
  },
};

/* ── TOKENS ── */
export const C = {
  bg: 'var(--bg)', bg2: 'var(--bg2)', ink: 'var(--ink)', dim: 'var(--dim)',
  line: 'var(--line)', red: 'var(--red)', veil: 'var(--veil)',
};
export const F = {
  g: "'Space Grotesk Variable', 'Space Grotesk', sans-serif",
  m: "'Space Mono', monospace",
};

/* ── STYLE HELPERS ── */
export const mono    = (size = 9, color = C.dim, extra = {}) => ({ fontFamily: F.m, fontSize: size, letterSpacing: '0.16em', textTransform: 'uppercase', color, ...extra });
export const grotesk = (size = 14, weight = 400, color = C.ink, extra = {}) => ({ fontFamily: F.g, fontSize: size, fontWeight: weight, color, ...extra });

/* Mega lowercase editorial display type. `vw` drives the fluid midband. */
export const display = (max = 168, color = C.ink, extra = {}) => ({
  fontFamily: F.g, fontWeight: 700, color,
  fontSize: `clamp(${Math.max(40, Math.round(max * 0.36))}px, ${Math.round(max / 14)}vw, ${max}px)`,
  letterSpacing: '-0.03em', lineHeight: 0.9, textTransform: 'lowercase',
  ...extra,
});
