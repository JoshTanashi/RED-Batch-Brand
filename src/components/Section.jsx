import { TONES } from '../lib/theme';

/* Tone wrapper: sets the per-section CSS custom properties so every
   C.* token inside resolves against this section's palette. */
export const Section = ({ tone = 'light', id, style, children }) => (
  <section id={id} data-tone={tone}
    style={{ ...TONES[tone], background: 'var(--bg)', color: 'var(--ink)', position: 'relative', ...style }}>
    {children}
  </section>
);
