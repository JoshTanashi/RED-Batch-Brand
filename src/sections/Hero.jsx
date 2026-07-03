import { useRef } from 'react';
import { C, mono, grotesk, display } from '../lib/theme';
import { m, EASE, useScroll, useTransform } from '../lib/motion';
import { Section } from '../components/Section';
import { useIsMobile } from '../lib/useIsMobile';

export const Hero = ({ product, unitsTotal, date, introDone, onShop }) => {
  const isMobile = useIsMobile();
  const ref = useRef(null);

  /* Cutout drifts down + tilts slightly as you scroll past the hero. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1, 2.5]);

  const kids = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const word = {
    hidden: { opacity: 0, y: 44 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <Section tone="light" style={{ overflow: 'visible', zIndex: 2 }}>
      <div ref={ref} style={{
        padding: isMobile ? '56px 24px 40px' : '84px 48px 56px',
        minHeight: isMobile ? 'auto' : '78vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative',
      }}>
        <m.div initial="hidden" animate={introDone ? 'show' : 'hidden'} variants={kids}
          style={{ position: 'relative', zIndex: 2 }}>
          <m.div variants={word} style={{ ...mono(10, C.red), marginBottom: 24 }}>
            CYCLE-01 · SOUTH AFRICA · {date}
          </m.div>
          <div style={{ ...display(176), maxWidth: '11em' }}>
            <m.div variants={word}>release</m.div>
            <m.div variants={word} style={{ color: C.red }}>active.</m.div>
          </div>
          <m.div variants={word} style={{
            ...grotesk(15, 300, C.dim), lineHeight: 1.8, maxWidth: 340,
            marginTop: isMobile ? 28 : 40,
          }}>
            Controlled release apparel. {unitsTotal} units this cycle — documented,
            verified and logged. No restock. Once a batch closes, it&rsquo;s archived.
          </m.div>
          <m.div variants={word} style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 18 }}>
            <button onClick={onShop} data-hover
              style={{ ...mono(10, C.ink), background: 'none', border: 'none', borderBottom: `1px solid ${C.ink}`, padding: '0 0 6px', cursor: 'pointer' }}>
              SHOP THE CYCLE ↓
            </button>
          </m.div>
        </m.div>

        {/* Floating cutout — overlaps into the marquee band below. */}
        {product?.cutout && (
          <m.img
            src={product.cutout} alt={product.name}
            initial={{ opacity: 0, y: 60, rotate: 3 }}
            animate={introDone ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
            style={isMobile ? {
              width: '78%', maxWidth: 420, alignSelf: 'center', marginTop: 12, marginBottom: -70,
              filter: 'drop-shadow(0 40px 50px rgba(20,20,20,0.3))', y, rotate,
            } : {
              position: 'absolute', right: '4%', bottom: '-14%', width: 'min(40vw, 560px)',
              filter: 'drop-shadow(0 40px 50px rgba(20,20,20,0.3))', y, rotate, zIndex: 3,
            }} />
        )}
      </div>
    </Section>
  );
};
