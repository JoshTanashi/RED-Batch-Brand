import { useEffect } from 'react';
import { C, mono, grotesk, display } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { Btn } from '../components/Btn';

const Corners = () => (
  <>
    {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
      <div key={i} style={{ position: 'absolute', width: 8, height: 8, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
    ))}
  </>
);

/* Post-payment result: status 'success' (clears cart) or 'cancel'. */
export const ResultScreen = ({ status, orderRef, clearCart, onNav }) => {
  const isMobile = useIsMobile();
  const success = status === 'success';

  useEffect(() => { if (success) clearCart(); }, []);

  return (
    <Section tone="light" style={{ minHeight: '72vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ padding: isMobile ? '64px 24px' : '96px 48px', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Reveal y={20} style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
          <div style={{ border: `1px solid ${C.line}`, padding: isMobile ? 40 : 56, position: 'relative', marginBottom: 32, background: C.bg }}>
            <Corners />
            <div style={{ ...mono(9, success ? C.red : C.dim), marginBottom: 18 }}>
              {success ? 'PAYMENT CONFIRMED.' : 'PAYMENT CANCELLED.'}
            </div>
            <div style={{ ...display(56), marginBottom: 18 }}>
              {success ? 'access granted.' : 'order not placed.'}
            </div>
            {success && orderRef && <div style={{ ...mono(10, C.dim), marginBottom: 18 }}>{orderRef}</div>}
            {!success && <div style={{ ...mono(10, C.dim), marginBottom: 16 }}>Your cart has been saved. No payment was taken.</div>}
            <div style={{ ...grotesk(14, 300, C.dim), lineHeight: 1.8 }}>
              {success
                ? 'Your unit is being prepared. You will be contacted once your order has been dispatched.'
                : 'Return to checkout to complete your order, or browse the current cycle.'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {!success && <Btn onClick={() => onNav('checkout')}>Return to Checkout →</Btn>}
            <Btn v="ghost" onClick={() => onNav('drop')}>{success ? 'Return to Drop' : 'Browse the Cycle'}</Btn>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};
