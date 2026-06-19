import { C, F, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { Ticker } from '../components/Ticker';
import { Btn } from '../components/Btn';

export const CancelScreen = ({ onNav }) => {
  const isMobile = useIsMobile();
  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      <Ticker />
      <div style={{ padding: isMobile ? '64px 24px' : '120px 48px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <div style={{ border: `1px solid ${C.grey}`, padding: isMobile ? 40 : 56, position: 'relative', marginBottom: 32 }}>
            {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
              <div key={i} style={{ position: 'absolute', width: 8, height: 8, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
            ))}
            <div style={{ ...mono(9, C.dim), marginBottom: 16 }}>PAYMENT CANCELLED.</div>
            <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: isMobile ? 28 : 40, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 12 }}>Order not placed.</div>
            <div style={{ ...mono(10, C.dim), marginBottom: 16 }}>Your cart has been saved. No payment was taken.</div>
            <div style={{ ...grotesk(14, 300, '#888'), lineHeight: 1.8, marginBottom: 32 }}>
              Return to checkout to complete your order, or browse the current drop.
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn onClick={() => { onNav('checkout'); window.scrollTo(0,0); }}>Return to Checkout →</Btn>
              <Btn v="ghost" onClick={() => { onNav('drop'); window.scrollTo(0,0); }}>Browse Drop</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
