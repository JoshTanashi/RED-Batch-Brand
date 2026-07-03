import { useState, useEffect, useRef } from 'react';
import { C, F, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { parsePrice } from '../lib/format';
import { Ticker } from '../components/Ticker';
import { Badge } from '../components/Badge';
import { Btn } from '../components/Btn';
import { Divider } from '../components/Divider';

export const ProductScreen = ({ onNav, batchId, cart, addToCart, onSelectBatch, batches: BATCHES }) => {
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
  const hasActiveImg = batch.images && batch.images[activeImg] && !failedImgs.has(batch.images[activeImg]);

  useEffect(() => { setActiveImg(0); setSize(null); setQty(1); setFailedImgs(new Set()); }, [batchId]);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [batchId]);

  const handleAddToCart = () => {
    if (!size || isClosed) return;
    addToCart({ id: batch.id, name: batch.name, price: parsePrice(batch.price), size, quantity: qty });
    setAdded(true);
    setQty(1);
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
          <div
            onTouchStart={e => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={e => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;
              const distance = touchStart - touchEnd;
              const isLeftSwipe = distance > minSwipeDistance;
              const isRightSwipe = distance < -minSwipeDistance;
              if (isLeftSwipe && activeImg < batch.images.length - 1) setActiveImg(i => i + 1);
              if (isRightSwipe && activeImg > 0) setActiveImg(i => i - 1);
              setTouchStart(null);
              setTouchEnd(null);
            }}
            style={{ aspectRatio: '4/5', background: C.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: `1px solid ${C.line}`, zIndex: 10 }}>
            {hasActiveImg ? (
              <img key={activeImg} src={batch.images[activeImg]} alt={`${batch.name} ${activeImg + 1}`}
                onError={() => setFailedImgs(prev => new Set(prev).add(batch.images[activeImg]))}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <span style={{ ...mono(9, '#222') }}>IMG</span>
            )}
            {activeImg > 0 && (
              <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontFamily: F.m, fontSize: 12, color: 'rgba(240,240,240,0.3)', pointerEvents: 'none' }}>‹</div>
            )}
            {batch.images && activeImg < batch.images.length - 1 && (
              <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontFamily: F.m, fontSize: 12, color: 'rgba(240,240,240,0.3)', pointerEvents: 'none' }}>›</div>
            )}
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <div style={{ border: `1px solid ${C.line}`, padding: '4px 10px', ...mono(9), background: C.bg }}>{batch.id}</div>
            </div>
            <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
              <Badge v={isClosed ? 'neutral' : (batch.status === 'ACTIVE' ? 'active' : 'neutral')}>{isClosed ? 'BATCH CLOSED' : batch.status}</Badge>
            </div>
          </div>

          {batch.images && batch.images.length > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 8, overflowX: isMobile ? 'auto' : 'visible' }}>
              {batch.images.map((img, idx) => (
                <div key={idx} onClick={() => setActiveImg(idx)} style={{ width: 60, height: 75, background: C.bg2, flexShrink: 0, border: `1px solid ${activeImg === idx ? C.red : C.line}`, cursor: 'pointer', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
                  <img src={img} alt={`thumb ${idx + 1}`} loading="lazy" onError={e => { e.target.style.display = 'none'; }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 16, border: `1px solid ${C.line}`, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, background: C.red }} />
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, background: C.red }} />
            <div>
              <div style={{ ...mono(8) }}>Batch identifier</div>
              <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', color: C.ink, marginTop: 4 }}>{batch.id} · {batch.season}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...mono(8) }}>Issued</div>
              <div style={{ ...mono(11, C.ink), marginTop: 4 }}>{batch.date}</div>
            </div>
          </div>
        </div>

        <div className="stagger" style={{ paddingTop: isMobile ? 0 : 8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ ...mono(9, C.red), marginBottom: 8 }}>{batch.season} · {batch.type.toUpperCase()} · {batch.status}</div>
            <div style={{ ...grotesk(isMobile ? 24 : 32, 600), letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>{batch.name}</div>
            <div style={{ fontFamily: F.m, fontSize: 20, color: C.ink, marginTop: 14 }}>{batch.price}</div>
            <div style={{ ...mono(9, C.dim), marginTop: 8 }}>{isClosed ? '0 units remaining.' : `${batch.units} units remaining.`}</div>
          </div>

          <Divider />
          <div style={{ ...grotesk(14, 300, '#999'), lineHeight: 1.8 }}>{batch.desc}</div>
          <Divider />

          <div>
            <div style={{ ...mono(9), marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Select size {size && <span style={{ color: C.red }}>— {size}</span>}</span>
              <button onClick={() => setSizeGuideOpen(true)}
                style={{ fontFamily: F.m, fontSize: 9, color: '#888', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', letterSpacing: '0.16em', textTransform: 'uppercase', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = C.ink}
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
                    style={{ width: 52, height: 52, background: sel ? C.red : 'transparent', border: `1px solid ${sel ? C.red : hov ? C.ink : C.line}`, color: sel ? C.ink : hov ? C.ink : C.dim, ...mono(11), cursor: 'pointer', transition: 'all 0.15s' }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ ...mono(9), marginBottom: 8 }}>QUANTITY</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 16, marginBottom: 20 }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                disabled={qty === 1}
                style={{ width: isMobile ? 44 : 32, height: isMobile ? 44 : 32, border: `1px solid ${C.line}`, background: 'transparent', color: C.ink, fontSize: 16, cursor: qty === 1 ? 'not-allowed' : 'pointer', opacity: qty === 1 ? 0.4 : 1, transition: 'opacity 0.15s' }}>
                −
              </button>
              <div style={{ width: isMobile ? 52 : 48, height: isMobile ? 44 : 32, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.m, fontSize: 13, color: C.ink }}>
                {qty}
              </div>
              <button
                onClick={() => setQty(q => Math.min(10, q + 1))}
                disabled={qty === 10}
                style={{ width: isMobile ? 44 : 32, height: isMobile ? 44 : 32, border: `1px solid ${C.line}`, background: 'transparent', color: C.ink, fontSize: 16, cursor: qty === 10 ? 'not-allowed' : 'pointer', opacity: qty === 10 ? 0.4 : 1, transition: 'opacity 0.15s' }}>
                +
              </button>
            </div>
          </div>

          <Btn onClick={handleAddToCart} disabled={!size || isClosed}>
            {isClosed ? 'Batch closed.' : added ? 'Unit Added.' : 'Add to Cart'}
          </Btn>
          {added && <div style={{ ...mono(10, C.red) }}>Unit added to cart.</div>}

          <div style={{ border: `1px solid ${C.line}`, background: C.bg2, padding: '14px 16px', marginTop: 16, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, background: C.red }} />
            <div style={{ ...mono(9, C.red), letterSpacing: '0.16em' }}>MADE TO ORDER</div>
            <div style={{ ...grotesk(13, 300, '#888'), lineHeight: 1.7, marginTop: 6 }}>
              This product is made-to-order. Allow 5–8 business days for production and order fulfilment before dispatch.
            </div>
            <div style={{ ...mono(8, C.dim), marginTop: 8 }}>
              Manufactured in South Africa  ·  Delivered via Pudo
            </div>
          </div>

          <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.bg2}` }}>
            <div style={{ ...mono(8, C.dim), lineHeight: 1.8 }}>
              No returns. No refunds. All sales are final.<br />
              Each unit is made-to-order specifically for you.<br />
              Please check sizing carefully before ordering.<br />
              Size guide available above.
            </div>
          </div>

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
              <span key={c} style={{ ...mono(8), border: `1px solid ${C.line}`, padding: '4px 10px' }}>{c}</span>
            ))}
          </div>

          <button
            onClick={() => { onNav('drop'); window.scrollTo(0,0); }}
            onMouseEnter={e => { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = C.ink; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.dim; e.currentTarget.style.borderColor = C.line; }}
            style={{ ...mono(10, C.dim), background: 'none', border: `1px solid ${C.line}`, cursor: 'pointer', padding: '10px 20px', transition: 'all 0.15s', marginTop: 8 }}>
            ← BACK TO DROP
          </button>
        </div>
      </div>

      {sizeGuideOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { if (e.target === e.currentTarget) setSizeGuideOpen(false); }}>
          <div style={{ background: C.bg, border: `1px solid ${C.line}`, padding: 32, maxWidth: 480, width: '90%', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
            <button onClick={() => setSizeGuideOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, ...mono(9, C.dim), background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = C.ink}
              onMouseLeave={e => e.currentTarget.style.color = C.dim}>
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
    </div>
  );
};
