import { useState } from 'react';
import { C, F, mono } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { Ticker } from '../components/Ticker';
import { ProductCardInline } from '../components/ProductCardInline';

export const DropScreen = ({ onNav, onSelectBatch, batches: BATCHES }) => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState('ALL');
  const ACTIVE_BATCHES = BATCHES.filter(b => b.status === 'ACTIVE');

  const filters = [
    { id: 'ALL',    label: 'ALL',     count: BATCHES.filter(b => b.status !== 'COMING_SOON').length },
    { id: 'TEE',    label: 'TEES',    count: BATCHES.filter(b => b.type === 'Tee' && b.status !== 'COMING_SOON').length },
    { id: 'HOODIE', label: 'HOODIES', count: BATCHES.filter(b => b.type === 'Hoodie' && b.status !== 'COMING_SOON').length },
    { id: 'ACTIVE', label: 'ACTIVE',  count: BATCHES.filter(b => b.status === 'ACTIVE').length },
  ];

  const filteredBatches = filter === 'ALL'    ? BATCHES.filter(b => b.status !== 'COMING_SOON')
    : filter === 'TEE'    ? BATCHES.filter(b => b.type === 'Tee'    && b.status !== 'COMING_SOON')
    : filter === 'HOODIE' ? BATCHES.filter(b => b.type === 'Hoodie' && b.status !== 'COMING_SOON')
    : BATCHES.filter(b => b.status === 'ACTIVE');

  const handleCardClick = (batch) => {
    onSelectBatch(batch.id);
    onNav('product');
    window.scrollTo(0,0);
  };

  return (
    <div className="screen-enter">
      <Ticker />

      <div style={{ padding: isMobile ? '40px 24px' : '64px 48px', borderBottom: `1px solid ${C.grey}` }}>
        <div style={{ ...mono(9, C.red), letterSpacing: '0.2em', marginBottom: 16 }}>CYCLE-01 · RB-001 · 2026.04.23</div>
        <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(48px, 9vw, 96px)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 0.92, marginBottom: 0 }}>
          <div style={{ color: C.white }}>RELEASE</div>
          <div style={{ color: C.red }}>ACTIVE.</div>
        </div>
      </div>

      <div id="product-grid">
        <div style={{ padding: isMobile ? '12px 24px' : '16px 48px', borderBottom: `1px solid ${C.grey}`, display: 'flex', gap: 0, overflowX: 'auto' }}>
          {filters.map(({ id, label, count }) => {
            const active = filter === id;
            return (
              <button key={id} onClick={() => setFilter(id)}
                style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${active ? C.red : 'transparent'}`, padding: '10px 20px', cursor: 'pointer', fontFamily: F.m, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap', transition: 'all 0.15s', color: active ? C.white : '#888' }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.white; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#888'; }}>
                {label}<span style={{ color: active ? C.red : '#444', fontSize: 8, marginLeft: 4 }}>({count})</span>
              </button>
            );
          })}
        </div>
        <div style={{ padding: isMobile ? '24px 24px' : '32px 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <div style={{ ...mono(9), marginBottom: 0 }}>CYCLE-01 · {filteredBatches.length} drops · {ACTIVE_BATCHES.length} active now</div>
            <span style={{ ...mono(8, C.red) }}>CYCLE-01</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill,minmax(160px,1fr))' : 'repeat(auto-fill,minmax(240px,1fr))', gap: 1, background: C.grey }}>
            {filteredBatches.map(b => (
              <ProductCardInline key={b.id} batch={b} onClick={b.status === 'COMING_SOON' ? undefined : () => handleCardClick(b)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
