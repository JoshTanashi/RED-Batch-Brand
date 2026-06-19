import { useState } from 'react';
import { C, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';

export const Header = ({ screen, onNav, cart }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  const navItems = [
    { id: 'drop',    label: 'DROP' },
    { id: 'product', label: 'PRODUCT' },
    { id: 'sets',    label: 'THE RECORD' },
  ];

  const handleNav = (id) => { onNav(id); setMenuOpen(false); window.scrollTo(0,0); };

  const CartBtn = () => (
    <button onClick={() => handleNav('cart')} style={{ background: 'transparent', border: `1px solid ${cartCount > 0 ? C.red : C.grey}`, ...mono(9, cartCount > 0 ? C.red : C.dim), padding: '6px 12px', cursor: 'pointer', transition: 'all 0.15s', marginLeft: 16 }}>
      {cartCount > 0 ? `CART · ${cartCount}` : 'CART'}
    </button>
  );

  return (
    <>
      <header style={{ background: 'rgba(13,13,13,0.95)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${C.grey}`, padding: isMobile ? '0 24px' : '0 48px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 200 }}>
        <div style={{ ...grotesk(15, 700), letterSpacing: '0.22em', textTransform: 'uppercase', userSelect: 'none' }}>
          RED<span style={{ color: C.red }}>-</span>BATCH
        </div>

        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CartBtn />
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: `1px solid ${menuOpen ? C.red : C.grey}`, ...mono(8, menuOpen ? C.red : C.dim), padding: '6px 12px', cursor: 'pointer', transition: 'all 0.15s' }}>
              {menuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        ) : (
          <>
            <nav style={{ display: 'flex' }}>
              {navItems.map(({ id, label }) => {
                const active = screen === id;
                return (
                  <button key={id} onClick={() => { onNav(id); window.scrollTo(0,0); }} style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${active ? C.red : 'transparent'}`, color: active ? C.white : C.dim, ...mono(9), padding: '0 20px', height: '58px', cursor: 'pointer', transition: 'color 0.15s, border-color 0.15s' }}>
                    {label}
                  </button>
                );
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red, animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ ...mono(9, C.red) }}>ACTIVE</span>
              <button onClick={() => { onNav('contact'); window.scrollTo(0,0); }}
                style={{ ...mono(9, C.dim), background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = C.white}
                onMouseLeave={e => e.currentTarget.style.color = C.dim}>
                CONTACT
              </button>
              <CartBtn />
            </div>
          </>
        )}
      </header>

      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', inset: 0, top: '58px', background: C.black, zIndex: 199, borderTop: `1px solid ${C.grey}`, display: 'flex', flexDirection: 'column', padding: '40px 24px', gap: 0 }}>
          {navItems.map(({ id, label }) => {
            const active = screen === id;
            return (
              <button key={id} onClick={() => handleNav(id)} style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${C.g2}`, color: active ? C.red : C.white, ...mono(13, active ? C.red : C.white), padding: '20px 0', cursor: 'pointer', textAlign: 'left', transition: 'color 0.15s' }}>
                {label}
              </button>
            );
          })}
          <button onClick={() => handleNav('contact')} style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${C.g2}`, ...mono(13, C.dim), padding: '20px 0', cursor: 'pointer', textAlign: 'left', transition: 'color 0.15s' }}>
            CONTACT
          </button>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, paddingTop: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red, animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ ...mono(9, C.red) }}>RELEASE ACTIVE · CYCLE-01</span>
          </div>
        </div>
      )}
    </>
  );
};
