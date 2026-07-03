import { C, F, mono, grotesk } from '../lib/theme';
import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { Marquee } from '../components/Marquee';
import { ProductImage } from '../components/ProductImage';
import { Hero } from '../sections/Hero';
import { CycleRow } from '../sections/CycleRow';
import { QueueSection } from '../sections/QueueSection';
import { ContactSection } from '../sections/ContactSection';
import { useIsMobile } from '../lib/useIsMobile';

export const HomeScreen = ({ batches, sets, addToCart, onNav, onSelectBatch, introDone }) => {
  const isMobile = useIsMobile();

  const active = batches.filter(b => b.status === 'ACTIVE' && b.units > 0);
  const tee = active.find(b => b.type === 'Tee');
  const hoodie = active.find(b => b.type === 'Hoodie');
  const featured = [tee, hoodie].filter(Boolean);
  const also = active.filter(b => !featured.includes(b));
  const record = sets.find(s => s.status === 'ACTIVE');
  const unitsTotal = active.reduce((n, b) => n + b.units, 0);
  const date = featured[0]?.date || '2026';

  const view = (b) => { onSelectBatch(b.id); onNav('product'); };

  return (
    <div>
      <Hero
        product={hoodie || featured[0]}
        unitsTotal={unitsTotal}
        date={date}
        introDone={introDone}
        onShop={() => onNav('drop#cycle')}
      />

      <Marquee variant="band" speed={26}
        items={['shop the drop', 'no restock', `${unitsTotal} units`, 'cycle-01', 'made to order']} />

      {featured.map((b, i) => (
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

      {record && (
        <CycleRow
          product={record}
          index={featured.length + 1}
          id="record"
          tone="light"
          flip
          isSet
          addToCart={addToCart}
        />
      )}

      {also.length > 0 && (
        <Section tone="light">
          <div style={{ padding: isMobile ? '56px 24px' : '72px 48px', maxWidth: 1280, margin: '0 auto', borderTop: `1px solid ${C.line}` }}>
            <Reveal>
              <div style={{ ...mono(9, C.red), marginBottom: 28 }}>ALSO ACTIVE THIS CYCLE</div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${Math.min(also.length, 3)}, 1fr)`, gap: isMobile ? 28 : 40 }}>
              {also.map((b, i) => (
                <Reveal key={b.id} delay={i * 0.08}>
                  <div onClick={() => view(b)} data-hover style={{ cursor: 'pointer' }}>
                    <ProductImage product={b} small mode="framed" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
                      <div>
                        <div style={{ ...mono(8, C.dim) }}>{b.id}</div>
                        <div style={{ ...grotesk(15, 600), letterSpacing: '0.04em', marginTop: 4 }}>{b.name}</div>
                      </div>
                      <span style={{ fontFamily: F.m, fontSize: 13, color: C.ink }}>{b.price}</span>
                    </div>
                    <div style={{ ...mono(8, C.dim), marginTop: 6 }}>{b.units} units remaining</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      <QueueSection />

      <Marquee variant="quiet" speed={26}
        items={['cycle-01', 'release active', `${unitsTotal} units`, date, 'south africa', 'verified drop', 'red-batch system', 'doc-001']} />

      <ContactSection />
    </div>
  );
};
