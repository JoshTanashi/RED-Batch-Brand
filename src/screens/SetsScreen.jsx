import { C, F, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { Ticker } from '../components/Ticker';
import { Divider } from '../components/Divider';
import { SetCard } from '../components/SetCard';

export const SetsScreen = ({ onNav, cart, addToCart, sets: SETS }) => {
  const isMobile = useIsMobile();

  return (
    <div className="screen-enter">
      <Ticker />

      <div style={{ padding: isMobile ? '32px 24px 40px' : '48px 48px 64px', borderBottom: `1px solid ${C.grey}` }}>
        <div className="stagger">
          <div style={{ ...mono(9, C.red), marginBottom: 16 }}>THE RECORD · CYCLE SETS · PERMANENT</div>
          <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>THE RECORD.</div>
          <div style={{ ...grotesk(14, 300, '#999'), maxWidth: 560, lineHeight: 1.8, marginTop: 24 }}>
            Every cycle produces one set. A tee and a hoodie — the complete look, issued together as a single verified unit. Once a cycle closes, the set is permanent. It never restocks. It never disappears. It exists in the archive forever — a purchasable memory you can still own.
          </div>
          <div style={{ ...mono(9, C.dim), marginTop: 16 }}>Sets are separate from individual batch drops. Limited to 20 units per cycle.</div>
        </div>
      </div>

      <Divider />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 1, background: C.grey }}>
        {SETS.map(set => (
          <SetCard key={set.id} set={set} addToCart={addToCart} onNav={onNav} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
};
