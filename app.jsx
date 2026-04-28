/* RED-BATCH · React App */

const { useState, useEffect, useRef } = React;

// ── STORE CONFIG ─────────────────────────────────────────────────
// Credentials are loaded from config.js
// config.js is gitignored — never committed to GitHub
// Fill in your real values in config.js locally
// On Netlify: set values in Site Settings → Environment Variables
const PAYFAST_MERCHANT_ID       = STORE_CONFIG.PAYFAST_MERCHANT_ID;
const PAYFAST_MERCHANT_KEY      = STORE_CONFIG.PAYFAST_MERCHANT_KEY;
const PAYFAST_PASSPHRASE        = STORE_CONFIG.PAYFAST_PASSPHRASE;
const EMAILJS_PUBLIC_KEY        = STORE_CONFIG.EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID        = STORE_CONFIG.EMAILJS_SERVICE_ID;
const EMAILJS_OWNER_TEMPLATE    = STORE_CONFIG.EMAILJS_OWNER_TEMPLATE;
const EMAILJS_CUSTOMER_TEMPLATE = STORE_CONFIG.EMAILJS_CUSTOMER_TEMPLATE;
const STORE_OWNER_EMAIL         = STORE_CONFIG.STORE_OWNER_EMAIL;
const DELIVERY_FEE              = STORE_CONFIG.DELIVERY_FEE;
const PAYFAST_URL               = STORE_CONFIG.PAYFAST_URL;
// ─────────────────────────────────────────────────────────────────

/* ── TOKENS ── */
const C = {
  black: '#0D0D0D', g2: '#1A1A1A', grey: '#2A2A2A',
  dim: '#888', white: '#F0F0F0', red: '#B22222',
};
const F = { g: "'Space Grotesk', sans-serif", m: "'Space Mono', monospace" };

/* ── STYLE HELPERS ── */
const mono    = (size = 9, color = C.dim, extra = {}) => ({ fontFamily: F.m, fontSize: size, letterSpacing: '0.16em', textTransform: 'uppercase', color, ...extra });
const grotesk = (size = 14, weight = 400, color = C.white, extra = {}) => ({ fontFamily: F.g, fontSize: size, fontWeight: weight, color, ...extra });

/* ── RESPONSIVE HOOK ── */
const useIsMobile = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mobile;
};

/* ── PRICE PARSER ── */
const parsePrice = (priceStr) => parseInt(priceStr.replace(/[R\s]/g, ''), 10);

/* ── DATA ── */
const SETS = [
  {
    id: 'SET-001',
    cycle: 'CYCLE-01',
    name: 'The CYCLE-01 Record',
    items: ['RB-001', 'RB-002'],
    price: 'R 1 299',
    units: 20,
    status: 'ACTIVE',
    date: '2026.04.23',
    desc: 'The complete CYCLE-01 record. One Heavyweight Tee and one Oversized Hoodie. Matching colourway. Issued together as a single verified unit. Once this set closes it exists permanently in the archive — a purchasable memory of the cycle. 20 sets. No restock. Ever.',
    includes: ['Heavyweight Tee (RB-001)', 'Oversized Hoodie (RB-002)', 'Matching colourway', 'Shared batch stamp', 'Collector packaging'],
    images: ['./images/set-001-a.jpg', './images/set-001-b.jpg'],
  },
];

const BATCHES = [
  {
    id: 'RB-001', season: 'CYCLE-01', name: 'Heavyweight Tee',
    units: 70, status: 'ACTIVE', date: '2026.04.23', price: 'R 1',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '380gsm Cotton', fit: 'Oversized / Boxy', type: 'Tee',
    desc: 'Heavyweight 380gsm cotton. Oversized boxy cut, dropped shoulder. Each unit is issued a permanent batch identifier. Washed black and off-white colourways. 70 units. No restock.',
    images: ['./images/rb-001-a.jpg','./images/rb-001-b.jpg','./images/rb-001-c.jpg'],
  },
  {
    id: 'RB-002', season: 'CYCLE-01', name: 'Oversized Hoodie',
    units: 50, status: 'ACTIVE', date: '2026.04.23', price: 'R 799',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '500gsm Fleece', fit: 'Oversized / Drop Shoulder', type: 'Hoodie',
    desc: 'Heavyweight 500gsm fleece. Double-layered structured hood, single kangaroo pocket, ribbed cuffs and hem. Batch identifier woven into back neck label. 50 units. No restock.',
    images: ['./images/rb-002-a.jpg','./images/rb-002-b.jpg','./images/rb-002-c.jpg'],
  },
  {
    id: 'RB-003', season: 'CYCLE-01', name: 'Heavyweight Tee Vol.2',
    units: 60, status: 'COMING_SOON', date: '2026.TBC', price: 'R 599',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '380gsm Cotton', fit: 'Oversized / Boxy', type: 'Tee',
    desc: 'Second colourway drop. Heavyweight 380gsm cotton. Same oversized boxy cut as RB-001. New graphic treatment. 60 units. No restock.',
    images: ['./images/rb-003-a.jpg','./images/rb-003-b.jpg'],
  },
  {
    id: 'RB-004', season: 'CYCLE-01', name: 'Oversized Hoodie Vol.2',
    units: 40, status: 'COMING_SOON', date: '2026.TBC', price: 'R 799',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '500gsm Fleece', fit: 'Oversized / Drop Shoulder', type: 'Hoodie',
    desc: 'Second colourway drop. 500gsm fleece. Same silhouette as RB-002. New CYCLE-01 graphic on back. 40 units. No restock.',
    images: ['./images/rb-004-a.jpg','./images/rb-004-b.jpg'],
  },
  {
    id: 'RB-005', season: 'CYCLE-01', name: 'Heavyweight Tee Vol.3',
    units: 50, status: 'COMING_SOON', date: '2026.TBC', price: 'R 599',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '380gsm Cotton', fit: 'Oversized / Boxy', type: 'Tee',
    desc: 'Third graphic. Heavyweight 380gsm cotton. Oversized boxy construction. Limited colourway. 50 units. No restock.',
    images: ['./images/rb-005-a.jpg','./images/rb-005-b.jpg'],
  },
  {
    id: 'RB-006', season: 'CYCLE-01', name: 'Pullover Hoodie Vol.3',
    units: 30, status: 'COMING_SOON', date: '2026.TBC', price: 'R 799',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '500gsm Fleece', fit: 'Oversized / Drop Shoulder', type: 'Hoodie',
    desc: 'Third colourway. 500gsm fleece. Double-layered hood, kangaroo pocket. Batch label at neck. 30 units. No restock.',
    images: ['./images/rb-006-a.jpg','./images/rb-006-b.jpg'],
  },
];

const ACTIVE_BATCHES = BATCHES.filter(b => b.status === 'ACTIVE');
const ACTIVE_UNITS   = ACTIVE_BATCHES.reduce((s, b) => s + b.units, 0);
const NEXT = { id: 'RB-003', season: 'CYCLE-02', date: '2026.TBC', desc: 'Batch not yet released. Register to receive notification when the record opens.' };

/* ── PRIMITIVES ── */
const Badge = ({ children, v = 'active' }) => {
  const cfg = {
    active:   { border: `1px solid ${C.red}`,   color: C.red },
    filled:   { background: C.red, color: C.white, border: 'none' },
    neutral:  { border: `1px solid ${C.grey}`,  color: C.dim },
    archived: { border: '1px solid #444',        color: '#555' },
  };
  return (
    <span style={{ ...mono(9), padding: '4px 10px', display: 'inline-block', ...cfg[v] }}>
      {children}
    </span>
  );
};

const Btn = ({ children, v = 'primary', onClick, disabled, style: extraStyle = {} }) => {
  const [hov, setHov] = useState(false);
  const base = {
    ...grotesk(11, 600), letterSpacing: '0.2em', textTransform: 'uppercase',
    padding: '13px 28px', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 0, transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
    ...extraStyle,
  };
  const variants = {
    primary:   { background: hov ? '#8B1A1A' : C.red, color: C.white, opacity: disabled ? 0.4 : 1 },
    secondary: { background: 'transparent', border: `1px solid ${hov ? C.white : C.grey}`, color: hov ? C.white : C.dim },
    ghost:     { background: 'transparent', border: `1px solid ${hov ? C.red : C.grey}`,   color: hov ? C.red   : C.dim },
  };
  return (
    <button className="btn-fill" onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, ...variants[v] }}>
      {children}
    </button>
  );
};

const Divider = ({ color = C.grey }) => (
  <div style={{ borderBottom: `1px solid ${color}`, width: '100%' }} />
);

/* ── TICKER ── */
const Ticker = () => {
  const items = ['CYCLE-01', 'RELEASE ACTIVE', '120 UNITS', '2026.04.23', 'SOUTH AFRICA', 'VERIFIED DROP', 'RED-BATCH SYSTEM', 'DOC-001'];
  const row = items.map((t, i) => <span key={i}>{t}</span>);
  return (
    <div style={{ background: C.g2, borderBottom: `1px solid ${C.grey}`, overflow: 'hidden', height: '30px', display: 'flex', alignItems: 'center' }}>
      <div className="ticker-inner">{row}{row}</div>
    </div>
  );
};

