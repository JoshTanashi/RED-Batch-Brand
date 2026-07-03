import { C, mono, grotesk, display } from '../lib/theme';
import { Section } from './Section';
import { useIsMobile } from '../lib/useIsMobile';

export const Footer = ({ onNav }) => {
  const isMobile = useIsMobile();

  const navLinks = [
    { id: 'drop',         label: 'Drop' },
    { id: 'drop#cycle',   label: 'The Cycle' },
    { id: 'drop#record',  label: 'The Record' },
    { id: 'drop#queue',   label: 'Next Cycle' },
    { id: 'drop#contact', label: 'Contact' },
    { id: 'cart',         label: 'Cart' },
  ];

  return (
    <Section tone="dark" style={{ marginTop: 'auto' }}>
      <div style={{ padding: isMobile ? '64px 24px 28px' : '96px 48px 32px' }}>

        {/* Giant wordmark */}
        <div style={{ ...display(150), marginBottom: isMobile ? 40 : 64, userSelect: 'none' }}>
          red-batch<span style={{ color: C.red }}>.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr', gap: isMobile ? 36 : 64, marginBottom: isMobile ? 48 : 72 }}>
          <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <div style={{ ...mono(9, C.red), marginBottom: 14 }}>SYSTEM</div>
            <div style={{ ...grotesk(14, 300, C.dim), lineHeight: 1.7, maxWidth: 360 }}>
              Controlled release apparel from South Africa. Every drop is documented,
              verified and logged. All sales are final — every unit is made-to-order
              and production begins when payment is confirmed. Once a batch closes it
              exists permanently in the archive.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...mono(9, C.red), marginBottom: 14 }}>NAVIGATE</div>
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => onNav(id)}
                style={{ ...grotesk(14, 400, C.dim), background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', textAlign: 'left', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#EDEAE4'}
                onMouseLeave={e => e.currentTarget.style.color = '#8B867D'}>
                {label}
              </button>
            ))}
          </div>
          <div>
            <div style={{ ...mono(9, C.red), marginBottom: 14 }}>RECORD</div>
            <div style={{ ...mono(9, C.dim), lineHeight: 2.2 }}>
              DOC-001 · SYSTEM-ROOT<br />
              REDBATCH.STORE<br />
              SOUTH AFRICA<br />
              ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ ...mono(8, C.dim) }}>ALL SALES FINAL · MADE TO ORDER · NO RESTOCK</span>
          <span style={{ ...mono(8, C.dim) }}>RED-BATCH · CYCLE-01 · {new Date().getFullYear()}</span>
        </div>
      </div>
    </Section>
  );
};
