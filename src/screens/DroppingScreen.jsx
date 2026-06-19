import { useState, useEffect } from 'react';
import { C, F, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { AnimatedBg } from '../components/AnimatedBg';

export const DroppingScreen = () => {
  const isMobile = useIsMobile();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: C.black, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <AnimatedBg />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: isMobile ? '0 32px' : '0 64px', textAlign: 'center' }}>

        <div style={{ ...mono(10, C.red), letterSpacing: '0.3em', marginBottom: 32 }}>RED-BATCH · CYCLE-01</div>

        <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: isMobile ? 'clamp(52px, 16vw, 80px)' : 'clamp(72px, 10vw, 128px)', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 40 }}>
          <div style={{ color: C.white }}>DROPPING</div>
          <div style={{ color: C.red }}>SOON.</div>
        </div>

        <div style={{ width: isMobile ? '100%' : 480, height: 1, background: `linear-gradient(to right, transparent, ${C.grey}, transparent)`, marginBottom: 40 }} />

        <div style={{ ...mono(10, C.dim), letterSpacing: '0.2em', marginBottom: 12 }}>2026.04.23</div>
        <div style={{ ...grotesk(13, 300, '#666'), maxWidth: 400, lineHeight: 1.8 }}>
          Controlled release apparel. South Africa.<br />
          Limited units. No restock. Ever.
        </div>

        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red, animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ ...mono(9, C.red) }}>STANDING BY{dots}</span>
        </div>

      </div>

      <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: isMobile ? '0 24px' : '0 48px' }}>
        <span style={{ ...mono(8, '#333') }}>DOC-001</span>
        <span style={{ ...mono(8, '#333') }}>RED-BATCH SYSTEM</span>
      </div>
    </div>
  );
};
