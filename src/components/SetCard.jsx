import { useState } from 'react';
import { C, F, mono, grotesk } from '../lib/theme';
import { parsePrice } from '../lib/format';
import { Badge } from './Badge';
import { Btn } from './Btn';

export const SetCard = ({ set, addToCart, onNav, isMobile }) => {
  const [teeSize, setTeeSize] = useState(null);
  const [hoodieSize, setHoodieSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const isArchived = set.status !== 'ACTIVE';
  const hasImage = set.images && set.images[0] && !imgFailed;

  const canAddSet = teeSize !== null && hoodieSize !== null;

  const handleAddSet = () => {
    if (!canAddSet) return;
    addToCart({
      id: set.id,
      name: set.name,
      price: parsePrice(set.price),
      size: `Tee: ${teeSize} / Hoodie: ${hoodieSize}`,
      colour: 'Washed Black',
      quantity: 1,
      isSet: true,
      setItems: set.items,
      teeSize,
      hoodieSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ background: C.black, position: 'relative' }}>
      {!isArchived && <div style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, background: C.red, zIndex: 1 }} />}

      <div style={{ aspectRatio: '3/2', background: C.g2, position: 'relative', overflow: 'hidden', zIndex: 10 }}>
        {hasImage ? (
          <img src={set.images[0]} alt={set.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 16, color: C.white }}>{set.price}</span>
            <div style={{ ...mono(8, C.dim), marginTop: 4 }}>Includes {set.items.length} items  ·  Saving vs individual purchase</div>
          </div>
          <span style={{ ...mono(9, C.dim) }}>{set.units} sets remaining.</span>
        </div>

        {isArchived ? (
          <>
            <Badge v="archived">ARCHIVED</Badge>
            <div style={{ ...mono(9, C.dim), marginTop: 8 }}>This set is permanently archived.</div>
            <div style={{ marginTop: 12 }}>
              <Btn v="ghost" onClick={() => { onNav('drop'); window.scrollTo(0,0); }}>Return to Drop →</Btn>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, marginTop: 20 }}>
              <div style={{ width: 8, height: 8, background: '#F0F0F0', flexShrink: 0 }} />
              <span style={{ ...mono(9, C.dim) }}>COLOURWAY — WASHED BLACK</span>
            </div>
            <div style={{ ...mono(8, C.dim), marginBottom: 20 }}>All pieces in this set ship in the same colourway.</div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ ...mono(8, C.dim), marginBottom: 8 }}>TEE SIZE — RB-001 / RB-003 / RB-005</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['S','M','L','XL','2XL'].map(s => {
                  const sel = teeSize === s;
                  return (
                    <button key={s} onClick={() => setTeeSize(s)}
                      onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = '#F0F0F0'; e.currentTarget.style.color = '#F0F0F0'; } }}
                      onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#888'; } }}
                      style={{ width: 52, height: 52, background: sel ? C.red : 'transparent', border: `1px solid ${sel ? C.red : C.grey}`, color: sel ? C.white : C.dim, ...mono(10), cursor: 'pointer', borderRadius: 0, transition: 'all 0.15s' }}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <div style={{ ...mono(8, C.dim), marginBottom: 8 }}>HOODIE SIZE — RB-002</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['S','M','L','XL','2XL'].map(s => {
                  const sel = hoodieSize === s;
                  return (
                    <button key={s} onClick={() => setHoodieSize(s)}
                      onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = '#F0F0F0'; e.currentTarget.style.color = '#F0F0F0'; } }}
                      onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#888'; } }}
                      style={{ width: 52, height: 52, background: sel ? C.red : 'transparent', border: `1px solid ${sel ? C.red : C.grey}`, color: sel ? C.white : C.dim, ...mono(10), cursor: 'pointer', borderRadius: 0, transition: 'all 0.15s' }}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <Btn onClick={handleAddSet} disabled={!canAddSet} style={{ width: '100%' }}>
                {added ? 'Set Added.' : 'Add Set to Cart'}
              </Btn>
            </div>

            <div style={{ ...mono(8, C.dim), lineHeight: 1.8, marginTop: 10 }}>
              Sets are made-to-order. Allow 7–10 business days for full set production and fulfilment.<br />
              Sets ship together. Delivery calculated at checkout.<br />
              This set exists in the archive permanently after closing.
            </div>
          </>
        )}
      </div>
    </div>
  );
};
