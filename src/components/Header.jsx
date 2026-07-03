import { useState } from 'react';
import { C, mono, grotesk, TONES } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';

/* Always tone-light: bone bar on its own painted background. */
export const Header = ({ screen, onNav, cart }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  const navItems = [
    { id: 'drop',         label: 'DROP' },
    { id: 'drop#cycle',   label: 'THE CYCLE' },
    { id: 'drop#record',  label: 'THE RECORD' },
    { id: 'drop#queue',   label: 'NEXT CYCLE' },
  ];

  const handleNav = (id) => { onNav(id); setMenuOpen(false); };

  const CartBtn = () => (
    <button onClick={() => handleNav('cart')} style={{ background: cartCount > 0 ? C.red : 'transparent', border: `1px solid ${cartCount > 0 ? C.red : C.line}`, ...mono(9, cartCount > 0 ? '#EDEAE4' : C.dim), padding: '7px 14px', cursor: 'pointer', transition: 'all 0.15s', marginLeft: 16 }}>
      {cartCount > 0 ? `CART · ${cartCount}` : 'CART'}
    </button>
  );

  return (
    <>
      <header style={{ ...TONES.light, background: 'rgba(237,234,228,0.9)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: `1px solid ${C.line}`, padding: isMobile ? '0 24px' : '0 48px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 200, color: C.ink }}>
        <button onClick={() => handleNav('drop')} style={{ ...grotesk(15, 700), letterSpacing: '0.22em', textTransform: 'uppercase', userSelect: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          RED<span style={{ color: C.red }}>-</span>BATCH
        </button>

        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CartBtn />
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: `1px solid ${menuOpen ? C.red : C.line}`, ...mono(8, menuOpen ? C.red : C.dim), padding: '7px 14px', cursor: 'pointer', transition: 'all 0.15s' }}>
              {menuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        ) : (
          <>
            <nav style={{ display: 'flex', height: '100%' }}>
              {navItems.map(({ id, label }) => {
                const active = screen === id.split('#')[0] && !id.includes('#');
                return (
                  <button key={id} onClick={() => handleNav(id)} style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${active ? C.red : 'transparent'}`, ...mono(9, active ? C.ink : C.dim), padding: '0 20px', height: '58px', cursor: 'pointer', transition: 'color 0.15s, border-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#141414'}
                    onMouseLeave={e => e.currentTarget.style.color = active ? '#141414' : '#6F6A62'}>
                    {label}
                  </button>
                );
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red, animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ ...mono(9, C.red) }}>ACTIVE</span>
              <button onClick={() => handleNav('drop#contact')}
                style={{ ...mono(9, C.dim), background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#141414'}
                onMouseLeave={e => e.currentTarget.style.color = '#6F6A62'}>
                CONTACT
              </button>
              <CartBtn />
            </div>
          </>
        )}
      </header>

      {isMobile && menuOpen && (
        <div style={{ ...TONES.light, position: 'fixed', inset: 0, top: '58px', background: C.bg, zIndex: 199, borderTop: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column', padding: '40px 24px', gap: 0, color: C.ink }}>
          {[...navItems, { id: 'drop#contact', label: 'CONTACT' }].map(({ id, label }) => (
            <button key={id} onClick={() => handleNav(id)} style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${C.line}`, ...mono(13, C.ink), padding: '20px 0', cursor: 'pointer', textAlign: 'left', transition: 'color 0.15s' }}>
              {label}
            </button>
          ))}
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, paddingTop: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red, animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ ...mono(9, C.red) }}>RELEASE ACTIVE · CYCLE-01</span>
          </div>
        </div>
      )}
    </>
  );
};
