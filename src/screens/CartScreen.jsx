import { C, F, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { fmtCurrency } from '../lib/format';
import { Ticker } from '../components/Ticker';
import { Divider } from '../components/Divider';
import { Btn } from '../components/Btn';

export const CartScreen = ({ cart, removeFromCart, updateCartQuantity, onNav }) => {
  const isMobile = useIsMobile();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="screen-enter">
      <Ticker />
      <div style={{ padding: isMobile ? '32px 24px' : '48px' }}>
        <div style={{ ...mono(9, C.red), marginBottom: 12 }}>ORDER RECORD</div>
        <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: isMobile ? 36 : 52, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 40 }}>CART.</div>

        {cart.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
            <div style={{ ...mono(10, C.dim) }}>No units selected.</div>
            <Btn v="ghost" onClick={() => { onNav('drop'); window.scrollTo(0,0); }}>Browse Drop</Btn>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: isMobile ? 40 : 48, alignItems: 'start' }}>
            <div>
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${item.colour}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 0' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white, marginBottom: 6 }}>{item.id} — {item.name}</div>
                      {item.isSet && (
                        <div style={{ marginBottom: 4 }}>
                          <div style={{ ...mono(8, C.dim) }}>Tee: {item.teeSize} · Hoodie: {item.hoodieSize}</div>
                        </div>
                      )}
                      <div style={{ ...mono(9, C.dim), marginBottom: 8 }}>{item.isSet ? 'COMPLETE SET' : item.size}</div>
                      {!item.isSet && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 8 }}>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.size, item.colour, item.quantity - 1)}
                            style={{ width: 26, height: 26, border: `1px solid ${C.grey}`, background: 'transparent', color: C.dim, fontSize: 14, cursor: 'pointer', transition: 'color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = C.white}
                            onMouseLeave={e => e.currentTarget.style.color = C.dim}>
                            −
                          </button>
                          <div style={{ width: 36, height: 26, borderTop: `1px solid ${C.grey}`, borderBottom: `1px solid ${C.grey}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.m, fontSize: 11, color: C.white }}>
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.size, item.colour, Math.min(10, item.quantity + 1))}
                            style={{ width: 26, height: 26, border: `1px solid ${C.grey}`, background: 'transparent', color: C.dim, fontSize: 14, cursor: 'pointer', transition: 'color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = C.white}
                            onMouseLeave={e => e.currentTarget.style.color = C.dim}>
                            +
                          </button>
                        </div>
                      )}
                      <div style={{ fontFamily: F.m, fontSize: 13, color: C.white }}>{fmtCurrency(item.price * item.quantity)}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size, item.colour)}
                      style={{ ...mono(14, C.dim), background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0 16px', lineHeight: 1, transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = C.red}
                      onMouseLeave={e => e.currentTarget.style.color = C.dim}>
                      ×
                    </button>
                  </div>
                  {idx < cart.length - 1 && <Divider />}
                </div>
              ))}
            </div>
            <div style={{ border: `1px solid ${C.grey}`, padding: 28, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
              <div style={{ ...mono(9, C.red), marginBottom: 20 }}>ORDER SUMMARY</div>
              {[['Subtotal', fmtCurrency(subtotal)], ['Delivery', 'Calculated at checkout']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.g2}` }}>
                  <span style={{ ...grotesk(13, 400, C.dim) }}>{k}</span>
                  <span style={{ fontFamily: F.m, fontSize: 13, color: C.white }}>{v}</span>
                </div>
              ))}
              <Divider color={C.red} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 20px' }}>
                <span style={{ ...grotesk(14, 600) }}>Subtotal</span>
                <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 18, color: C.white }}>{fmtCurrency(subtotal)}</span>
              </div>
              <Btn onClick={() => { onNav('checkout'); window.scrollTo(0,0); }} style={{ width: '100%' }}>Proceed to Checkout →</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
