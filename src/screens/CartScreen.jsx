import { C, F, mono, grotesk, display, TONES } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { fmtCurrency } from '../lib/format';
import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { Btn } from '../components/Btn';

export const CartScreen = ({ cart, removeFromCart, updateCartQuantity, onNav }) => {
  const isMobile = useIsMobile();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <>
      <Section tone="light" style={{ minHeight: '60vh' }}>
        <div style={{ padding: isMobile ? '48px 24px' : '72px 48px', paddingBottom: isMobile && cart.length > 0 ? 110 : undefined, maxWidth: 1280, margin: '0 auto' }}>
          <Reveal y={20}>
            <div style={{ ...mono(9, C.red), marginBottom: 14 }}>ORDER RECORD</div>
            <h1 style={{ ...display(96), marginBottom: 44 }}>cart<span style={{ color: C.red }}>.</span></h1>
          </Reveal>

          {cart.length === 0 ? (
            <Reveal delay={0.08}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
                <div style={{ ...mono(10, C.dim) }}>No units selected.</div>
                <Btn v="ghost" onClick={() => onNav('drop#cycle')}>Browse the Cycle</Btn>
              </div>
            </Reveal>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 400px', gap: isMobile ? 40 : 64, alignItems: 'start' }}>
              <Reveal delay={0.06}>
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.colour}`} style={{ borderBottom: `1px solid ${C.line}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '22px 0' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.ink, marginBottom: 6 }}>{item.id} — {item.name}</div>
                        {item.isSet && (
                          <div style={{ ...mono(8, C.dim), marginBottom: 4 }}>Tee: {item.teeSize} · Hoodie: {item.hoodieSize}</div>
                        )}
                        <div style={{ ...mono(9, C.dim), marginBottom: 10 }}>{item.isSet ? 'COMPLETE SET' : item.size}</div>
                        {!item.isSet && (
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.size, item.colour, item.quantity - 1)}
                              style={{ width: isMobile ? 40 : 28, height: isMobile ? 40 : 28, border: `1px solid ${C.line}`, background: 'transparent', color: C.dim, fontSize: 15, cursor: 'pointer' }}>
                              −
                            </button>
                            <div style={{ width: isMobile ? 44 : 38, height: isMobile ? 40 : 28, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.m, fontSize: 11, color: C.ink }}>
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.size, item.colour, Math.min(10, item.quantity + 1))}
                              style={{ width: isMobile ? 40 : 28, height: isMobile ? 40 : 28, border: `1px solid ${C.line}`, background: 'transparent', color: C.dim, fontSize: 15, cursor: 'pointer' }}>
                              +
                            </button>
                          </div>
                        )}
                        <div style={{ fontFamily: F.m, fontSize: 13, color: C.ink }}>{fmtCurrency(item.price * item.quantity)}</div>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size, item.colour)} data-hover
                        style={{ ...mono(14, C.dim), background: 'none', border: 'none', cursor: 'pointer', padding: isMobile ? '8px 0 8px 16px' : '0 0 0 16px', lineHeight: 1, transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#C22B26'}
                        onMouseLeave={e => e.currentTarget.style.color = '#6B665E'}>
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </Reveal>

              {/* Charcoal summary panel */}
              <Reveal delay={0.14}>
                <div style={{ ...TONES.dark, background: 'var(--bg)', color: 'var(--ink)', padding: 30, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, background: C.red }} />
                  <div style={{ ...mono(9, C.red), marginBottom: 20 }}>ORDER SUMMARY</div>
                  {[['Subtotal', fmtCurrency(subtotal)], ['Delivery', 'Calculated at checkout']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.line}` }}>
                      <span style={{ ...grotesk(13, 400, C.dim) }}>{k}</span>
                      <span style={{ fontFamily: F.m, fontSize: 13, color: C.ink }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0 24px' }}>
                    <span style={{ ...grotesk(14, 600) }}>Subtotal</span>
                    <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 18, color: C.ink }}>{fmtCurrency(subtotal)}</span>
                  </div>
                  <Btn onClick={() => onNav('checkout')} style={{ width: '100%' }}>Proceed to Checkout →</Btn>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </Section>

      {isMobile && cart.length > 0 && (
        <div style={{ ...TONES.light, position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(237,234,228,0.95)', backdropFilter: 'blur(10px)', borderTop: `1px solid ${C.line}`, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, zIndex: 200, color: C.ink }}>
          <div>
            <div style={{ ...mono(8, C.dim) }}>Subtotal</div>
            <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 16, color: C.ink }}>{fmtCurrency(subtotal)}</div>
          </div>
          <Btn onClick={() => onNav('checkout')} style={{ flexShrink: 0 }}>Checkout →</Btn>
        </div>
      )}
    </>
  );
};
