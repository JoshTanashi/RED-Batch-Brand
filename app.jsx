/* RED-BATCH · React App */

const { useState, useEffect } = React;

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

/* ── DATA ── */
const BATCHES = [
  { id: 'RB-001', season: 'SS26-A', name: 'Heavy Tee',       units: 120, status: 'ACTIVE',   date: '2026.04.21', price: 'R 850',   sizes: ['XS','S','M','L','XL'],        origin: 'South Africa', weight: '320gsm Cotton',  fit: 'Oversized', type: 'Tee',    desc: 'Heavyweight 320gsm cotton. Single dye lot, one wash. Each unit receives a permanent batch identifier at point of manufacture.' },
  { id: 'RB-002', season: 'SS26-A', name: 'Pullover Hoodie', units: 80,  status: 'ACTIVE',   date: '2026.04.21', price: 'R 1 200', sizes: ['S','M','L','XL'],             origin: 'South Africa', weight: '380gsm Fleece',  fit: 'Oversized', type: 'Hoodie', desc: 'Heavyweight 380gsm fleece. Kangaroo pocket, ribbed hem and cuffs. Drop shoulder. Batch identifier stitched into left hem seam.' },
  { id: 'RB-003', season: 'SS26-A', name: 'Acid Wash Tee',   units: 60,  status: 'ACTIVE',   date: '2026.04.21', price: 'R 950',   sizes: ['XS','S','M','L','XL'],        origin: 'South Africa', weight: '280gsm Cotton',  fit: 'Regular',   type: 'Tee',    desc: 'Single garment acid wash. Each unit is unique — no two are identical. Heavyweight 280gsm cotton base. Batch record reflects wash date and dye lot.' },
  { id: 'RB-004', season: 'AW25-A', name: 'Zip Hoodie',      units: 100, status: 'ARCHIVED', date: '2025.10.15', price: 'R 1 350', sizes: ['S','M','L','XL','2XL'],       origin: 'South Africa', weight: '360gsm Fleece',  fit: 'Slim',      type: 'Hoodie', desc: 'Full-zip fleece hoodie. Fitted silhouette, lined hood. Batch closed 2025.11.01.' },
  { id: 'RB-005', season: 'AW25-A', name: 'Blank Tee',       units: 200, status: 'ARCHIVED', date: '2025.10.02', price: 'R 750',   sizes: ['XS','S','M','L','XL','2XL'], origin: 'South Africa', weight: '240gsm Cotton',  fit: 'Regular',   type: 'Tee',    desc: 'Clean 240gsm cotton tee. No graphics, no logo placement. Batch identifier only. Archive updated 2025.11.15.' },
  { id: 'RB-006', season: 'AW25-B', name: 'Quarter Zip',     units: 75,  status: 'ARCHIVED', date: '2025.11.18', price: 'R 1 100', sizes: ['S','M','L','XL'],             origin: 'South Africa', weight: '320gsm Fleece',  fit: 'Regular',   type: 'Hoodie', desc: 'Quarter-zip sweat top. Ribbed collar and cuffs. Batch closed 2025.12.10.' },
  { id: 'RB-007', season: 'SS25-A', name: 'Washed Tee',      units: 150, status: 'ARCHIVED', date: '2025.04.09', price: 'R 800',   sizes: ['XS','S','M','L','XL'],        origin: 'South Africa', weight: '300gsm Cotton',  fit: 'Oversized', type: 'Tee',    desc: 'Pre-washed 300gsm cotton. Soft hand feel, relaxed drape. Archive updated 2025.05.20.' },
  { id: 'RB-008', season: 'SS25-A', name: 'Oversized Hoodie',units: 90,  status: 'ARCHIVED', date: '2025.04.09', price: 'R 1 250', sizes: ['S','M','L','XL'],             origin: 'South Africa', weight: '400gsm Fleece',  fit: 'Oversized', type: 'Hoodie', desc: 'Ultra-heavyweight 400gsm fleece. Drop shoulder, relaxed fit. Batch record references SS25-A dye lot. Archive updated 2025.05.20.' },
];

