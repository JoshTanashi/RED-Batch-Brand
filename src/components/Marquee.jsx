import { C, F, TONES } from '../lib/theme';

/* Seamless loop: content duplicated once, CSS animates to -50%. */
export const Marquee = ({ items, variant = 'quiet', speed = 22 }) => {
  const row = [...items, ...items];

  if (variant === 'band') {
    return (
      <div className="marquee" aria-hidden="true"
        style={{ background: TONES.light['--red'], overflow: 'hidden', padding: '16px 0' }}>
        <div className="marquee-inner" style={{ '--marquee-speed': `${speed}s` }}>
          {row.map((t, i) => (
            <span key={i} style={{
              fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(17px, 2.4vw, 28px)',
              textTransform: 'lowercase', letterSpacing: '-0.01em', color: '#EDEAE4',
              display: 'inline-flex', alignItems: 'center', gap: 30, padding: '0 15px',
            }}>
              {t}
              <span style={{ width: 8, height: 8, background: 'rgba(237,234,228,0.85)', display: 'inline-block', flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="marquee" aria-hidden="true"
      style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, overflow: 'hidden', padding: '9px 0' }}>
      <div className="marquee-inner" style={{ '--marquee-speed': `${speed * 1.6}s` }}>
        {row.map((t, i) => (
          <span key={i} style={{
            fontFamily: F.m, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: C.dim, padding: '0 24px', borderRight: `1px solid ${C.line}`, whiteSpace: 'nowrap',
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
