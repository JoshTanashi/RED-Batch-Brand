import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { C, F, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE } from '../lib/config';
import { Ticker } from '../components/Ticker';
import { Divider } from '../components/Divider';
import { Btn } from '../components/Btn';

const NEXT = { id: 'RB-003', season: 'CYCLE-02', date: '2026.TBC', desc: 'Batch not yet released. Register to receive notification when the record opens.' };

export const QueueScreen = () => {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      <Ticker />
      <div style={{ padding: isMobile ? '40px 24px' : '80px 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, maxWidth: 1100 }}>

        <div className="stagger">
          <div style={{ ...mono(9, C.red), marginBottom: 16 }}>NEXT BATCH — RB-003</div>
          <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: isMobile ? 40 : 52, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1, color: C.white, marginBottom: 32 }}>
            CYCLE-02.<br /><span style={{ color: C.red }}>QUEUE.</span>
          </div>
          <div style={{ ...grotesk(14, 300, '#888'), lineHeight: 1.8, marginBottom: 40, maxWidth: 400 }}>
            {NEXT.desc} Registration does not guarantee access. Units are allocated in order of record creation.
          </div>
          <div style={{ border: `1px solid ${C.grey}`, padding: 24, position: 'relative', maxWidth: 360 }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.grey }} />
            <div style={{ ...mono(8), marginBottom: 16 }}>Next batch — speculative</div>
            {[['Batch ID', 'RB-003'], ['Season', 'CYCLE-02'], ['Est. Release', '2026.TBC'], ['Location', 'South Africa'], ['Status', 'UNANNOUNCED']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.g2}` }}>
                <span style={{ ...mono(9) }}>{k}</span>
                <span style={{ fontFamily: F.m, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: k === 'Status' ? '#444' : C.white }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: isMobile ? 0 : 8 }}>
          {!submitted ? (
            <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ ...grotesk(20, 600), letterSpacing: '0.08em', textTransform: 'uppercase' }}>Register Record</div>
              <Divider />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ ...mono(9), marginBottom: 4 }}>Email address</div>
                <input value={email} onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                  placeholder="archive@domain.com"
                  style={{ background: C.g2, border: `1px solid ${focused ? C.red : C.grey}`, color: C.white, fontFamily: F.g, fontSize: 14, padding: '13px 16px', outline: 'none', borderRadius: 0, transition: 'border-color 0.15s' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ ...mono(9), marginBottom: 4 }}>Preferred size</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(s => (
                    <button key={s} data-hover
                      style={{ width: 48, height: 48, background: 'transparent', border: `1px solid ${C.grey}`, color: C.dim, ...mono(10), cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.target.style.borderColor = C.red; e.target.style.color = C.red; }}
                      onMouseLeave={e => { e.target.style.borderColor = C.grey; e.target.style.color = C.dim; }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ ...mono(9), marginBottom: 4 }}>Notify via</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Email', 'SMS'].map(opt => (
                    <button key={opt} data-hover
                      style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${C.grey}`, ...mono(9, C.dim), cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.white; e.currentTarget.style.color = C.white; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.grey; e.currentTarget.style.color = C.dim; }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <Divider />
              <Btn onClick={async () => {
                if (!email) return;
                try {
                  const qRef = 'QUEUE-' + Date.now();
                  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE, {
                    contact_ref: qRef,
                    order_ref: qRef,
                    customer_name: 'Queue Registration',
                    customer_email: email,
                    customer_phone: 'N/A',
                    subject: 'New Queue Registration — RB-003 / CYCLE-02',
                    message: email + ' has registered for the next batch queue.',
                    type: 'QUEUE REGISTRATION',
                    address_line1: 'N/A',
                    suburb: 'N/A',
                    city: 'N/A',
                    province: 'N/A',
                    postal_code: 'N/A',
                    product_name: 'RB-003 / CYCLE-02 Queue',
                    size: 'N/A',
                    colour: 'N/A',
                    price: 'N/A',
                  });
                } catch (err) { console.error('EmailJS error:', err); }
                setSubmitted(true);
              }} disabled={!email}>Submit Record</Btn>
              <div style={{ ...mono(8), lineHeight: 1.8 }}>Registration does not guarantee allocation. Records are permanent.</div>
            </div>
          ) : (
            <div style={{ animation: 'fadeUp 0.4s ease forwards' }}>
              <div style={{ border: `1px solid ${C.grey}`, padding: isMobile ? 28 : 40, textAlign: 'center', position: 'relative', marginBottom: 32 }}>
                {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
                  <div key={i} style={{ position: 'absolute', width: 8, height: 8, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
                ))}
                <div style={{ ...mono(9, C.red), marginBottom: 12 }}>RECORD CREATED</div>
                <div style={{ ...grotesk(isMobile ? 24 : 32, 700), letterSpacing: '0.08em', textTransform: 'uppercase' }}>Queue active.</div>
                <div style={{ ...mono(10, C.dim), marginTop: 12 }}>CYCLE-02 · RB-003 · EST. 2026.TBC</div>
              </div>
              <div style={{ ...grotesk(13, 300, '#888'), lineHeight: 1.8 }}>
                Your record has been logged. Allocation is not confirmed. You will be notified when the batch opens — if your record qualifies.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
