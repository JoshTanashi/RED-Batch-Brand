import { useState } from 'react';
import { C, F, mono, grotesk } from '../lib/theme';
import { Badge } from './Badge';

export const ProductCardInline = ({ batch, onClick }) => {
  const [hov, setHov] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const isClosed = batch.units === 0;
  const isComingSoon = batch.status === 'COMING_SOON';
  const hasImage = batch.images && batch.images[0] && !imgFailed;

  if (isComingSoon) {
    return (
      <div style={{ background: C.black, position: 'relative', border: `1px solid ${C.grey}`, cursor: 'default' }}>
        <div style={{ aspectRatio: '4/5', background: C.g2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', zIndex: 10 }}>
          {hasImage ? (
            <img
              src={batch.images[0]}
              alt={batch.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0, opacity: 0.5 }}
            />
          ) : null}
          <div style={{ position: 'relative', zIndex: 2, background: 'rgba(13,13,13,0.6)', padding: '6px 12px', border: `1px solid ${C.grey}` }}>
            <span style={{ ...mono(9, C.dim) }}>INCOMING.</span>
          </div>
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
      <div style={{ aspectRatio: '4/5', background: C.g2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', zIndex: 10 }}>
        {hasImage ? (
          <img src={batch.images[0]} alt={batch.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
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