/* ── FOOTER ── */
const Footer = ({ onNav }) => {
  const isMobile = useIsMobile();
  const navLinks = [
    { id: 'drop',      label: 'DROP' },
    { id: 'archive',   label: 'ARCHIVE' },
    { id: 'origin',    label: 'ORIGIN' },
    { id: 'contact',   label: 'CONTACT' },
    { id: 'manifesto', label: 'MANIFESTO' },
    { id: 'queue',     label: 'QUEUE' },
    { id: 'sets',      label: 'THE RECORD' },
    { id: 'merch',     label: 'MERCH' },
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
            <button key={id} onClick={() => { onNav(id); window.scrollTo(0,0); }} style={{ ...mono(9, C.dim), background: 'none', border: 'none', cursor: 'pointer', display: 'block', lineHeight: 2, padding: 0, transition: 'color 0.15s' }}
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
      <div style={{ borderTop: `1px solid #1A1A1A`, marginTop: 32, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ ...mono(8, C.dim) }}>RED-BATCH · CYCLE-01 · 2026.04.23</span>
        <span style={{ ...mono(8, C.dim) }}>CONFIDENTIAL · DOC-001</span>
      </div>
    </footer>
  );
};

/* ── HEADER ── */
const Header = ({ screen, onNav, cart }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  const navItems = [
    { id: 'drop',    label: 'DROP' },
    { id: 'product', label: 'PRODUCT' },
    { id: 'archive', label: 'ARCHIVE' },
    { id: 'origin',  label: 'ORIGIN' },
    { id: 'queue',   label: 'QUEUE' },
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
              <button onClick={() => { onNav('merch'); window.scrollTo(0,0); }} style={{ background: 'transparent', border: 'none', color: '#888', fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '0 20px', height: '58px', cursor: 'pointer', animation: 'glitch 4s ease infinite, glitch-color 4s ease infinite' }}>
                MERCH
              </button>
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
          <button onClick={() => handleNav('merch')} style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${C.g2}`, color: '#888', fontFamily: "'Space Mono', monospace", fontSize: '13px', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '20px 0', cursor: 'pointer', textAlign: 'left', animation: 'glitch 4s ease infinite, glitch-color 4s ease infinite' }}>
            MERCH
          </button>
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

/* ── PRODUCT CARD ── */
const ProductCardInline = ({ batch, onClick }) => {
  const [hov, setHov] = useState(false);
  const isClosed = batch.units === 0;
  const isComingSoon = batch.status === 'COMING_SOON';

  if (isComingSoon) {
    return (
      <div style={{ background: C.black, position: 'relative', border: `1px solid ${C.grey}`, cursor: 'default' }}>
        <div style={{ aspectRatio: '4/5', background: C.g2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...mono(9, '#222') }}>INCOMING.</span>
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ ...mono(9, C.dim) }}>{batch.id} · {batch.season}</div>
          <div style={{ ...grotesk(14, 600, C.dim), letterSpacing: '0.06em', textTransform: 'uppercase' }}>{batch.name}</div>
          <div style={{ ...mono(9, C.dim), marginTop: 2 }}>Available soon.</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <span style={{ fontFamily: F.m, fontSize: 13, color: '#888' }}>{batch.price}</span>
            <Badge v="neutral">INCOMING</Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      data-hover
      style={{ background: C.black, cursor: 'pointer', position: 'relative', border: `1px solid ${hov ? (isClosed ? C.grey : C.red) : C.grey}`, transition: 'border-color 0.2s' }}>
      <div style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, background: isClosed ? 'transparent' : (batch.status === 'ACTIVE' ? C.red : 'transparent'), transition: 'background 0.2s', zIndex: 1 }} />
      <div style={{ aspectRatio: '4/5', background: C.g2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {batch.images && batch.images[0] ? (
          <img src={batch.images[0]} alt={batch.name}
            onError={e => { e.target.style.display = 'none'; }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
        ) : (
          <span style={{ ...mono(9, '#222') }}>IMAGE SLOT</span>
        )}
        <div style={{ position: 'absolute', inset: 0, background: `rgba(178,34,34,${hov && !isClosed ? 0.04 : 0})`, transition: 'background 0.3s' }} />
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ ...mono(9) }}>{batch.id} · {batch.season}</div>
        <div style={{ ...grotesk(14, 600), letterSpacing: '0.06em', textTransform: 'uppercase' }}>{batch.name}</div>
        <div style={{ ...mono(9, C.dim), marginTop: 2 }}>{isClosed ? '0 units remaining.' : `${batch.units} units remaining.`}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <span style={{ fontFamily: F.m, fontSize: 13, color: C.white }}>{batch.price}</span>
          <Badge v={isClosed ? 'neutral' : (batch.status === 'ACTIVE' ? 'active' : 'neutral')}>{isClosed ? 'BATCH CLOSED' : batch.status}</Badge>
        </div>
      </div>
    </div>
  );
};

/* ── SCREEN: DROP ── */
const DropScreen = ({ onNav, onSelectBatch }) => {
  const isMobile = useIsMobile();
  const [heroHov, setHeroHov] = useState(false);
  const featuredBatch = BATCHES.find(b => b.status === 'ACTIVE');

  const handleCardClick = (batch) => {
    onSelectBatch(batch.id);
    onNav('product');
    window.scrollTo(0,0);
  };

  return (
    <div className="screen-enter">
      <Ticker />

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 64, padding: isMobile ? '40px 24px' : '64px 48px', borderBottom: `1px solid ${C.grey}`, position: 'relative', overflow: 'hidden' }}>
        <div className="stagger">
          <div style={{ ...mono(10, C.red), letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>SS26-A · 2026.04.23 · BATCH RB-001</div>
          <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(52px,8vw,96px)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 0.92, marginBottom: 24 }}>
            <div style={{ color: C.white }}>RELEASE</div>
            <div style={{ color: C.red }}>ACTIVE.</div>
          </div>
          <div style={{ ...grotesk(14, 300, '#999'), maxWidth: 480, lineHeight: 1.9, marginBottom: 32 }}>
            Each release is logged, catalogued, and issued a permanent batch identifier. CYCLE-01 is live. 120 units across two garments. No restock. No exceptions.
          </div>
          <div style={{ display: 'flex', gap: 32, marginBottom: 40, borderTop: `1px solid ${C.grey}`, borderBottom: `1px solid ${C.grey}`, padding: '20px 0' }}>
            {[['Units', ACTIVE_UNITS.toString()], ['Products', BATCHES.length.toString()], ['Delivery', 'R 60 via Pudo']].map(([label, value]) => (
              <div key={label}>
                <div style={{ ...mono(8, C.dim), marginBottom: 4 }}>{label}</div>
                <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', color: C.white }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Btn onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' })}>View Drop →</Btn>
            <Btn v="ghost" onClick={() => { onNav('archive'); window.scrollTo(0,0); }}>Browse Archive →</Btn>
          </div>
        </div>

        {!isMobile && featuredBatch && (
          <div
            onClick={() => { onSelectBatch(featuredBatch.id); onNav('product'); window.scrollTo(0,0); }}
            onMouseEnter={() => setHeroHov(true)}
            onMouseLeave={() => setHeroHov(false)}
            style={{ border: `1px solid ${heroHov ? C.red : C.grey}`, background: C.black, position: 'relative', cursor: 'pointer', transition: 'border-color 0.2s' }}
          >
            <div style={{ aspectRatio: '3/4', background: '#111', position: 'relative', overflow: 'hidden' }}>
              {featuredBatch.images && featuredBatch.images[0] ? (
                <img src={featuredBatch.images[0]} alt={featuredBatch.name} onError={e => { e.target.style.display = 'none'; }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <span style={{ ...mono(9, '#1A1A1A') }}>RB-001</span>
                </div>
              )}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, background: C.red }} />
              <div style={{ position: 'absolute', bottom: 12, left: 12, border: `1px solid ${C.grey}`, background: C.black, padding: '4px 10px', ...mono(9) }}>{featuredBatch.id}</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ ...mono(9, C.dim), marginBottom: 4 }}>{featuredBatch.id} · {featuredBatch.season}</div>
              <div style={{ ...grotesk(13, 600), letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{featuredBatch.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: F.m, fontSize: 14, color: C.white }}>{featuredBatch.price}</span>
                <Badge v="active">{featuredBatch.status}</Badge>
              </div>
            </div>
          </div>
        )}

        <div style={{ position: 'absolute', right: -20, bottom: -30, fontFamily: F.m, fontWeight: 700, fontSize: '200px', color: 'rgba(178,34,34,0.035)', pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>RB-001</div>
      </div>

      <div style={{ borderBottom: `1px solid ${C.grey}`, display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr' }}>
        {[['Units Issued', ACTIVE_UNITS.toString()], ['Season', 'CYCLE-01'], ['Active Drops', ACTIVE_BATCHES.length.toString()], ['Status', 'ACTIVE']].map(([k, v], i) => {
          const isLast = i === 3;
          const isSecondOnMobile = i === 1;
          return (
            <div key={k} style={{ padding: isMobile ? '16px 20px' : '20px 32px', borderRight: isMobile ? (isSecondOnMobile ? 'none' : `1px solid ${C.grey}`) : (isLast ? 'none' : `1px solid ${C.grey}`), borderBottom: isMobile && i < 2 ? `1px solid ${C.grey}` : 'none' }}>
              <div style={{ ...mono(9), marginBottom: 6 }}>{k}</div>
              <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: isMobile ? 15 : 18, letterSpacing: '0.1em', textTransform: 'uppercase', color: k === 'Status' ? C.red : C.white }}>{v}</div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: isMobile ? '20px 24px' : '24px 48px', borderBottom: `1px solid ${C.grey}`, background: C.black, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red, animation: 'pulse 2s ease-in-out infinite', flexShrink: 0 }} />
          <span style={{ ...mono(9, C.red), letterSpacing: '0.16em' }}>CYCLE-01 · NOW ACTIVE</span>
          <div style={{ width: 1, height: 16, background: C.grey, flexShrink: 0 }} />
          <span style={{ ...mono(9, C.dim) }}>{BATCHES.length} items · {ACTIVE_UNITS} units available</span>
        </div>
        <span style={{ ...mono(9, C.dim) }}>Delivery: R 60 · Pudo · South Africa</span>
      </div>

      <div style={{ borderBottom: `1px solid ${C.grey}`, background: '#0D0D0D', padding: isMobile ? '16px 24px' : '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ ...mono(9, C.dim), letterSpacing: '0.18em' }}>DOC-000 · BRAND ORIGIN</div>
          <div style={{ ...grotesk(14, 400, '#888'), marginTop: 4, maxWidth: 480, lineHeight: 1.6 }}>New here? Read the record — what RED-BATCH is, why it exists, and how the system works.</div>
        </div>
        <Btn v="ghost" onClick={() => { onNav('origin'); window.scrollTo(0,0); }}>Read Origin →</Btn>
      </div>

      <div id="product-grid" style={{ padding: isMobile ? '32px 24px' : '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <div style={{ ...mono(9), marginBottom: 0 }}>CYCLE-01 · {BATCHES.length} drops · {ACTIVE_BATCHES.length} active now</div>
          <span style={{ ...mono(8, C.red) }}>CYCLE-01</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill,minmax(160px,1fr))' : 'repeat(auto-fill,minmax(240px,1fr))', gap: 1, background: C.grey }}>
          {BATCHES.map(b => (
            <ProductCardInline key={b.id} batch={b} onClick={b.status === 'COMING_SOON' ? undefined : () => handleCardClick(b)} />
          ))}
        </div>
      </div>

      <div style={{ padding: isMobile ? '0 24px 32px' : '0 48px 40px' }}>
        <div style={{ border: `1px solid ${C.grey}`, background: C.g2, padding: isMobile ? '16px 20px' : '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
          <div>
            <div style={{ ...mono(9, C.red) }}>THE RECORD · CYCLE-01</div>
            <div style={{ ...grotesk(16, 600), letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 6 }}>Complete CYCLE-01 Set.</div>
            <div style={{ ...mono(9, C.dim), marginTop: 4 }}>20 sets. Tee + Hoodie. One colourway. Permanent.</div>
          </div>
          <Btn v="ghost" onClick={() => { onNav('sets'); window.scrollTo(0,0); }}>View Set →</Btn>
        </div>
      </div>

      <div style={{ padding: isMobile ? '0 24px 48px' : '0 48px 64px' }}>
        <div style={{ borderTop: `1px solid ${C.grey}`, paddingTop: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <div style={{ ...grotesk(isMobile ? 16 : 20, 600), letterSpacing: '0.1em', textTransform: 'uppercase' }}>Recent Archive</div>
            <button onClick={() => { onNav('archive'); window.scrollTo(0,0); }} style={{ ...mono(9, C.red), background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>View all →</button>
          </div>
          {BATCHES.filter(b => b.status === 'ARCHIVED').slice(0, 4).map(b => (
            <div key={b.id} className="batch-row" onClick={() => { onNav('archive'); window.scrollTo(0,0); }}
              style={{ display: 'grid', gridTemplateColumns: isMobile ? '90px 1fr 80px' : '120px 1fr 80px 120px', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.g2}`, cursor: 'pointer' }}>
              <span className="row-id" style={{ fontFamily: F.m, fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.dim, transition: 'color 0.15s' }}>{b.id}</span>
              <span style={{ ...grotesk(13, 400, C.white) }}>{b.name}</span>
              <span style={{ ...mono(9) }}>{b.season}</span>
              {!isMobile && <Badge v="neutral">{b.status}</Badge>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── SCREEN: PRODUCT ── */
const ProductScreen = ({ onNav, batchId, cart, addToCart, onSelectBatch }) => {
  const isMobile = useIsMobile();
  const batch = BATCHES.find(b => b.id === batchId) || BATCHES[0];
  const [size, setSize] = useState(null);
  const [colour, setColour] = useState(null);
  const [added, setAdded] = useState(false);
  const [hovSize, setHovSize] = useState(null);
  const [hovColour, setHovColour] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const topRef = useRef(null);
  const isClosed = batch.units === 0;

  useEffect(() => { setActiveImg(0); setSize(null); setColour(null); }, [batchId]);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [batchId]);

  const handleAddToCart = () => {
    if (!size || !colour || isClosed) return;
    addToCart({ id: batch.id, name: batch.name, price: parsePrice(batch.price), size, colour });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const teeRows    = [['S','56cm','72cm','50cm'],['M','60cm','74cm','53cm'],['L','64cm','76cm','56cm'],['XL','68cm','78cm','59cm'],['2XL','72cm','80cm','62cm']];
  const hoodieRows = [['S','58cm','74cm','52cm'],['M','62cm','76cm','55cm'],['L','66cm','78cm','58cm'],['XL','70cm','80cm','61cm'],['2XL','74cm','82cm','64cm']];
  const sizeRows = batch.type === 'Tee' ? teeRows : hoodieRows;

  return (
    <div className="screen-enter" ref={topRef}>
      <Ticker />
      <div style={{ padding: isMobile ? '24px' : '48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '64px', maxWidth: 1100 }}>

        <div>
          <div style={{ aspectRatio: '4/5', background: C.g2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: `1px solid ${C.grey}` }}>
            {batch.images && batch.images[activeImg] ? (
              <img src={batch.images[activeImg]} alt={`${batch.name} ${activeImg + 1}`}
                onError={e => { e.target.style.display = 'none'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <span style={{ ...mono(9, '#222') }}>IMG</span>
            )}
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <div style={{ border: `1px solid ${C.grey}`, padding: '4px 10px', ...mono(9), background: C.black }}>{batch.id}</div>
            </div>
            <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
              <Badge v={isClosed ? 'neutral' : (batch.status === 'ACTIVE' ? 'active' : 'neutral')}>{isClosed ? 'BATCH CLOSED' : batch.status}</Badge>
            </div>
          </div>

          {batch.images && batch.images.length > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 8, overflowX: isMobile ? 'auto' : 'visible' }}>
              {batch.images.map((img, idx) => (
                <div key={idx} onClick={() => setActiveImg(idx)} style={{ width: 60, height: 75, background: C.g2, flexShrink: 0, border: `1px solid ${activeImg === idx ? C.red : C.grey}`, cursor: 'pointer', overflow: 'hidden' }}>
                  <img src={img} alt={`thumb ${idx + 1}`} onError={e => { e.target.style.display = 'none'; }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 16, border: `1px solid ${C.grey}`, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, background: C.red }} />
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, background: C.red }} />
            <div>
              <div style={{ ...mono(8) }}>Batch identifier</div>
              <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: C.white, marginTop: 4 }}>{batch.id} · {batch.season}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...mono(8) }}>Issued</div>
              <div style={{ ...mono(11, C.white), marginTop: 4 }}>{batch.date}</div>
            </div>
          </div>
        </div>

        <div className="stagger" style={{ paddingTop: isMobile ? 0 : 8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ ...mono(9, C.red), marginBottom: 8 }}>{batch.season} · {batch.type.toUpperCase()} · {batch.status}</div>
            <div style={{ ...grotesk(isMobile ? 24 : 32, 600), letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>{batch.name}</div>
            <div style={{ fontFamily: F.m, fontSize: 20, color: C.white, marginTop: 14 }}>{batch.price}</div>
            <div style={{ ...mono(9, C.dim), marginTop: 8 }}>{isClosed ? '0 units remaining.' : `${batch.units} units remaining.`}</div>
          </div>

          <Divider />
          <div style={{ ...grotesk(14, 300, '#999'), lineHeight: 1.8 }}>{batch.desc}</div>
          <Divider />

          <div>
            <div style={{ ...mono(9), marginBottom: 12 }}>
              Select colourway {colour && <span style={{ color: C.red }}>— {colour}</span>}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Washed Black', 'Off-White'].map(cw => {
                const sel = colour === cw, hov = hovColour === cw;
                return (
                  <button key={cw} onClick={() => setColour(cw)}
                    onMouseEnter={() => setHovColour(cw)} onMouseLeave={() => setHovColour(null)}
                    data-hover
                    style={{ padding: '10px 16px', background: sel ? C.red : 'transparent', border: `1px solid ${sel ? C.red : hov ? C.white : C.grey}`, color: sel ? C.white : hov ? C.white : C.dim, ...mono(10), cursor: 'pointer', transition: 'all 0.15s' }}>
                    {cw}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ ...mono(9), marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Select size {size && <span style={{ color: C.red }}>— {size}</span>}</span>
              <button onClick={() => setSizeGuideOpen(true)}
                style={{ fontFamily: F.m, fontSize: 9, color: '#888', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', letterSpacing: '0.16em', textTransform: 'uppercase', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = C.white}
                onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                [size guide]
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {batch.sizes.map(s => {
                const sel = size === s, hov = hovSize === s;
                return (
                  <button key={s} onClick={() => setSize(s)}
                    onMouseEnter={() => setHovSize(s)} onMouseLeave={() => setHovSize(null)}
                    data-hover
                    style={{ width: 52, height: 52, background: sel ? C.red : 'transparent', border: `1px solid ${sel ? C.red : hov ? C.white : C.grey}`, color: sel ? C.white : hov ? C.white : C.dim, ...mono(11), cursor: 'pointer', transition: 'all 0.15s' }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <Btn onClick={handleAddToCart} disabled={!size || !colour || isClosed}>
            {isClosed ? 'Batch closed.' : added ? 'Unit Added.' : 'Add to Cart'}
          </Btn>
          {added && <div style={{ ...mono(10, C.red) }}>Unit added to cart.</div>}

          <Divider />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' }}>
            {[['Material', batch.weight], ['Fit', batch.fit], ['Origin', batch.origin], ['Batch units', `${batch.units}`], ['Season', batch.season], ['Doc ref', 'DOC-001']].map(([k, v]) => (
              <div key={k}>
                <div style={{ ...mono(8), marginBottom: 4 }}>{k}</div>
                <div style={{ ...grotesk(13, 400) }}>{v}</div>
              </div>
            ))}
          </div>

          <Divider />

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Care: Cold wash only', 'No tumble dry', 'Store folded'].map(c => (
              <span key={c} style={{ ...mono(8), border: `1px solid ${C.grey}`, padding: '4px 10px' }}>{c}</span>
            ))}
          </div>

          <button onClick={() => { onNav('drop'); window.scrollTo(0,0); }} style={{ ...mono(9, C.dim), background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>← Back to drop</button>
        </div>
      </div>

      <div style={{ padding: isMobile ? '0 24px 48px' : '0 48px 64px', borderTop: `1px solid ${C.grey}`, marginTop: 16, paddingTop: 40 }}>
        <div style={{ ...mono(9), marginBottom: 24 }}>Also in CYCLE-01</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill,minmax(160px,1fr))' : 'repeat(auto-fill,minmax(200px,1fr))', gap: 1, background: C.grey }}>
          {BATCHES.filter(b => b.id !== batch.id).slice(0, isMobile ? 2 : 4).map(b => (
            <ProductCardInline key={b.id} batch={b} onClick={b.status === 'COMING_SOON' ? undefined : () => { onSelectBatch(b.id); onNav('product'); }} />
          ))}
        </div>
      </div>

      {sizeGuideOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { if (e.target === e.currentTarget) setSizeGuideOpen(false); }}>
          <div style={{ background: C.black, border: `1px solid ${C.grey}`, padding: 32, maxWidth: 480, width: '90%', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
            <button onClick={() => setSizeGuideOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, ...mono(9, C.dim), background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = C.white}
              onMouseLeave={e => e.currentTarget.style.color = C.dim}>
              × CLOSE
            </button>
            <div style={{ ...mono(9, C.red), marginBottom: 8 }}>SIZE GUIDE · CYCLE-01</div>
            <div style={{ ...grotesk(13, 400, C.dim), marginBottom: 20 }}>Measurements in centimetres. Garments run oversized.</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.grey}` }}>
                  {['SIZE', 'CHEST', 'LENGTH', 'SHOULDER'].map(h => (
                    <th key={h} style={{ ...mono(9, C.dim), padding: '8px 12px', textAlign: 'left', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeRows.map(([sz, chest, len, shldr]) => (
                  <tr key={sz} style={{ borderBottom: `1px solid ${C.g2}` }}>
                    <td style={{ fontFamily: F.m, fontWeight: 700, fontSize: 13, color: C.white, padding: '10px 12px' }}>{sz}</td>
                    <td style={{ ...grotesk(13, 400), padding: '10px 12px' }}>{chest}</td>
                    <td style={{ ...grotesk(13, 400), padding: '10px 12px' }}>{len}</td>
                    <td style={{ ...grotesk(13, 400), padding: '10px 12px' }}>{shldr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ ...mono(8, C.dim), marginTop: 16, lineHeight: 1.8 }}>
              Measurements are approximate.<br />If between sizes, size up.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── SCREEN: ARCHIVE ── */
const ArchiveScreen = ({ onSelectBatch, onNav }) => {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [votes, setVotes] = useState({});
  const filters = ['ALL', 'ACTIVE', 'ARCHIVED', 'INCOMING'];

  const shown = filter === 'ALL' ? BATCHES
    : filter === 'INCOMING' ? BATCHES.filter(b => b.status === 'COMING_SOON')
    : BATCHES.filter(b => b.status === filter);

  useEffect(() => {
    const v = {};
    BATCHES.forEach(b => { if (localStorage.getItem(`rb-vote-${b.id}`)) v[b.id] = true; });
    setVotes(v);
  }, []);

  const handleVote = (id) => {
    localStorage.setItem(`rb-vote-${id}`, '1');
    setVotes(prev => ({ ...prev, [id]: true }));
  };

  const handleRowClick = (b) => { setSelected(selected?.id === b.id ? null : b); };

  return (
    <div className="screen-enter">
      <Ticker />
      <div style={{ padding: isMobile ? '32px 24px' : '48px' }}>

        <div className="stagger" style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: 32, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 0 }}>
          <div>
            <div style={{ ...mono(9, C.red), marginBottom: 8 }}>DOC-ARC · BATCH RECORD · SOUTH AFRICA</div>
            <div style={{ ...grotesk(isMobile ? 22 : 28, 600), letterSpacing: '0.1em', textTransform: 'uppercase' }}>Batch Archive</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} data-hover
                style={{ ...mono(9, filter === f ? C.white : C.dim), background: 'transparent', border: `1px solid ${filter === f ? C.red : C.grey}`, padding: '6px 14px', cursor: 'pointer', transition: 'all 0.15s' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '560px' : 'unset' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.grey}` }}>
                {['Batch ID', 'Item', 'Season', 'Units', 'Price', 'Status', 'Issued'].map(h => (
                  <th key={h} style={{ ...mono(9), padding: '10px 12px', textAlign: 'left', fontWeight: 400, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map(b => {
                const isCS = b.status === 'COMING_SOON';
                return (
                  <tr key={b.id} className="batch-row" onClick={() => handleRowClick(b)}
                    style={{ borderBottom: `1px solid ${C.g2}`, cursor: 'pointer', background: selected?.id === b.id ? '#0F0F0F' : 'transparent' }}>
                    <td className="row-id" style={{ fontFamily: F.m, fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.dim, padding: '12px', transition: 'color 0.15s', whiteSpace: 'nowrap' }}>{b.id}</td>
                    <td style={{ ...grotesk(13), padding: '12px', whiteSpace: 'nowrap' }}>{b.name}</td>
                    <td style={{ ...mono(10, C.dim), padding: '12px', whiteSpace: 'nowrap' }}>{b.season}</td>
                    <td style={{ ...mono(11, C.white), padding: '12px' }}>{b.units}</td>
                    <td style={{ fontFamily: F.m, fontSize: 12, color: C.white, padding: '12px', whiteSpace: 'nowrap' }}>{b.price}</td>
                    <td style={{ padding: '12px' }}><Badge v={b.status === 'ACTIVE' ? 'active' : 'neutral'}>{isCS ? 'INCOMING' : b.status}</Badge></td>
                    <td style={{ ...mono(10), padding: '12px', whiteSpace: 'nowrap' }}>{isCS ? 'TBC' : b.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selected && (
          <div style={{ marginTop: 1, background: C.g2, border: `1px solid ${C.grey}`, padding: isMobile ? 20 : 28, position: 'relative', animation: 'fadeUp 0.2s ease forwards' }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />

            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 16 }}>
              {!isMobile && (
                <div style={{ width: 100, height: 125, background: C.black, border: `1px solid ${C.grey}`, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, background: C.red, zIndex: 1 }} />
                  {selected.images && selected.images[0] ? (
                    <img src={selected.images[0]} alt={selected.name} onError={e => { e.target.style.display = 'none'; }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ ...mono(9, '#222') }}>IMG</span>
                    </div>
                  )}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: isMobile ? 16 : 20, flex: 1 }}>
                {[['Batch ID', selected.id], ['Season', selected.season], ['Origin', selected.origin], ['Issued', selected.date]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ ...mono(8), marginBottom: 4 }}>{k}</div>
                    <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', color: C.white }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${C.grey}`, paddingTop: 16 }}>
              <div style={{ ...mono(8), marginBottom: 6 }}>Description</div>
              <div style={{ ...grotesk(13, 300, '#999'), lineHeight: 1.7 }}>{selected.desc}</div>
            </div>
            <div style={{ display: 'flex', gap: 12, borderTop: `1px solid ${C.grey}`, paddingTop: 16, marginTop: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge v={selected.status === 'ACTIVE' ? 'active' : selected.status === 'COMING_SOON' ? 'neutral' : 'archived'}>{selected.status === 'COMING_SOON' ? 'INCOMING' : selected.status}</Badge>
              <span style={{ ...mono(9), alignSelf: 'center' }}>{selected.units} units · {selected.type} · {selected.fit} fit</span>
              {selected.status === 'ACTIVE' && (
                <button onClick={() => { onSelectBatch(selected.id); onNav('product'); window.scrollTo(0,0); }} style={{ ...mono(9, C.red), background: 'none', border: `1px solid ${C.red}`, padding: '4px 12px', cursor: 'pointer', marginLeft: 'auto' }}>VIEW UNIT →</button>
              )}
            </div>

            {selected.status === 'ARCHIVED' && (
              <div style={{ borderTop: `1px solid ${C.grey}`, paddingTop: 16, marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ ...mono(9, C.red), marginBottom: 4 }}>REISSUE VOTE · {selected.id}</div>
                  <div style={{ ...grotesk(13, 300, '#999'), lineHeight: 1.8 }}>Cast your record. Votes are logged. No guarantees.</div>
                </div>
                <button onClick={() => !votes[selected.id] && handleVote(selected.id)} disabled={votes[selected.id]}
                  style={{ border: `1px solid ${votes[selected.id] ? C.red : C.grey}`, color: votes[selected.id] ? C.red : C.dim, background: 'transparent', ...mono(9, votes[selected.id] ? C.red : C.dim), padding: '6px 16px', cursor: votes[selected.id] ? 'default' : 'pointer', transition: 'all 0.15s' }}>
                  {votes[selected.id] ? 'Vote Recorded.' : 'Cast Vote →'}
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.g2}`, paddingTop: 20, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ ...mono(9) }}>{shown.length} records retrieved</span>
          <span style={{ ...mono(9, C.red) }}>ARCHIVE UPDATED · 2026.04.23</span>
        </div>
      </div>
    </div>
  );
};

/* ── SCREEN: MANIFESTO ── */
const ManifestoScreen = () => {
  const isMobile = useIsMobile();
  const lines = [
    { text: 'Every release is documented.', size: isMobile ? 32 : 48, delay: 0.05 },
    { text: 'Every unit is verified.',       size: isMobile ? 32 : 48, delay: 0.15 },
    { text: 'Nothing is hype.',              size: isMobile ? 44 : 64, delay: 0.28, red: true },
    { text: 'RED-BATCH operates on a simple premise: clothing should be made with intention, released with precision, and archived permanently. No urgency. No restock. No second run.', size: 16, delay: 0.42, body: true },
    { text: 'Record exists.',                size: isMobile ? 22 : 32, delay: 0.55, mono: true },
  ];

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      <Ticker />
      <div style={{ padding: isMobile ? '56px 24px' : '96px 48px', maxWidth: 820 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ marginBottom: l.body ? 48 : 16, opacity: 0, animation: `fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) ${l.delay}s forwards` }}>
            {l.body ? (
              <p style={{ fontFamily: F.g, fontWeight: 300, fontSize: l.size, lineHeight: 1.8, color: '#888', letterSpacing: '0.01em' }}>{l.text}</p>
            ) : l.mono ? (
              <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: l.size, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.red, marginTop: 32 }}>{l.text}</div>
            ) : (
              <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: l.size, letterSpacing: '0.08em', textTransform: 'uppercase', color: l.red ? C.red : C.white, lineHeight: 1 }}>{l.text}</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.grey}`, margin: isMobile ? '0 24px' : '0 48px', paddingTop: 48, paddingBottom: 80, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '40px 64px', maxWidth: 720 }}>
        <div>
          <div style={{ ...mono(9, C.red), marginBottom: 20 }}>Always</div>
          {['Grid-based, aligned layouts', 'Hard edges — zero border-radius', 'Short declarative copy', 'Red used sparingly', 'Mono font for all IDs', 'Corner marks on stamp elements'].map(r => (
            <div key={r} style={{ ...grotesk(13, 400, '#999'), padding: '8px 0', borderBottom: `1px solid ${C.g2}`, lineHeight: 1.5 }}>✓ {r}</div>
          ))}
        </div>
        <div>
          <div style={{ ...mono(9), marginBottom: 20 }}>Never</div>
          {['Gradients or glow effects', 'Emoji or decorative icons', 'Rounded corners', 'Exclamation marks', 'Hype language', 'Decorative elements without function'].map(r => (
            <div key={r} style={{ ...grotesk(13, 400, '#444'), padding: '8px 0', borderBottom: `1px solid ${C.g2}`, lineHeight: 1.5 }}>— {r}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── SCREEN: QUEUE ── */
const QueueScreen = () => {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      <Ticker />
      <div style={{ padding: isMobile ? '40px 24px' : '80px 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, maxWidth: 1100 }}>

        <div className="stagger">
          <div style={{ ...mono(9, C.red), marginBottom: 16 }}>NEXT BATCH — RB-003</div>
          <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: isMobile ? 40 : 52, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1, color: C.white, marginBottom: 32 }}>
            CYCLE-02.<br /><span style={{ color: C.red }}>QUEUE.</span>
          </div>
          <div style={{ ...grotesk(14, 300, '#888'), lineHeight: 1.8, marginBottom: 40, maxWidth: 400 }}>
            {NEXT.desc} Registration does not guarantee access. Units are allocated in order of record creation.
          </div>
          <div style={{ border: `1px solid ${C.grey}`, padding: 24, position: 'relative', maxWidth: 360 }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.grey }} />
            <div style={{ ...mono(8), marginBottom: 16 }}>Next batch — speculative</div>
            {[['Batch ID', 'RB-003'], ['Season', 'CYCLE-02'], ['Est. Release', '2026.TBC'], ['Location', 'South Africa'], ['Status', 'UNANNOUNCED']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.g2}` }}>
                <span style={{ ...mono(9) }}>{k}</span>
                <span style={{ fontFamily: F.m, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: k === 'Status' ? '#444' : C.white }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: isMobile ? 0 : 8 }}>
          {!submitted ? (
            <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ ...grotesk(20, 600), letterSpacing: '0.08em', textTransform: 'uppercase' }}>Register Record</div>
              <Divider />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ ...mono(9), marginBottom: 4 }}>Email address</div>
                <input value={email} onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                  placeholder="archive@domain.com"
                  style={{ background: C.g2, border: `1px solid ${focused ? C.red : C.grey}`, color: C.white, fontFamily: F.g, fontSize: 14, padding: '13px 16px', outline: 'none', borderRadius: 0, transition: 'border-color 0.15s' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ ...mono(9), marginBottom: 4 }}>Preferred size</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(s => (
                    <button key={s} data-hover
                      style={{ width: 48, height: 48, background: 'transparent', border: `1px solid ${C.grey}`, color: C.dim, ...mono(10), cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.target.style.borderColor = C.red; e.target.style.color = C.red; }}
                      onMouseLeave={e => { e.target.style.borderColor = C.grey; e.target.style.color = C.dim; }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ ...mono(9), marginBottom: 4 }}>Notify via</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Email', 'SMS'].map(opt => (
                    <button key={opt} data-hover
                      style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${C.grey}`, ...mono(9, C.dim), cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.white; e.currentTarget.style.color = C.white; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.grey; e.currentTarget.style.color = C.dim; }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <Divider />
              <Btn onClick={() => { if (email) setSubmitted(true); }} disabled={!email}>Submit Record</Btn>
              <div style={{ ...mono(8), lineHeight: 1.8 }}>Registration does not guarantee allocation. Records are permanent. No confirmation email is sent.</div>
            </div>
          ) : (
            <div style={{ animation: 'fadeUp 0.4s ease forwards' }}>
              <div style={{ border: `1px solid ${C.grey}`, padding: isMobile ? 28 : 40, textAlign: 'center', position: 'relative', marginBottom: 32 }}>
                {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
                  <div key={i} style={{ position: 'absolute', width: 8, height: 8, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
                ))}
                <div style={{ ...mono(9, C.red), marginBottom: 12 }}>RECORD CREATED</div>
                <div style={{ ...grotesk(isMobile ? 24 : 32, 700), letterSpacing: '0.08em', textTransform: 'uppercase' }}>Queue active.</div>
                <div style={{ ...mono(10, C.dim), marginTop: 12 }}>CYCLE-02 · RB-003 · EST. 2026.TBC</div>
              </div>
              <div style={{ ...grotesk(13, 300, '#888'), lineHeight: 1.8 }}>
                Your record has been logged. Allocation is not confirmed. You will be notified when the batch opens — if your record qualifies.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── SCREEN: CART ── */
const CartScreen = ({ cart, removeFromCart, onNav }) => {
  const isMobile = useIsMobile();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + DELIVERY_FEE;
  const fmt = (n) => `R ${n.toLocaleString()}`;

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
                        <div style={{ ...mono(8, C.dim), marginBottom: 4 }}>Set includes: {item.setItems.join(' · ')}</div>
                      )}
                      <div style={{ ...mono(9, C.dim), marginBottom: 8 }}>{item.isSet ? 'COMPLETE SET' : item.size} · {item.colour}{item.quantity > 1 ? ` · QTY ${item.quantity}` : ''}</div>
                      <div style={{ fontFamily: F.m, fontSize: 13, color: C.white }}>{fmt(item.price * item.quantity)}</div>
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
              {[['Subtotal', fmt(subtotal)], ['Delivery (Pudo)', fmt(DELIVERY_FEE)]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.g2}` }}>
                  <span style={{ ...grotesk(13, 400, C.dim) }}>{k}</span>
                  <span style={{ fontFamily: F.m, fontSize: 13, color: C.white }}>{v}</span>
                </div>
              ))}
              <Divider color={C.red} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 20px' }}>
                <span style={{ ...grotesk(14, 600) }}>Total</span>
                <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 18, color: C.white }}>{fmt(total)}</span>
              </div>
              <Btn onClick={() => { onNav('checkout'); window.scrollTo(0,0); }} style={{ width: '100%' }}>Proceed to Checkout →</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── SCREEN: CHECKOUT ── */
const CheckoutScreen = ({ cart, onNav, onOrderComplete }) => {
  const isMobile = useIsMobile();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + DELIVERY_FEE;
  const fmt = (n) => `R ${n.toLocaleString()}`;

  const blankForm = { fullName: '', email: '', phone: '', address: '', suburb: '', city: '', province: '', postalCode: '' };
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const provinces = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'];

  const setField = (k, v) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: false })); };

  const iStyle = (k) => ({
    background: C.g2, border: `1px solid ${errors[k] ? C.red : focused === k ? C.red : C.grey}`,
    color: C.white, fontFamily: F.g, fontSize: 14, padding: '13px 16px',
    outline: 'none', borderRadius: 0, transition: 'border-color 0.15s', width: '100%', boxSizing: 'border-box',
  });

  const validate = () => {
    const e = {};
    Object.entries(form).forEach(([k, v]) => { if (!v.trim()) e[k] = true; });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    const parts = form.fullName.trim().split(' ');
    const firstName = parts[0];
    const lastName  = parts.slice(1).join(' ') || '-';
    const orderRef  = `RB${(cart[0]?.id || 'RB-001').replace('RB-', '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const productName = cart.map(i => i.name).join(', ');
    const productDesc = cart.map(i => `${i.name} · ${i.size} · ${i.colour}`).join(', ');

    const emailParams = {
      order_ref: orderRef, product_name: productName,
      size: cart.map(i => i.size).join(', '), colour: cart.map(i => i.colour).join(', '),
      price: fmt(total), customer_name: form.fullName, customer_phone: form.phone,
      customer_email: form.email, address_line1: form.address, suburb: form.suburb,
      city: form.city, province: form.province, postal_code: form.postalCode,
      courier: 'Pudo',
    };

    try {
      if (window.emailjs) {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE, { ...emailParams, to_email: STORE_OWNER_EMAIL });
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE, emailParams);
      }
    } catch (err) { console.error('EmailJS error:', err); }

    onOrderComplete(orderRef);

    const pfParams = {
      merchant_id: PAYFAST_MERCHANT_ID, merchant_key: PAYFAST_MERCHANT_KEY,
      return_url: 'https://redbatch.store/success', cancel_url: 'https://redbatch.store/cancel',
      notify_url: 'https://redbatch.store/.netlify/functions/payfast-notify',
      name_first: firstName, name_last: lastName, email_address: form.email,
      m_payment_id: orderRef, amount: total.toFixed(2),
      item_name: `RED-BATCH ${orderRef}`, item_description: productDesc,
      passphrase: PAYFAST_PASSPHRASE,
    };

    const sigString = Object.keys(pfParams).sort()
      .map(k => `${k}=${encodeURIComponent(pfParams[k]).replace(/%20/g, '+')}`)
      .join('&');
    const signature = (window.md5 ? md5 : () => '')(sigString);
    const submitParams = { ...pfParams, signature };
    delete submitParams.passphrase;

    const pf = document.createElement('form');
    pf.method = 'POST'; pf.action = PAYFAST_URL;
    Object.entries(submitParams).forEach(([k, v]) => {
      const inp = document.createElement('input');
      inp.type = 'hidden'; inp.name = k; inp.value = v;
      pf.appendChild(inp);
    });
    document.body.appendChild(pf);
    pf.submit();
  };

  const textFields = [
    { key: 'fullName', label: 'Full Name',     type: 'text'  },
    { key: 'email',    label: 'Email Address',  type: 'email' },
    { key: 'phone',    label: 'Phone Number',   type: 'tel'   },
    { key: 'address',  label: 'Street Address', type: 'text'  },
    { key: 'suburb',   label: 'Suburb',         type: 'text'  },
    { key: 'city',     label: 'City',           type: 'text'  },
  ];

  return (
    <div className="screen-enter">
      <Ticker />
      <div style={{ padding: isMobile ? '32px 24px' : '48px' }}>
        <div style={{ ...mono(9, C.red), marginBottom: 12 }}>DELIVERY RECORD</div>
        <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: isMobile ? 36 : 52, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 40 }}>CHECKOUT.</div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: isMobile ? 40 : 48, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {textFields.map(({ key, label, type }) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ ...mono(9), marginBottom: 2 }}>{label} *</div>
                <input type={type} value={form[key]} onChange={e => setField(key, e.target.value)}
                  onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
                  style={iStyle(key)} />
                {errors[key] && <div style={{ ...mono(9, C.red) }}>Field required.</div>}
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ ...mono(9), marginBottom: 2 }}>Province *</div>
              <select value={form.province} onChange={e => setField('province', e.target.value)}
                onFocus={() => setFocused('province')} onBlur={() => setFocused(null)}
                style={{ ...iStyle('province'), cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}>
                <option value="">Select province</option>
                {provinces.map(p => <option key={p} value={p} style={{ background: C.g2, color: C.white }}>{p}</option>)}
              </select>
              {errors.province && <div style={{ ...mono(9, C.red) }}>Field required.</div>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ ...mono(9), marginBottom: 2 }}>Postal Code *</div>
              <input type="text" value={form.postalCode} onChange={e => setField('postalCode', e.target.value)}
                onFocus={() => setFocused('postalCode')} onBlur={() => setFocused(null)}
                style={iStyle('postalCode')} />
              {errors.postalCode && <div style={{ ...mono(9, C.red) }}>Field required.</div>}
            </div>
          </div>

          <div style={{ border: `1px solid ${C.grey}`, padding: 28, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
            <div style={{ ...mono(9, C.red), marginBottom: 20 }}>ORDER SUMMARY</div>
            {cart.map(item => (
              <div key={`${item.id}-${item.size}-${item.colour}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.g2}` }}>
                <div>
                  <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', color: C.white }}>{item.name}</div>
                  <div style={{ ...mono(8, C.dim), marginTop: 3 }}>{item.isSet ? 'COMPLETE SET' : item.size} · {item.colour}</div>
                </div>
                <span style={{ fontFamily: F.m, fontSize: 12, color: C.white }}>{fmt(item.price * item.quantity)}</span>
              </div>
            ))}
            {[['Subtotal', fmt(subtotal)], ['Delivery (Pudo)', fmt(DELIVERY_FEE)]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.g2}` }}>
                <span style={{ ...grotesk(13, 400, C.dim) }}>{k}</span>
                <span style={{ fontFamily: F.m, fontSize: 13, color: C.white }}>{v}</span>
              </div>
            ))}
            <Divider color={C.red} />
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0' }}>
              <span style={{ ...grotesk(14, 600) }}>Total</span>
              <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 18, color: C.white }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40, borderTop: `1px solid ${C.grey}`, paddingTop: 32 }}>
          <Btn onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Processing...' : 'Confirm Order — Pay Now →'}
          </Btn>
        </div>
      </div>
    </div>
  );
};

/* ── SCREEN: SUCCESS ── */
const SuccessScreen = ({ orderRef, clearCart, onNav }) => {
  const isMobile = useIsMobile();
  useEffect(() => { clearCart(); }, []);

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      <Ticker />
      <div style={{ padding: isMobile ? '64px 24px' : '120px 48px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <div style={{ border: `1px solid ${C.grey}`, padding: isMobile ? 40 : 56, position: 'relative', marginBottom: 32 }}>
            {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
              <div key={i} style={{ position: 'absolute', width: 8, height: 8, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
            ))}
            <div style={{ ...mono(9, C.red), marginBottom: 16 }}>PAYMENT CONFIRMED.</div>
            <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: isMobile ? 32 : 44, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 20 }}>Access granted.</div>
            {orderRef && <div style={{ ...mono(10, C.dim), marginBottom: 20 }}>{orderRef}</div>}
            <div style={{ ...grotesk(14, 300, '#888'), lineHeight: 1.8 }}>
              Your unit is being prepared. You will be contacted once your order has been dispatched.
            </div>
          </div>
          <Btn v="ghost" onClick={() => { onNav('drop'); window.scrollTo(0,0); }}>Return to Drop</Btn>
        </div>
      </div>
    </div>
  );
};

/* ── SCREEN: CANCEL ── */
const CancelScreen = ({ onNav }) => {
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

/* ── SCREEN: MERCH ── */
const MerchScreen = ({ onNav }) => {
  const isMobile = useIsMobile();
  const [noted, setNoted] = useState(() => !!localStorage.getItem('rb-merch-notify'));

  const handleNotify = () => { localStorage.setItem('rb-merch-notify', '1'); setNoted(true); };

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Ticker />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 600, margin: '0 auto', padding: isMobile ? '64px 24px' : '80px 48px', textAlign: 'center', width: '100%' }}>

        <div style={{ fontFamily: F.m, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.red, marginBottom: 24, animation: 'glitch 4s ease infinite, glitch-color 4s ease infinite' }}>
          MERCH · OBJECTS · COLLECTIBLES
        </div>

        <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(48px,8vw,96px)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 0.92, marginBottom: 40 }}>
          <div style={{ color: C.white }}>COMING</div>
          <div style={{ color: C.red }}>SOON.</div>
        </div>

        <div style={{ borderBottom: `1px solid ${C.grey}`, marginBottom: 40 }} />

        <div style={{ fontFamily: F.g, fontWeight: 300, fontSize: 14, color: '#888', lineHeight: 1.8, marginBottom: 32 }}>
          Mugs. Metal prints. Canvas prints. Objects from the RED-BATCH system. Not clothing. Everything else. Dropping alongside CYCLE-02.
        </div>

        <div style={{ ...mono(9, C.dim), marginBottom: 32 }}>RECORD WILL EXIST.</div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Btn v="ghost" onClick={noted ? undefined : handleNotify} disabled={noted}>
            {noted ? 'Noted. Record created.' : 'Notify Me →'}
          </Btn>
        </div>

        <div style={{ border: `1px solid ${C.grey}`, padding: 24, maxWidth: 320, margin: '48px auto 0', position: 'relative' }}>
          {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
            <div key={i} style={{ position: 'absolute', width: 6, height: 6, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
          ))}
          <div style={{ ...mono(8, C.dim), marginBottom: 8 }}>SECTION</div>
          <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white, marginBottom: 12 }}>MERCH · OBJECTS</div>
          <div style={{ borderBottom: `1px solid ${C.grey}`, marginBottom: 12 }} />
          <div style={{ ...mono(9, C.dim), marginBottom: 4 }}>STATUS</div>
          <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.red }}>UNANNOUNCED</div>
        </div>
      </div>
    </div>
  );
};

/* ── SET CARD ── */
const SetCard = ({ set, addToCart, onNav, isMobile }) => {
  const [setColour, setSetColour] = useState(null);
  const [added, setAdded] = useState(false);
  const isArchived = set.status !== 'ACTIVE';

  const handleAddSet = () => {
    if (!setColour) return;
    addToCart({
      id: set.id,
      name: set.name,
      price: parsePrice(set.price),
      size: 'SET',
      colour: setColour,
      isSet: true,
      setItems: set.items,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ background: C.black, position: 'relative' }}>
      {!isArchived && <div style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, background: C.red, zIndex: 1 }} />}

      <div style={{ aspectRatio: '3/2', background: C.g2, position: 'relative', overflow: 'hidden' }}>
        {set.images && set.images[0] ? (
          <img src={set.images[0]} alt={set.name}
            onError={e => { e.target.style.display = 'none'; }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid ${C.grey}` }}>
              <span style={{ ...mono(9, '#333') }}>TEE</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...mono(9, '#333') }}>HOOD</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ ...mono(9, C.dim) }}>{set.id} · {set.cycle}</div>
        <div style={{ ...grotesk(14, 600), letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{set.name}</div>
        <div style={{ ...mono(9, C.dim), marginTop: 4 }}>Includes {set.items.length} items</div>

        <div style={{ borderBottom: `1px solid ${C.grey}`, margin: '14px 0' }} />

        <div style={{ marginBottom: 14 }}>
          {set.includes.map((inc, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
              <div style={{ width: 4, height: 4, background: C.red, flexShrink: 0 }} />
              <span style={{ ...mono(9, C.dim) }}>{inc}</span>
            </div>
          ))}
        </div>

        <div style={{ borderBottom: `1px solid ${C.grey}`, margin: '14px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 16, color: C.white }}>{set.price}</span>
          <span style={{ ...mono(9, C.dim) }}>{set.units} sets remaining.</span>
        </div>

        {isArchived ? (
          <>
            <Badge v="archived">ARCHIVED</Badge>
            <div style={{ ...mono(9, C.dim), marginTop: 8 }}>This set is permanently archived.</div>
            <div style={{ marginTop: 12 }}>
              <Btn v="ghost" onClick={() => { onNav('archive'); window.scrollTo(0,0); }}>View in Archive →</Btn>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 12 }}>
              <div style={{ ...mono(9, C.dim), marginBottom: 8 }}>
                Select colourway{setColour && <span style={{ color: C.red }}> — {setColour}</span>}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Washed Black', 'Off-White'].map(cw => {
                  const sel = setColour === cw;
                  return (
                    <button key={cw} onClick={() => setSetColour(cw)}
                      style={{ padding: '10px 16px', background: sel ? C.red : 'transparent', border: `1px solid ${sel ? C.red : C.grey}`, color: sel ? C.white : C.dim, ...mono(10), cursor: 'pointer', transition: 'all 0.15s' }}>
                      {cw}
                    </button>
                  );
                })}
              </div>
            </div>

            <Btn onClick={handleAddSet} disabled={!setColour} style={{ width: '100%' }}>
              {added ? 'Set Added.' : 'Add Set to Cart'}
            </Btn>

            <div style={{ ...mono(8, C.dim), lineHeight: 1.8, marginTop: 10 }}>
              Sets ship together. Delivery: R 60 via Pudo.<br />
              This set exists in the archive permanently after closing.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ── SCREEN: SETS ── */
const SetsScreen = ({ onNav, cart, addToCart }) => {
  const isMobile = useIsMobile();

  return (
    <div className="screen-enter">
      <Ticker />

      <div style={{ padding: isMobile ? '32px 24px 40px' : '48px 48px 64px', borderBottom: `1px solid ${C.grey}` }}>
        <div className="stagger">
          <div style={{ ...mono(9, C.red), marginBottom: 16 }}>THE RECORD · CYCLE SETS · PERMANENT</div>
          <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>THE RECORD.</div>
          <div style={{ ...grotesk(14, 300, '#999'), maxWidth: 560, lineHeight: 1.8, marginTop: 24 }}>
            Every cycle produces one set. A tee and a hoodie — the complete look, issued together as a single verified unit. Once a cycle closes, the set is permanent. It never restocks. It never disappears. It exists in the archive forever — a purchasable memory you can still own.
          </div>
          <div style={{ ...mono(9, C.dim), marginTop: 16 }}>Sets are separate from individual batch drops. Limited to 20 units per cycle.</div>
        </div>
      </div>

      <Divider />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 1, background: C.grey }}>
        {SETS.map(set => (
          <SetCard key={set.id} set={set} addToCart={addToCart} onNav={onNav} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
};

/* ── SCREEN: ORIGIN ── */
const OriginScreen = ({ onNav }) => {
  const isMobile = useIsMobile();

  const sections = [
    { label: 'RECORD', body: 'RED-BATCH started as a question: what if clothing worked like a limited document. Not a trend. Not a drop culture flex. A record. Something issued, numbered, and permanent.' },
    { label: 'THE SYSTEM', body: 'Every batch has an ID. Every unit has a number. When a batch closes, it is archived — not deleted. The archive is not a graveyard. It is proof. Proof that something real existed, was made, and was claimed.' },
    { label: 'SOUTH AFRICA', body: 'This brand is South African. Built here, shipped from here, for here first. The manufacturing, the printing, the delivery — all local. That is not a selling point. That is just the record.' },
    { label: 'THE CYCLE', body: 'A cycle is not a season. It ends when it sells out, not when the calendar says so. CYCLE-01 is the first. When it is gone, it is gone. CYCLE-02 will be different. Every cycle will be different. That is the only promise.' },
    { label: 'THE GOAL', body: 'To build something that lasts without being loud about it. No hype. No countdown timers. No collab drops for attention. Just the work. Just the record.' },
  ];

  return (
    <div className="screen-enter">
      <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? '48px 24px' : '80px 48px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `1px solid ${C.grey}`, paddingBottom: 24, marginBottom: 48 }}>
          <div>
            <div style={{ ...mono(9, C.red) }}>DOC-000</div>
            <div style={{ ...grotesk(13, 700), letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>RED-BATCH</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...mono(9, C.dim), lineHeight: 1.8 }}>
              ORIGIN DOCUMENT<br />
              2026<br />
              SOUTH AFRICA
            </div>
          </div>
        </div>

        <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(48px,8vw,80px)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 0.92, marginBottom: 48, opacity: 0, animation: 'fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) 0.05s forwards' }}>
          ORIGIN.
        </div>

        {sections.map((s, i) => (
          <div key={s.label} style={{ marginBottom: 40, opacity: 0, animation: `fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) ${0.12 + i * 0.08}s forwards` }}>
            <div style={{ ...mono(9, C.red), marginBottom: 12 }}>{s.label}</div>
            <div style={{ ...grotesk(15, 300, '#999'), lineHeight: 2.0 }}>{s.body}</div>
          </div>
        ))}

        <div style={{ borderBottom: `1px solid ${C.grey}`, margin: '48px 0' }} />

        <div style={{ border: `1px solid ${C.grey}`, padding: 32, maxWidth: 320, position: 'relative' }}>
          {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
            <div key={i} style={{ position: 'absolute', width: 6, height: 6, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
          ))}
          <div style={{ ...mono(8, C.dim) }}>DOCUMENT</div>
          <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.white, marginTop: 8 }}>DOC-000 · ORIGIN</div>
          <div style={{ borderBottom: `1px solid ${C.grey}`, margin: '16px 0' }} />
          <div style={{ ...mono(9, C.dim) }}>FILED</div>
          <div style={{ ...mono(11, C.white), marginTop: 4 }}>2026 · SOUTH AFRICA</div>
          <div style={{ marginTop: 8 }}>
            <div style={{ ...mono(9, C.dim) }}>STATUS</div>
            <div style={{ ...mono(11, C.red), marginTop: 4 }}>ACTIVE</div>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <Btn v="ghost" onClick={() => { onNav('drop'); window.scrollTo(0,0); }}>View Current Drop →</Btn>
        </div>

      </div>
    </div>
  );
};

/* ── SCREEN: CONTACT ── */
const ContactScreen = ({ onNav }) => {
  const isMobile = useIsMobile();
  const [cForm, setCForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [cErrors, setCErrors] = useState({});
  const [cFocused, setCFocused] = useState(null);
  const [cSent, setCSent] = useState(false);
  const [cSending, setCSending] = useState(false);
  const [contactRef, setContactRef] = useState('');

  const cStyle = (k) => ({
    background: '#1A1A1A',
    border: `1px solid ${cErrors[k] ? C.red : cFocused === k ? C.red : '#2A2A2A'}`,
    color: C.white, fontFamily: F.g, fontSize: 14, padding: '13px 16px',
    outline: 'none', borderRadius: 0, transition: 'border-color 0.15s', width: '100%', boxSizing: 'border-box',
  });

  const setField = (k, v) => {
    setCForm(f => ({ ...f, [k]: v }));
    if (cErrors[k]) setCErrors(e => ({ ...e, [k]: false }));
  };

  const handleSubmit = async () => {
    const e = {};
    Object.entries(cForm).forEach(([k, v]) => { if (!v.trim()) e[k] = true; });
    setCErrors(e);
    if (Object.keys(e).length > 0) return;
    setCSending(true);
    const ref = `RBC-${Math.floor(1000 + Math.random() * 9000)}`;
    setContactRef(ref);
    try {
      if (window.emailjs) {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE, {
          contact_ref: ref, customer_name: cForm.name, customer_email: cForm.email,
          subject: cForm.subject, message: cForm.message, type: 'CONTACT', to_email: STORE_OWNER_EMAIL,
        });
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE, {
          contact_ref: ref, customer_name: cForm.name, customer_email: cForm.email,
          subject: cForm.subject, message: cForm.message, type: 'CONTACT_REPLY',
        });
      }
    } catch (err) { console.error('EmailJS error:', err); }
    setCSent(true);
    setCSending(false);
  };

  const infoCards = [
    { label: 'ORDER SUPPORT',    desc: 'Order issues, tracking, returns.' },
    { label: 'SIZING & PRODUCT', desc: 'Fit questions before you buy.' },
    { label: 'GENERAL',          desc: 'Everything else. Collaborations. Press.' },
  ];

  return (
    <div className="screen-enter">
      <Ticker />
      <div style={{ padding: isMobile ? '40px 24px' : '64px 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 64, maxWidth: 1100 }}>

        <div>
          <div style={{ ...mono(9, C.red), marginBottom: 16 }}>CONTACT · SUPPORT · RED-BATCH</div>
          <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(32px,5vw,56px)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: 32 }}>
            <div style={{ color: C.white }}>GET IN</div>
            <div style={{ color: C.red }}>TOUCH.</div>
          </div>
          <div style={{ ...grotesk(14, 300, '#888'), maxWidth: 400, lineHeight: 1.9, marginBottom: 40 }}>
            Questions about an order, sizing, or the system. Fill in the form and a record will be created. Response time is typically within 24 hours.
          </div>
          <div>
            {infoCards.map(({ label, desc }) => (
              <div key={label} style={{ border: `1px solid ${C.grey}`, padding: '16px 20px', marginBottom: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 8, height: 8, background: C.red, flexShrink: 0 }} />
                <div>
                  <div style={{ ...mono(8, C.dim) }}>{label}</div>
                  <div style={{ ...grotesk(13, 400, C.white), marginTop: 2 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...mono(9, C.dim), lineHeight: 1.8, marginTop: 24 }}>
            Response time: within 24 hours.<br />
            South Africa only at this time.
          </div>
        </div>

        <div>
          <div style={{ ...grotesk(20, 600), letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Send a Record</div>
          <Divider />
          {cSent ? (
            <div style={{ border: `1px solid ${C.grey}`, padding: 40, textAlign: 'center', position: 'relative', marginTop: 24 }}>
              {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
                <div key={i} style={{ position: 'absolute', width: 6, height: 6, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
              ))}
              <div style={{ ...mono(9, C.red) }}>RECORD CREATED.</div>
              <div style={{ ...grotesk(28, 700), letterSpacing: '0.08em', textTransform: 'uppercase', margin: '16px 0' }}>Message received.</div>
              <div style={{ ...mono(10, C.dim) }}>Ref: {contactRef}</div>
              <div style={{ ...grotesk(14, 300, '#888'), lineHeight: 1.8, marginTop: 16 }}>
                A record of your message has been created.<br />
                We will respond to {cForm.email} within 24 hours.
              </div>
              <div style={{ marginTop: 32 }}>
                <Btn v="ghost" onClick={() => { onNav('drop'); window.scrollTo(0,0); }}>Return to Drop</Btn>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 24 }}>
              {[
                { key: 'name',  label: 'FULL NAME',      type: 'text'  },
                { key: 'email', label: 'EMAIL ADDRESS',   type: 'email' },
              ].map(({ key, label, type }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <label style={{ ...mono(9, C.dim) }}>{label}</label>
                  <input type={type} value={cForm[key]} onChange={e => setField(key, e.target.value)}
                    onFocus={() => setCFocused(key)} onBlur={() => setCFocused(null)}
                    style={cStyle(key)} />
                  {cErrors[key] && <span style={{ ...mono(8, C.red) }}>Required.</span>}
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                <label style={{ ...mono(9, C.dim) }}>SUBJECT</label>
                <select value={cForm.subject} onChange={e => setField('subject', e.target.value)}
                  onFocus={() => setCFocused('subject')} onBlur={() => setCFocused(null)}
                  style={{ ...cStyle('subject'), cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="">Select subject</option>
                  {['Order Support', 'Sizing & Product Question', 'Collaboration / Press', 'General Enquiry'].map(opt => (
                    <option key={opt} value={opt} style={{ background: C.g2, color: C.white }}>{opt}</option>
                  ))}
                </select>
                {cErrors.subject && <span style={{ ...mono(8, C.red) }}>Required.</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
                <label style={{ ...mono(9, C.dim) }}>MESSAGE</label>
                <textarea value={cForm.message} onChange={e => setField('message', e.target.value)}
                  onFocus={() => setCFocused('message')} onBlur={() => setCFocused(null)}
                  style={{ ...cStyle('message'), minHeight: 140, resize: 'vertical' }} />
                {cErrors.message && <span style={{ ...mono(8, C.red) }}>Required.</span>}
              </div>
              <Btn onClick={handleSubmit} disabled={cSending}>
                {cSending ? 'Sending...' : 'Send Record →'}
              </Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── APP ── */
const App = () => {
  const [screen, setScreen] = useState('drop');
  const [selectedBatchId, setSelectedBatchId] = useState('RB-001');
  const [cart, setCart] = useState([]);
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => { if (window.emailjs) emailjs.init(EMAILJS_PUBLIC_KEY); }, []);

  const nav = s => { setScreen(s); };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id && c.size === item.size && c.colour === item.colour);
      if (existing) return prev.map(c => c.id === item.id && c.size === item.size && c.colour === item.colour ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size, colour) => setCart(prev => prev.filter(c => !(c.id === id && c.size === size && c.colour === colour)));
  const clearCart = () => setCart([]);
  const onOrderComplete = (ref) => setOrderRef(ref);

  const screens = {
    drop:      <DropScreen onNav={nav} onSelectBatch={setSelectedBatchId} />,
    product:   <ProductScreen onNav={nav} batchId={selectedBatchId} cart={cart} addToCart={addToCart} onSelectBatch={setSelectedBatchId} />,
    archive:   <ArchiveScreen onNav={nav} onSelectBatch={setSelectedBatchId} />,
    manifesto: <ManifestoScreen />,
    queue:     <QueueScreen />,
    sets:      <SetsScreen onNav={nav} cart={cart} addToCart={addToCart} />,
    origin:    <OriginScreen onNav={nav} />,
    cart:      <CartScreen cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} onNav={nav} />,
    checkout:  <CheckoutScreen cart={cart} onNav={nav} onOrderComplete={onOrderComplete} />,
    success:   <SuccessScreen orderRef={orderRef} clearCart={clearCart} onNav={nav} />,
    cancel:    <CancelScreen onNav={nav} />,
    merch:     <MerchScreen onNav={nav} />,
    contact:   <ContactScreen onNav={nav} />,
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: F.g, color: C.white, display: 'flex', flexDirection: 'column' }}>
      <Header screen={screen} onNav={nav} cart={cart} />
      <div key={screen} style={{ flex: 1 }}>{screens[screen]}</div>
      <Footer onNav={nav} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
