import { useState } from 'react';
import { C, F, mono } from '../lib/theme';

/* Fallback chain: transparent cutout → framed photo → typographic block.
   Products whose photos don't exist yet land on the typographic block,
   which is designed to read as deliberate. */
export const ProductImage = ({ product, mode = 'auto', small = false, float = false, style, imgStyle }) => {
  const [cutFailed, setCutFailed] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  const cutSrc = product.cutout && !cutFailed
    ? (small ? product.cutout.replace('.webp', '-sm.webp') : product.cutout)
    : null;
  const photoSrc = product.images?.[0] && !photoFailed ? product.images[0] : null;

  if (cutSrc && mode !== 'framed') {
    return (
      <img src={cutSrc} alt={product.name} loading="lazy"
        className={float ? 'floaty' : undefined}
        onError={() => setCutFailed(true)}
        style={{
          maxWidth: '100%', height: 'auto', display: 'block',
          filter: 'drop-shadow(0 34px 44px rgba(20,20,20,0.28))',
          ...style, ...imgStyle,
        }} />
    );
  }

  if (photoSrc) {
    return (
      <div style={{ aspectRatio: '4/5', background: C.bg2, border: `1px solid ${C.line}`, overflow: 'hidden', position: 'relative', ...style }}>
        <img src={photoSrc} alt={product.name} loading="lazy"
          onError={() => setPhotoFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...imgStyle }} />
      </div>
    );
  }

  return (
    <div style={{
      aspectRatio: '4/5', background: C.bg2, border: `1px solid ${C.line}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 14, position: 'relative', ...style,
    }}>
      <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
      <div style={{
        fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(40px, 6vw, 76px)',
        letterSpacing: '-0.02em', lineHeight: 1, color: C.dim, opacity: 0.5, textTransform: 'lowercase',
      }}>
        {product.id.toLowerCase()}
      </div>
      <div style={{ ...mono(9) }}>unit imaging pending</div>
    </div>
  );
};
