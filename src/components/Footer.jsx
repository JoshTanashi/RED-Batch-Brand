import { C, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';

export const Footer = ({ onNav }) => {
  const isMobile = useIsMobile();
  const navLinks = [
    { id: 'drop',      label: 'DROP' },
    { id: 'contact',   label: 'CONTACT' },
    { id: 'queue',     label: 'QUEUE' },
    { id: 'sets',      label: 'THE RECORD' },
  ];
  return (
    <footer style={{ borderTop: `1px solid ${C.grey}`, background: C.black, padding: isMobile ? '24px' : '32px 48px' }}>
      <div style={{
        display: isMobile ? 'flex' : 'grid',
        flexDirection: isMobile ? 'column' : undefined,
        gridTemplateColumns: isMobile ? undefined : '1fr 1fr 1fr',
        gap: 32,
      }}>
        <div>
          <div style={{ ...grotesk(13, 700), letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            RED<span style={{ color: C.red }}>-</span>BATCH
          </div>
          <div style={{ ...mono(9, C.dim), lineHeight: 1.8 }}>
            Controlled release apparel.<br />
            South Africa.<br />
            CYCLE-01 · RB-001 · 2026
          </div>
        </div>
        <div>
          <div style={{ ...mono(9, C.red), marginBottom: 8 }}>NAVIGATE</div>
          {navLinks.map(({ id, label }) => (
            <button key={id} onClick={() => { onNav(id); window.scrollTo(0,0); }} style={{ ...mono(9, C.dim), background: 'none', border: 'none', cursor: 'pointer', display: 'block', lineHeight: 2, padding: isMobile ? '8px 0' : 0, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = C.white}
              onMouseLeave={e => e.currentTarget.style.color = C.dim}>
              {label}
            </button>
          ))}
        </div>
        <div>
          <div style={{ ...mono(9, C.red), marginBottom: 8 }}>SYSTEM</div>
          <div style={{ ...mono(9, C.dim), lineHeight: 2 }}>
            DOC-001 · SYSTEM-ROOT<br />
            redbatch.store<br />
            South Africa<br />
            All rights reserved.
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid #1A1A1A`, marginTop: 32, paddingTop: 20 }}>
        <div style={{ ...mono(9, C.red), marginBottom: 10 }}>POLICY</div>
        <div style={{ ...grotesk(13, 300, '#888'), lineHeight: 1.8, maxWidth: 560 }}>
          All sales are final. No returns, no refunds, no exchanges. Every RED-BATCH unit is made-to-order — production begins when payment is confirmed. We cannot cancel or reverse an order once placed. Please review your size carefully before completing your purchase.
        </div>
      </div>
      <div style={{ borderTop: `1px solid #1A1A1A`, marginTop: 24, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ ...mono(8, C.dim) }}>RED-BATCH · CYCLE-01 · 2026.04.23</span>
        <span style={{ ...mono(8, C.dim) }}>CONFIDENTIAL · DOC-001</span>
      </div>
    </footer>
  );
};
