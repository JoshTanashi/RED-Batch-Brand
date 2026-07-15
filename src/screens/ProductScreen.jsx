import { useState, useEffect, useRef } from 'react';
import { C, F, mono, grotesk, display } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { parsePrice } from '../lib/format';
import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { ProductImage } from '../components/ProductImage';
import { Badge } from '../components/Badge';
import { Btn } from '../components/Btn';

const Rule = ({ style }) => <div style={{ borderTop: `1px solid ${C.line}`, ...style }} />;

export const ProductScreen = ({ onNav, batchId, addToCart, onSelectBatch, batches: BATCHES }) => {
  const isMobile = useIsMobile();
  const batch = BATCHES.find(b => b.id === batchId) || BATCHES[0];
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [hovSize, setHovSize] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [failedImgs, setFailedImgs] = useState(() => new Set());
  const minSwipeDistance = 50;
  const topRef = useRef(null);
  const isClosed = batch.units === 0;
  const isReleased = batch.status === 'ACTIVE';
  const hasActiveImg = batch.images && batch.images[activeImg] && !failedImgs.has(batch.images[activeImg]);

  useEffect(() => { setActiveImg(0); setSize(null); setQty(1); setFailedImgs(new Set()); }, [batchId]);

  useEffect(() => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [batchId]);

  const handleAddToCart = () => {
    if (!size || isClosed || !isReleased) return;
    addToCart({ id: batch.id, name: batch.name, price: parsePrice(batch.price), size, quantity: qty });
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 2000);
  };

  const teeRows    = [['S','56cm','72cm','50cm'],['M','60cm','74cm','53cm'],['L','64cm','76cm','56cm'],['XL','68cm','78cm','59cm'],['2XL','72cm','80cm','62cm']];
  const hoodieRows = [['S','58cm','74cm','52cm'],['M','62cm','76cm','55cm'],['L','66cm','78cm','58cm'],['XL','70cm','80cm','61cm'],['2XL','74cm','82cm','64cm']];
  const sizeRows = batch.type === 'Tee' ? teeRows : hoodieRows;

  const also = BATCHES.filter(b => b.status === 'ACTIVE' && b.units > 0 && b.id !== batch.id).slice(0, 3);

  return (
    <Section tone="light">
      <div ref={topRef} style={{ scrollMarginTop: 70 }} />
      <div style={{ padding: isMobile ? '32px 24px' : '56px 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr', gap: isMobile ? 36 : 72, maxWidth: 1280, margin: '0 auto', alignItems: 'start' }}>

        {/* Image stage — sticky on desktop */}
        <div style={isMobile ? {} : { position: 'sticky', top: 82 }}>
          <Reveal y={20}>
            <div
              onTouchStart={e => setTouchStart(e.targetTouches[0].clientX)}
              onTouchMove={e => setTouchEnd(e.targetTouches[0].clientX)}
              onTouchEnd={() => {
                if (!touchStart || !touchEnd) return;
                const distance = touchStart - touchEnd;
                if (distance > minSwipeDistance && activeImg < batch.images.length - 1) setActiveImg(i => i + 1);
                if (distance < -minSwipeDistance && activeImg > 0) setActiveImg(i => i - 1);
                setTouchStart(null);
                setTouchEnd(null);
              }}
              style={{ aspectRatio: '4/5', background: C.bg2, border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              {hasActiveImg ? (
                <img key={activeImg} src={batch.images[activeImg]} alt={`${batch.name} ${activeImg + 1}`}
                  onError={() => setFailedImgs(prev => new Set(prev).add(batch.images[activeImg]))}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : batch.cutout ? (
                <img src={batch.cutout} alt={batch.name} style={{ width: '82%', height: 'auto', filter: 'drop-shadow(0 24px 30px rgba(20,20,20,0.22))' }} />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.02em', color: C.dim, opacity: 0.5, textTransform: 'lowercase', lineHeight: 1 }}>{batch.id.toLowerCase()}</div>
                  <div style={{ ...mono(9), marginTop: 12 }}>unit imaging pending</div>
                </div>
              )}
              {activeImg > 0 && (
                <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontFamily: F.m, fontSize: 14, color: C.dim, pointerEvents: 'none' }}>‹</div>
              )}
              {batch.images && activeImg < batch.images.length - 1 && (
                <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontFamily: F.m, fontSize: 14, color: C.dim, pointerEvents: 'none' }}>›</div>
              )}
              <div style={{ position: 'absolute', top: 12, left: 12 }}>
                <div style={{ border: `1px solid ${C.line}`, padding: '4px 10px', ...mono(9), background: C.bg }}>{batch.id}</div>
              </div>
              <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                <Badge v={isClosed ? 'neutral' : (batch.status === 'ACTIVE' ? 'active' : 'neutral')}>{isClosed ? 'BATCH CLOSED' : batch.status}</Badge>
              </div>
            </div>

            {batch.images && batch.images.filter(img => !failedImgs.has(img)).length > 1 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8, overflowX: isMobile ? 'auto' : 'visible' }}>
                {batch.images.map((img, idx) => failedImgs.has(img) ? null : (
                  <div key={idx} onClick={() => setActiveImg(idx)} data-hover style={{ width: 60, height: 75, background: C.bg2, flexShrink: 0, border: `1px solid ${activeImg === idx ? C.red : C.line}`, cursor: 'pointer', overflow: 'hidden' }}>
                    <img src={img} alt={`thumb ${idx + 1}`} loading="lazy" onError={() => setFailedImgs(prev => new Set(prev).add(img))} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 14, border: `1px solid ${C.line}`, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, background: C.red }} />
              <div>
                <div style={{ ...mono(8) }}>Batch identifier</div>
                <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: C.ink, marginTop: 4 }}>{batch.id} · {batch.season}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...mono(8) }}>Issued</div>
                <div style={{ ...mono(11, C.ink), marginTop: 4 }}>{batch.date}</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Reveal y={20}>
            <div style={{ ...mono(9, C.red), marginBottom: 14 }}>{batch.season} · {batch.type.toUpperCase()} · {batch.status}</div>
            <h1 style={{ ...display(72) }}>{batch.name.toLowerCase()}<span style={{ color: C.red }}>.</span></h1>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 18 }}>
              <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 22, color: C.ink }}>{batch.price}</span>
              <span style={{ ...mono(9, C.dim) }}>{!isReleased ? 'Not yet released.' : isClosed ? '0 units remaining.' : `${batch.units} units remaining.`}</span>
            </div>
          </Reveal>

          <Rule />
          <div style={{ ...grotesk(14, 300, C.dim), lineHeight: 1.8 }}>{batch.desc}</div>
          <Rule />

          {!isReleased && (
            <div style={{ border: `1px solid ${C.line}`, padding: '18px 20px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
              <Badge v="neutral">INCOMING</Badge>
              <div style={{ ...mono(9, C.dim), lineHeight: 1.9, marginTop: 12 }}>
                This unit has not been released. Imaging in progress — dropping soon.<br />
                Register in the next-cycle queue to be notified when the record opens.
              </div>
            </div>
          )}

          {isReleased && (<>
          <div>
            <div style={{ ...mono(9), marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Select size {size && <span style={{ color: C.red }}>— {size}</span>}</span>
              <button onClick={() => setSizeGuideOpen(true)} data-hover
                style={{ fontFamily: F.m, fontSize: 9, color: C.dim, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', letterSpacing: '0.16em', textTransform: 'uppercase', padding: 0 }}>
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
                    style={{ width: 52, height: 52, background: sel ? C.red : 'transparent', border: `1px solid ${sel ? C.red : hov ? C.ink : C.line}`, color: sel ? '#EDEAE4' : hov ? C.ink : C.dim, ...mono(11), cursor: 'pointer', transition: 'all 0.15s' }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ ...mono(9), marginBottom: 10 }}>QUANTITY</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                disabled={qty === 1}
                style={{ width: isMobile ? 44 : 34, height: isMobile ? 44 : 34, border: `1px solid ${C.line}`, background: 'transparent', color: C.ink, fontSize: 16, cursor: qty === 1 ? 'not-allowed' : 'pointer', opacity: qty === 1 ? 0.4 : 1, transition: 'opacity 0.15s' }}>
                −
              </button>
              <div style={{ width: isMobile ? 52 : 48, height: isMobile ? 44 : 34, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.m, fontSize: 13, color: C.ink }}>
                {qty}
              </div>
              <button
                onClick={() => setQty(q => Math.min(10, q + 1))}
                disabled={qty === 10}
                style={{ width: isMobile ? 44 : 34, height: isMobile ? 44 : 34, border: `1px solid ${C.line}`, background: 'transparent', color: C.ink, fontSize: 16, cursor: qty === 10 ? 'not-allowed' : 'pointer', opacity: qty === 10 ? 0.4 : 1, transition: 'opacity 0.15s' }}>
                +
              </button>
            </div>
          </div>

          <Btn onClick={handleAddToCart} disabled={!size || isClosed}>
            {isClosed ? 'Batch closed.' : added ? 'Unit Added.' : 'Add to Cart'}
          </Btn>
          {added && <div style={{ ...mono(10, C.red) }}>Unit added to cart.</div>}
          </>)}

          <div style={{ border: `1px solid ${C.line}`, background: C.bg2, padding: '14px 16px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, background: C.red }} />
            <div style={{ ...mono(9, C.red) }}>MADE TO ORDER</div>
            <div style={{ ...grotesk(13, 300, C.dim), lineHeight: 1.7, marginTop: 6 }}>
              This product is made-to-order. Allow 5–8 business days for production and order fulfilment before dispatch.
            </div>
            <div style={{ ...mono(8, C.dim), marginTop: 8 }}>
              Manufactured in South Africa · Delivered via Pudo
            </div>
          </div>

          <div style={{ ...mono(8, C.dim), lineHeight: 1.8 }}>
            No returns. No refunds. All sales are final.<br />
            Each unit is made-to-order specifically for you — check sizing carefully before ordering.
          </div>

          <Rule />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' }}>
            {[['Material', batch.weight], ['Fit', batch.fit], ['Origin', batch.origin], ['Batch units', `${batch.units}`], ['Season', batch.season], ['Doc ref', 'DOC-001']].map(([k, v]) => (
              <div key={k}>
                <div style={{ ...mono(8), marginBottom: 4 }}>{k}</div>
                <div style={{ ...grotesk(13, 400) }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Care: Cold wash only', 'No tumble dry', 'Store folded'].map(c => (
              <span key={c} style={{ ...mono(8), border: `1px solid ${C.line}`, padding: '4px 10px' }}>{c}</span>
            ))}
          </div>

          <button
            onClick={() => onNav('drop#cycle')} data-hover
            onMouseEnter={e => { e.currentTarget.style.color = '#141414'; e.currentTarget.style.borderColor = '#141414'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B665E'; e.currentTarget.style.borderColor = '#D3CEC4'; }}
            style={{ ...mono(10, C.dim), background: 'none', border: `1px solid ${C.line}`, cursor: 'pointer', padding: '10px 20px', transition: 'all 0.15s', alignSelf: 'flex-start' }}>
            ← BACK TO THE CYCLE
          </button>
        </div>
      </div>

      {/* Also in this cycle */}
      {also.length > 0 && (
        <div style={{ padding: isMobile ? '40px 24px 64px' : '48px 48px 88px', maxWidth: 1280, margin: '0 auto' }}>
          <Rule style={{ marginBottom: 32 }} />
          <div style={{ ...mono(9, C.red), marginBottom: 24 }}>ALSO IN THIS CYCLE</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${Math.min(also.length, 3)}, 1fr)`, gap: isMobile ? 24 : 40 }}>
            {also.map(b => (
              <div key={b.id} onClick={() => onSelectBatch(b.id)} data-hover style={{ cursor: 'pointer' }}>
                <ProductImage product={b} small mode="framed" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
                  <div>
                    <div style={{ ...mono(8, C.dim) }}>{b.id}</div>
                    <div style={{ ...grotesk(14, 600), letterSpacing: '0.04em', marginTop: 4 }}>{b.name}</div>
                  </div>
                  <span style={{ fontFamily: F.m, fontSize: 13, color: C.ink }}>{b.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Size guide modal */}
      {sizeGuideOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,20,18,0.6)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { if (e.target === e.currentTarget) setSizeGuideOpen(false); }}>
          <div style={{ background: C.bg, border: `1px solid ${C.line}`, padding: 32, maxWidth: 480, width: '90%', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
            <button onClick={() => setSizeGuideOpen(false)} data-hover
              style={{ position: 'absolute', top: 16, right: 16, ...mono(9, C.dim), background: 'none', border: 'none', cursor: 'pointer' }}>
              × CLOSE
            </button>
            <div style={{ ...mono(9, C.red), marginBottom: 8 }}>SIZE GUIDE · CYCLE-01</div>
            <div style={{ ...grotesk(13, 400, C.dim), marginBottom: 20 }}>Measurements in centimetres. Garments run oversized.</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.line}` }}>
                  {['SIZE', 'CHEST', 'LENGTH', 'SHOULDER'].map(h => (
                    <th key={h} style={{ ...mono(9, C.dim), padding: '8px 12px', textAlign: 'left', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeRows.map(([sz, chest, len, shldr]) => (
                  <tr key={sz} style={{ borderBottom: `1px solid ${C.bg2}` }}>
                    <td style={{ fontFamily: F.m, fontWeight: 700, fontSize: 13, color: C.ink, padding: '10px 12px' }}>{sz}</td>
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
    </Section>
  );
};
