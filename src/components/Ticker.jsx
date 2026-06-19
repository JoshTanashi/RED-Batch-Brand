import { C } from '../lib/theme';

export const Ticker = () => {
  const items = ['CYCLE-01', 'RELEASE ACTIVE', '120 UNITS', '2026.04.23', 'SOUTH AFRICA', 'VERIFIED DROP', 'RED-BATCH SYSTEM', 'DOC-001'];
  const row = items.map((t, i) => <span key={i}>{t}</span>);
  return (
    <div style={{ background: C.g2, borderBottom: `1px solid ${C.grey}`, overflow: 'hidden', height: '30px', display: 'flex', alignItems: 'center' }}>
      <div className="ticker-inner">{row}{row}</div>
    </div>
  );
};
