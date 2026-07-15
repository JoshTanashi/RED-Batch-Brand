import { C, mono, display } from '../lib/theme';
import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { Marquee } from '../components/Marquee';
import { Hero } from '../sections/Hero';
import { CycleRow } from '../sections/CycleRow';
import { QueueSection } from '../sections/QueueSection';
import { ContactSection } from '../sections/ContactSection';
import { useIsMobile } from '../lib/useIsMobile';

/* Slim anticipation band for units that exist but aren't released yet —
   no price, no buy, just the record of what's incoming. */
const TeaserStrip = ({ batches }) => {
  const isMobile = useIsMobile();
  if (batches.length === 0) return null;
  return (
    <Section tone="dark">
      <div style={{ padding: isMobile ? '56px 24px' : '80px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red, animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ ...mono(9, C.red) }}>INCOMING · CYCLE-01</span>
          </div>
          {batches.map((b, i) => (
            <div key={b.id} style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: isMobile ? 12 : 28,
              padding: '22px 0', borderTop: `1px solid ${C.line}`,
              borderBottom: i === batches.length - 1 ? `1px solid ${C.line}` : 'none',
            }}>
              <span style={{ ...mono(10, C.dim) }}>{b.id}</span>
              <span style={{ ...display(44) }}>{b.name.toLowerCase()}<span style={{ color: C.red }}>.</span></span>
              <span style={{ ...mono(9, C.dim), marginLeft: 'auto' }}>
                {b.weight.toUpperCase()} · IMAGING IN PROGRESS · DROPPING SOON
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
};

export const HomeScreen = ({ batches, sets, addToCart, onNav, onSelectBatch, introDone }) => {
  const active = batches.filter(b => b.status === 'ACTIVE' && b.units > 0);
  const teased = batches.filter(b => b.status === 'COMING_SOON');
  const record = sets.find(s => s.status === 'ACTIVE');
  const heroProduct = active.find(b => b.cutout) || active[0];
  const unitsTotal = active.reduce((n, b) => n + b.units, 0);
  const date = active[0]?.date || '2026';

  const view = (b) => { onSelectBatch(b.id); onNav('product'); };

  return (
    <div>
      <Hero
        product={heroProduct}
        unitsTotal={unitsTotal}
        date={date}
        introDone={introDone}
        onShop={() => onNav('drop#cycle')}
      />

      <Marquee variant="band" speed={26}
        items={['shop the drop', 'no restock', `${unitsTotal} units`, 'cycle-01', 'made to order']} />

      {active.map((b, i) => (
        <CycleRow
          key={b.id}
          product={b}
          index={i + 1}
          id={i === 0 ? 'cycle' : undefined}
          tone={i % 2 === 0 ? 'light' : 'dark'}
          flip={i % 2 === 1}
          onView={() => view(b)}
        />
      ))}

      {/* The Record set returns here if SET-001 is flipped back to ACTIVE. */}
      {record && (
        <CycleRow
          product={record}
          index={active.length + 1}
          id="record"
          tone={active.length % 2 === 0 ? 'light' : 'dark'}
          flip={active.length % 2 === 1}
          isSet
          addToCart={addToCart}
        />
      )}

      <TeaserStrip batches={teased} />

      <Marquee variant="quiet" speed={26}
        items={['cycle-01', 'release active', `${unitsTotal} units`, date, 'south africa', 'verified drop', 'red-batch system', 'doc-001']} />

      <QueueSection />

      <ContactSection />
    </div>
  );
};
