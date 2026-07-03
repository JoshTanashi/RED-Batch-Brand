import { useState } from 'react';
import { C, F, mono, grotesk, display } from '../lib/theme';
import { parsePrice } from '../lib/format';
import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { ProductImage } from '../components/ProductImage';
import { Btn } from '../components/Btn';
import { useIsMobile } from '../lib/useIsMobile';

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

const SizeRow = ({ label, value, onPick }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ ...mono(8, C.dim), marginBottom: 8 }}>{label}</div>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {SIZES.map(s => {
        const sel = value === s;
        return (
          <button key={s} onClick={() => onPick(s)} data-hover
            style={{ width: 48, height: 48, background: sel ? C.red : 'transparent', border: `1px solid ${sel ? C.red : C.line}`, color: sel ? '#EDEAE4' : C.dim, ...mono(10), cursor: 'pointer', borderRadius: 0, transition: 'all 0.15s' }}>
            {s}
          </button>
        );
      })}
    </div>
  </div>
);

/* One editorial row per product kind. `set` variant embeds the dual-size
   add-to-cart flow inline (logic carried over from the old SetCard). */
export const CycleRow = ({ product, index, tone = 'light', flip = false, id, isSet = false, onView, addToCart }) => {
  const isMobile = useIsMobile();
  const [teeSize, setTeeSize] = useState(null);
  const [hoodieSize, setHoodieSize] = useState(null);
  const [added, setAdded] = useState(false);

  const canAddSet = teeSize !== null && hoodieSize !== null;
  const handleAddSet = () => {
    if (!canAddSet) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: parsePrice(product.price),
      size: `Tee: ${teeSize} / Hoodie: ${hoodieSize}`,
      colour: 'Washed Black',
      quantity: 1,
      isSet: true,
      setItems: product.items,
      teeSize,
      hoodieSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const num = String(index).padStart(2, '0');
  const spec = isSet
    ? `${product.items.length} pieces · one colourway · ${product.units} sets`
    : `${product.weight} · ${product.fit} · ${product.units} units`;

  const text = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 18 }}>
          <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 13, color: C.red, letterSpacing: '0.16em' }}>{num}</span>
          <span style={{ ...mono(9, C.dim) }}>{product.id} · {isSet ? product.cycle : product.season}</span>
        </div>
        <h2 style={{ ...display(96), marginBottom: 20 }}>
          {product.name.toLowerCase()}<span style={{ color: C.red }}>.</span>
        </h2>
        <div style={{ ...mono(9, C.dim), marginBottom: 22 }}>{spec}</div>
        <p style={{ ...grotesk(14, 300, C.dim), lineHeight: 1.8, maxWidth: 420, marginBottom: 26 }}>
          {product.desc}
        </p>

        {isSet && (
          <div style={{ marginBottom: 8, maxWidth: 420 }}>
            {product.includes.slice(0, 4).map((inc, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <div style={{ width: 4, height: 4, background: C.red, flexShrink: 0 }} />
                <span style={{ ...mono(9, C.dim) }}>{inc}</span>
              </div>
            ))}
            <div style={{ margin: '22px 0 4px' }}>
              <SizeRow label="TEE SIZE" value={teeSize} onPick={setTeeSize} />
              <SizeRow label="HOODIE SIZE" value={hoodieSize} onPick={setHoodieSize} />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 26, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 20, color: C.ink }}>{product.price}</span>
          {isSet ? (
            <Btn onClick={handleAddSet} disabled={!canAddSet}>
              {added ? 'Set Added.' : 'Add Set to Cart'}
            </Btn>
          ) : (
            <Btn v="secondary" onClick={onView}>View Unit →</Btn>
          )}
        </div>
      </Reveal>
    </div>
  );

  const image = (
    <Reveal delay={0.1} y={40} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        <ProductImage product={product} float={!!product.cutout} />
      </div>
    </Reveal>
  );

  return (
    <Section tone={tone} id={id}>
      <div style={{
        padding: isMobile ? '72px 24px' : '110px 48px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 48 : 72,
        maxWidth: 1280, margin: '0 auto',
      }}>
        {isMobile || !flip ? <>{text}{image}</> : <>{image}{text}</>}
      </div>
    </Section>
  );
};