const ACTIVE_BATCHES = BATCHES.filter(b => b.status === 'ACTIVE');
const ACTIVE_UNITS   = ACTIVE_BATCHES.reduce((s, b) => s + b.units, 0);
const NEXT = { id: 'RB-009', season: 'AW26-A', date: '2026.09.01', desc: 'Batch not yet released. Register to receive notification when the record opens.' };

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
  const items = ['SS26-A', 'RELEASE ACTIVE', `${ACTIVE_UNITS} UNITS`, '2026.04.21', 'SOUTH AFRICA', 'VERIFIED DROP', 'RED-BATCH SYSTEM', 'DOC-001'];
  const row = items.map((t, i) => <span key={i}>{t}</span>);
  return (
    <div style={{ background: C.g2, borderBottom: `1px solid ${C.grey}`, overflow: 'hidden', height: '30px', display: 'flex', alignItems: 'center' }}>
      <div className="ticker-inner">{row}{row}</div>
    </div>
  );
};

/* ── HEADER ── */
const Header = ({ screen, onNav }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'drop',      label: 'DROP' },
    { id: 'product',   label: 'PRODUCT' },
    { id: 'archive',   label: 'ARCHIVE' },
    { id: 'manifesto', label: 'MANIFESTO' },
    { id: 'queue',     label: 'QUEUE' },
  ];

  const handleNav = (id) => { onNav(id); setMenuOpen(false); };

  return (
    <>
      <header style={{ background: 'rgba(13,13,13,0.95)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${C.grey}`, padding: isMobile ? '0 24px' : '0 48px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 200 }}>
        <div style={{ ...grotesk(15, 700), letterSpacing: '0.22em', textTransform: 'uppercase', userSelect: 'none' }}>
          RED<span style={{ color: C.red }}>-</span>BATCH
        </div>

        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: `1px solid ${menuOpen ? C.red : C.grey}`, ...mono(8, menuOpen ? C.red : C.dim), padding: '6px 12px', cursor: 'pointer', transition: 'all 0.15s' }}>
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        ) : (
          <>
            <nav style={{ display: 'flex' }}>
              {navItems.map(({ id, label }) => {
                const active = screen === id;
                return (
                  <button key={id} onClick={() => onNav(id)} style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${active ? C.red : 'transparent'}`, color: active ? C.white : C.dim, ...mono(9), padding: '0 20px', height: '58px', cursor: 'pointer', transition: 'color 0.15s, border-color 0.15s' }}>
                    {label}
                  </button>
                );
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red, animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ ...mono(9, C.red) }}>ACTIVE</span>
            </div>
          </>
        )}
      </header>

      {/* Mobile nav overlay */}
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
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, paddingTop: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red, animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ ...mono(9, C.red) }}>RELEASE ACTIVE · SS26-A</span>
          </div>
        </div>
      )}
    </>
  );
};

/* ── PRODUCT CARD ── */
const ProductCardInline = ({ batch, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      data-hover
      style={{ background: C.black, cursor: 'pointer', position: 'relative', border: `1px solid ${hov ? C.red : C.grey}`, transition: 'border-color 0.2s' }}>
      <div style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, background: batch.status === 'ACTIVE' ? C.red : 'transparent', transition: 'background 0.2s', zIndex: 1 }} />
      <div style={{ aspectRatio: '4/5', background: C.g2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <span style={{ ...mono(9, '#222') }}>IMAGE SLOT</span>
        <div style={{ position: 'absolute', inset: 0, background: `rgba(178,34,34,${hov ? 0.04 : 0})`, transition: 'background 0.3s' }} />
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ ...mono(9) }}>{batch.id} · {batch.season}</div>
        <div style={{ ...grotesk(14, 600), letterSpacing: '0.06em', textTransform: 'uppercase' }}>{batch.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <span style={{ fontFamily: F.m, fontSize: 13, color: C.white }}>{batch.price}</span>
          <Badge v={batch.status === 'ACTIVE' ? 'active' : 'neutral'}>{batch.status}</Badge>
        </div>
      </div>
    </div>
  );
};

/* ── SCREEN: DROP ── */
const DropScreen = ({ onNav, onSelectBatch }) => {
  const isMobile = useIsMobile();
  const P = isMobile ? '24px' : '48px';

  const handleCardClick = (batch) => {
    onSelectBatch(batch.id);
    onNav('product');
  };

  return (
    <div className="screen-enter">
      <Ticker />

      {/* Hero */}
      <div style={{ padding: isMobile ? '48px 24px 40px' : '80px 48px 64px', borderBottom: `1px solid ${C.grey}`, position: 'relative', overflow: 'hidden' }}>
        <div className="stagger">
          <div style={{ ...mono(10, C.red), marginBottom: 16 }}>SS26-A · 2026.04.21 · SOUTH AFRICA</div>
          <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(48px,8vw,96px)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 0.95, color: C.white }}>
            RELEASE<br /><span style={{ color: C.red }}>ACTIVE.</span>
          </div>
          <div style={{ marginTop: 32, ...grotesk(14, 300, '#999'), maxWidth: 520, lineHeight: 1.8 }}>
            Batch SS26-A is live. Three units available. Each piece is logged, catalogued, and assigned a permanent identifier at point of manufacture. Access is not guaranteed. No restock.
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <Btn onClick={() => onNav('archive')}>Browse Archive</Btn>
            <Btn v="secondary" onClick={() => onNav('queue')}>Join Queue</Btn>
          </div>
        </div>
        {!isMobile && (
          <div style={{ position: 'absolute', right: 48, bottom: -20, fontFamily: F.m, fontWeight: 700, fontSize: '180px', letterSpacing: '0.04em', color: 'rgba(178,34,34,0.04)', pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>SS26-A</div>
        )}
      </div>

      {/* Stats bar */}
      <div style={{ borderBottom: `1px solid ${C.grey}`, display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr' }}>
        {[['Units Issued', ACTIVE_UNITS.toString()], ['Season', 'SS26-A'], ['Active Drops', ACTIVE_BATCHES.length.toString()], ['Status', 'ACTIVE']].map(([k, v], i) => {
          const isLast = i === 3;
          const isSecondOnMobile = i === 1;
          return (
            <div key={k} style={{
              padding: isMobile ? '16px 20px' : '20px 32px',
              borderRight: isMobile ? (isSecondOnMobile ? 'none' : `1px solid ${C.grey}`) : (isLast ? 'none' : `1px solid ${C.grey}`),
              borderBottom: isMobile && i < 2 ? `1px solid ${C.grey}` : 'none',
            }}>
              <div style={{ ...mono(9), marginBottom: 6 }}>{k}</div>
              <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: isMobile ? 15 : 18, letterSpacing: '0.1em', textTransform: 'uppercase', color: k === 'Status' ? C.red : C.white }}>{v}</div>
            </div>
          );
        })}
      </div>

      {/* Current drop products */}
      <div style={{ padding: isMobile ? '32px 24px' : '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <div style={{ ...mono(9), marginBottom: 0 }}>Current drop — {ACTIVE_BATCHES.length} units</div>
          <span style={{ ...mono(8, C.red) }}>SS26-A</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill,minmax(160px,1fr))' : 'repeat(auto-fill,minmax(240px,1fr))', gap: 1, background: C.grey }}>
          {ACTIVE_BATCHES.map(b => (
            <ProductCardInline key={b.id} batch={b} onClick={() => handleCardClick(b)} />
          ))}
        </div>
      </div>

      {/* Archive preview */}
      <div style={{ padding: isMobile ? '0 24px 48px' : '0 48px 64px' }}>
        <div style={{ borderTop: `1px solid ${C.grey}`, paddingTop: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <div style={{ ...grotesk(isMobile ? 16 : 20, 600), letterSpacing: '0.1em', textTransform: 'uppercase' }}>Recent Archive</div>
            <button onClick={() => onNav('archive')} style={{ ...mono(9, C.red), background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>View all →</button>
          </div>
          {BATCHES.filter(b => b.status === 'ARCHIVED').slice(0, 4).map(b => (
            <div key={b.id} className="batch-row" onClick={() => onNav('archive')}
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
const ProductScreen = ({ onNav, batchId }) => {
  const isMobile = useIsMobile();
  const batch = BATCHES.find(b => b.id === batchId) || BATCHES[0];
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [hovSize, setHovSize] = useState(null);

  return (
    <div className="screen-enter">
      <Ticker />
      <div style={{ padding: isMobile ? '24px' : '48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '64px', maxWidth: 1100 }}>

        {/* Image col */}
        <div>
          <div style={{ border: `1px solid ${C.grey}`, aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: C.g2 }}>
            <span style={{ ...mono(9, '#222') }}>PRODUCT IMAGE</span>
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <div style={{ border: `1px solid ${C.grey}`, padding: '4px 10px', ...mono(9), background: C.black }}>{batch.id}</div>
            </div>
            <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
              <Badge v={batch.status === 'ACTIVE' ? 'active' : 'neutral'}>{batch.status}</Badge>
            </div>
          </div>
          <div style={{ marginTop: 16, border: `1px solid ${C.grey}`, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: -1,   width: 8, height: 8, background: C.red }} />
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

        {/* Detail col */}
        <div className="stagger" style={{ paddingTop: isMobile ? 0 : 8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ ...mono(9, C.red), marginBottom: 8 }}>{batch.season} · {batch.type.toUpperCase()} · {batch.status}</div>
            <div style={{ ...grotesk(isMobile ? 24 : 32, 600), letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>{batch.name}</div>
            <div style={{ fontFamily: F.m, fontSize: 20, color: C.white, marginTop: 14 }}>{batch.price}</div>
          </div>

          <Divider />
          <div style={{ ...grotesk(14, 300, '#999'), lineHeight: 1.8 }}>{batch.desc}</div>
          <Divider />

          <div>
            <div style={{ ...mono(9), marginBottom: 12 }}>
              Select size {size && <span style={{ color: C.red }}>— {size}</span>}
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

          <Btn onClick={() => { if (size) setAdded(true); }} disabled={!size}>
            {added ? 'Unit Confirmed.' : 'Add to Order'}
          </Btn>
          {added && <div style={{ ...mono(10, C.red) }}>Unit confirmed. Archive entry created.</div>}

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

          <button onClick={() => onNav('drop')} style={{ ...mono(9, C.dim), background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>← Back to drop</button>
        </div>
      </div>

      {/* Related */}
      <div style={{ padding: isMobile ? '0 24px 48px' : '0 48px 64px', borderTop: `1px solid ${C.grey}`, marginTop: 16, paddingTop: 40 }}>
        <div style={{ ...mono(9), marginBottom: 24 }}>Also in archive</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill,minmax(160px,1fr))' : 'repeat(auto-fill,minmax(200px,1fr))', gap: 1, background: C.grey }}>
          {BATCHES.filter(b => b.id !== batch.id).slice(0, isMobile ? 2 : 4).map(b => (
            <ProductCardInline key={b.id} batch={b} onClick={() => onNav('archive')} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── SCREEN: ARCHIVE ── */
const ArchiveScreen = ({ onSelectBatch, onNav }) => {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const filters = ['ALL', 'ACTIVE', 'ARCHIVED'];
  const shown = filter === 'ALL' ? BATCHES : BATCHES.filter(b => b.status === filter);

  const handleRowClick = (b) => {
    setSelected(selected?.id === b.id ? null : b);
  };

  return (
    <div className="screen-enter">
      <Ticker />
      <div style={{ padding: isMobile ? '32px 24px' : '48px' }}>

        <div className="stagger" style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: 32, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 0 }}>
          <div>
            <div style={{ ...mono(9, C.red), marginBottom: 8 }}>DOC-ARC · BATCH RECORD · SOUTH AFRICA</div>
            <div style={{ ...grotesk(isMobile ? 22 : 28, 600), letterSpacing: '0.1em', textTransform: 'uppercase' }}>Batch Archive</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} data-hover
                style={{ ...mono(9, filter === f ? C.white : C.dim), background: 'transparent', border: `1px solid ${filter === f ? C.red : C.grey}`, padding: '6px 14px', cursor: 'pointer', transition: 'all 0.15s' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table — scrollable on mobile */}
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
              {shown.map(b => (
                <tr key={b.id} className="batch-row"
                  onClick={() => handleRowClick(b)}
                  style={{ borderBottom: `1px solid ${C.g2}`, cursor: 'pointer', background: selected?.id === b.id ? '#0F0F0F' : 'transparent' }}>
                  <td className="row-id" style={{ fontFamily: F.m, fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.dim, padding: '12px', transition: 'color 0.15s', whiteSpace: 'nowrap' }}>{b.id}</td>
                  <td style={{ ...grotesk(13), padding: '12px', whiteSpace: 'nowrap' }}>{b.name}</td>
                  <td style={{ ...mono(10, C.dim), padding: '12px', whiteSpace: 'nowrap' }}>{b.season}</td>
                  <td style={{ ...mono(11, C.white), padding: '12px' }}>{b.units}</td>
                  <td style={{ fontFamily: F.m, fontSize: 12, color: C.white, padding: '12px', whiteSpace: 'nowrap' }}>{b.price}</td>
                  <td style={{ padding: '12px' }}><Badge v={b.status === 'ACTIVE' ? 'active' : 'neutral'}>{b.status}</Badge></td>
                  <td style={{ ...mono(10), padding: '12px', whiteSpace: 'nowrap' }}>{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail drawer */}
        {selected && (
          <div style={{ marginTop: 1, background: C.g2, border: `1px solid ${C.grey}`, padding: isMobile ? 20 : 28, display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: isMobile ? 16 : 20, position: 'relative', animation: 'fadeUp 0.2s ease forwards' }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
            {[['Batch ID', selected.id], ['Season', selected.season], ['Origin', selected.origin], ['Issued', selected.date]].map(([k, v]) => (
              <div key={k}>
                <div style={{ ...mono(8), marginBottom: 4 }}>{k}</div>
                <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', color: C.white }}>{v}</div>
              </div>
            ))}
            <div style={{ gridColumn: '1/-1', borderTop: `1px solid ${C.grey}`, paddingTop: 16, marginTop: 4 }}>
              <div style={{ ...mono(8), marginBottom: 6 }}>Description</div>
              <div style={{ ...grotesk(13, 300, '#999'), lineHeight: 1.7 }}>{selected.desc}</div>
            </div>
            <div style={{ gridColumn: '1/-1', display: 'flex', gap: 12, borderTop: `1px solid ${C.grey}`, paddingTop: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge v={selected.status === 'ACTIVE' ? 'active' : 'archived'}>{selected.status}</Badge>
              <span style={{ ...mono(9), alignSelf: 'center' }}>{selected.units} units · {selected.type} · {selected.fit} fit</span>
              {selected.status === 'ACTIVE' && (
                <button onClick={() => { onSelectBatch(selected.id); onNav('product'); }} style={{ ...mono(9, C.red), background: 'none', border: `1px solid ${C.red}`, padding: '4px 12px', cursor: 'pointer', marginLeft: 'auto' }}>VIEW UNIT →</button>
              )}
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.g2}`, paddingTop: 20, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ ...mono(9) }}>{shown.length} records retrieved</span>
          <span style={{ ...mono(9, C.red) }}>ARCHIVE UPDATED · 2026.04.21</span>
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
            <div key={r} style={{ ...grotesk(13, 400, '#444'), padding: '8px 0', borderBottom: `1px solid ${C.g2}`, lineHeight: 1.5 }}>✗ {r}</div>
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
          <div style={{ ...mono(9, C.red), marginBottom: 16 }}>NEXT BATCH — RB-009</div>
          <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: isMobile ? 40 : 52, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1, color: C.white, marginBottom: 32 }}>
            AW26.<br /><span style={{ color: C.red }}>QUEUE.</span>
          </div>
          <div style={{ ...grotesk(14, 300, '#888'), lineHeight: 1.8, marginBottom: 40, maxWidth: 400 }}>
            {NEXT.desc} Registration does not guarantee access. Units are allocated in order of record creation.
          </div>
          <div style={{ border: `1px solid ${C.grey}`, padding: 24, position: 'relative', maxWidth: 360 }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.grey }} />
            <div style={{ ...mono(8), marginBottom: 16 }}>Next batch — speculative</div>
            {[['Batch ID', 'RB-009'], ['Season', 'AW26-A'], ['Est. Release', NEXT.date], ['Location', 'South Africa'], ['Status', 'UNANNOUNCED']].map(([k, v]) => (
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
                <div style={{ ...mono(10, C.dim), marginTop: 12 }}>AW26-A · RB-009 · EST. 2026.09.01</div>
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

/* ── APP ── */
const App = () => {
  const [screen, setScreen] = useState(() => localStorage.getItem('rb-screen') || 'drop');
  const [selectedBatchId, setSelectedBatchId] = useState('RB-001');

  const nav = s => { setScreen(s); localStorage.setItem('rb-screen', s); window.scrollTo(0, 0); };

  const screens = {
    drop:      <DropScreen onNav={nav} onSelectBatch={setSelectedBatchId} />,
    product:   <ProductScreen onNav={nav} batchId={selectedBatchId} />,
    archive:   <ArchiveScreen onNav={nav} onSelectBatch={setSelectedBatchId} />,
    manifesto: <ManifestoScreen />,
    queue:     <QueueScreen />,
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: F.g, color: C.white }}>
      <Header screen={screen} onNav={nav} />
      <div key={screen}>{screens[screen]}</div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
