import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { C, F, mono, grotesk, display } from '../lib/theme';
import { EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE } from '../lib/config';
import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { Btn } from '../components/Btn';
import { useIsMobile } from '../lib/useIsMobile';

export const QueueSection = () => {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  /* Handler carried over verbatim from the old QueueScreen. */
  const register = async () => {
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
  };

  return (
    <Section tone="dark" id="queue">
      <div style={{ padding: isMobile ? '72px 24px' : '120px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 44 : 80, alignItems: 'center' }}>
          <Reveal>
            <div style={{ ...mono(10, C.red), marginBottom: 20 }}>CYCLE-02 · UNANNOUNCED · EST 2026.TBC</div>
            <h2 style={{ ...display(120), marginBottom: 24 }}>
              next<br />cycle<span style={{ color: C.red }}>.</span>
            </h2>
            <p style={{ ...grotesk(14, 300, C.dim), lineHeight: 1.8, maxWidth: 400 }}>
              The next batch is not yet released. Register to receive notification when the
              record opens. Registration does not guarantee allocation — units are issued
              in order of record creation.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            {!submitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ ...mono(9, C.dim) }}>EMAIL ADDRESS</div>
                <input value={email} onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                  onKeyDown={e => { if (e.key === 'Enter') register(); }}
                  placeholder="archive@domain.com"
                  style={{ background: C.bg2, border: `1px solid ${focused ? C.red : C.line}`, color: C.ink, fontFamily: F.g, fontSize: 15, padding: '15px 18px', outline: 'none', borderRadius: 0, transition: 'border-color 0.15s', width: '100%', boxSizing: 'border-box' }} />
                <Btn onClick={register} disabled={!email}>Register Record →</Btn>
                <div style={{ ...mono(8, C.dim), lineHeight: 1.8 }}>
                  REGISTRATION DOES NOT GUARANTEE ALLOCATION · RECORDS ARE PERMANENT
                </div>
              </div>
            ) : (
              <div style={{ border: `1px solid ${C.line}`, padding: isMobile ? 28 : 40, textAlign: 'center', position: 'relative' }}>
                {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
                  <div key={i} style={{ position: 'absolute', width: 8, height: 8, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
                ))}
                <div style={{ ...mono(9, C.red), marginBottom: 12 }}>RECORD CREATED</div>
                <div style={{ ...grotesk(isMobile ? 24 : 30, 700), letterSpacing: '0.06em', textTransform: 'uppercase' }}>Queue active.</div>
                <div style={{ ...mono(9, C.dim), marginTop: 14, lineHeight: 1.9 }}>
                  CYCLE-02 · EST 2026.TBC<br />
                  You will be notified if your record qualifies.
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
