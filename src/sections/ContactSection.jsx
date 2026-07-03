import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { C, F, mono, grotesk, display } from '../lib/theme';
import { EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE, STORE_OWNER_EMAIL } from '../lib/config';
import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { Btn } from '../components/Btn';
import { useIsMobile } from '../lib/useIsMobile';

export const ContactSection = () => {
  const isMobile = useIsMobile();
  const [cForm, setCForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [cErrors, setCErrors] = useState({});
  const [cFocused, setCFocused] = useState(null);
  const [cSent, setCSent] = useState(false);
  const [cSending, setCSending] = useState(false);
  const [contactRef, setContactRef] = useState('');

  const cStyle = (k) => ({
    background: C.bg2,
    border: `1px solid ${cErrors[k] ? C.red : cFocused === k ? C.red : C.line}`,
    color: C.ink, fontFamily: F.g, fontSize: 14, padding: '13px 16px',
    outline: 'none', borderRadius: 0, transition: 'border-color 0.15s', width: '100%', boxSizing: 'border-box',
  });

  const setField = (k, v) => {
    setCForm(f => ({ ...f, [k]: v }));
    if (cErrors[k]) setCErrors(e => ({ ...e, [k]: false }));
  };

  /* Handler carried over verbatim from the old ContactScreen. */
  const handleSubmit = async () => {
    const e = {};
    Object.entries(cForm).forEach(([k, v]) => { if (!v.trim()) e[k] = true; });
    setCErrors(e);
    if (Object.keys(e).length > 0) return;
    setCSending(true);
    const ref = `RBC-${Math.floor(1000 + Math.random() * 9000)}`;
    setContactRef(ref);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE, {
        contact_ref: ref,
        order_ref: ref,
        customer_name: cForm.name,
        customer_email: cForm.email,
        customer_phone: 'N/A',
        subject: cForm.subject,
        message: cForm.message,
        type: 'CONTACT ENQUIRY',
        address_line1: 'N/A',
        suburb: 'N/A',
        city: 'N/A',
        province: 'N/A',
        postal_code: 'N/A',
        product_name: cForm.subject,
        size: 'N/A',
        colour: 'N/A',
        price: 'N/A',
        to_email: STORE_OWNER_EMAIL,
      });
    } catch (err) { console.error('EmailJS error:', err); }
    setCSent(true);
    setCSending(false);
  };

  return (
    <Section tone="light" id="contact">
      <div style={{ padding: isMobile ? '72px 24px' : '120px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 44 : 80 }}>

          <Reveal>
            <div style={{ ...mono(10, C.red), marginBottom: 20 }}>CONTACT · SUPPORT · RED-BATCH</div>
            <h2 style={{ ...display(110), marginBottom: 24 }}>
              get in<br />touch<span style={{ color: C.red }}>.</span>
            </h2>
            <p style={{ ...grotesk(14, 300, C.dim), lineHeight: 1.8, maxWidth: 380, marginBottom: 32 }}>
              Questions about an order, sizing, or the system. Fill in the form and a record
              will be created. Response time is typically within 24 hours. South Africa only
              at this time.
            </p>
            <div style={{ maxWidth: 400 }}>
              {[
                { label: 'ORDER SUPPORT',    desc: 'Order issues, tracking, delivery.' },
                { label: 'SIZING & PRODUCT', desc: 'Fit questions before you buy.' },
                { label: 'GENERAL',          desc: 'Everything else. Collaborations. Press.' },
              ].map(({ label, desc }) => (
                <div key={label} style={{ borderTop: `1px solid ${C.line}`, padding: '14px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 6, height: 6, background: C.red, flexShrink: 0 }} />
                  <div>
                    <span style={{ ...mono(8, C.dim) }}>{label}</span>
                    <span style={{ ...grotesk(13, 400, C.ink), marginLeft: 12 }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {cSent ? (
              <div style={{ border: `1px solid ${C.line}`, padding: 40, textAlign: 'center', position: 'relative' }}>
                {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
                  <div key={i} style={{ position: 'absolute', width: 6, height: 6, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
                ))}
                <div style={{ ...mono(9, C.red) }}>RECORD CREATED.</div>
                <div style={{ ...grotesk(26, 700), letterSpacing: '0.06em', textTransform: 'uppercase', margin: '16px 0' }}>Message received.</div>
                <div style={{ ...mono(10, C.dim) }}>Ref: {contactRef}</div>
                <div style={{ ...grotesk(14, 300, C.dim), lineHeight: 1.8, marginTop: 16 }}>
                  A record of your message has been created.<br />
                  We will respond to {cForm.email} within 24 hours.
                </div>
              </div>
            ) : (
              <div>
                {[
                  { key: 'name',  label: 'FULL NAME',     type: 'text'  },
                  { key: 'email', label: 'EMAIL ADDRESS', type: 'email' },
                ].map(({ key, label, type }) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                    <label style={{ ...mono(9, C.dim) }}>{label}</label>
                    <input type={type} value={cForm[key]} onChange={e => setField(key, e.target.value)}
                      onFocus={() => setCFocused(key)} onBlur={() => setCFocused(null)}
                      style={cStyle(key)} />
                    {cErrors[key] && <span style={{ ...mono(8, C.red) }}>Required.</span>}
                  </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <label style={{ ...mono(9, C.dim) }}>SUBJECT</label>
                  <select value={cForm.subject} onChange={e => setField('subject', e.target.value)}
                    onFocus={() => setCFocused('subject')} onBlur={() => setCFocused(null)}
                    style={{ ...cStyle('subject'), cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}>
                    <option value="">Select subject</option>
                    {['Order Support', 'Sizing & Product Question', 'Collaboration / Press', 'General Enquiry'].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {cErrors.subject && <span style={{ ...mono(8, C.red) }}>Required.</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
                  <label style={{ ...mono(9, C.dim) }}>MESSAGE</label>
                  <textarea value={cForm.message} onChange={e => setField('message', e.target.value)}
                    onFocus={() => setCFocused('message')} onBlur={() => setCFocused(null)}
                    style={{ ...cStyle('message'), minHeight: 140, resize: 'vertical' }} />
                  {cErrors.message && <span style={{ ...mono(8, C.red) }}>Required.</span>}
                </div>
                <Btn onClick={handleSubmit} disabled={cSending}>
                  {cSending ? 'Sending...' : 'Send Record →'}
                </Btn>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
