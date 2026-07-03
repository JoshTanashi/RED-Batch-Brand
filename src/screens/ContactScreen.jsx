import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { C, F, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE, STORE_OWNER_EMAIL } from '../lib/config';
import { Ticker } from '../components/Ticker';
import { Divider } from '../components/Divider';
import { Btn } from '../components/Btn';

export const ContactScreen = ({ onNav }) => {
  const isMobile = useIsMobile();
  const [cForm, setCForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [cErrors, setCErrors] = useState({});
  const [cFocused, setCFocused] = useState(null);
  const [cSent, setCSent] = useState(false);
  const [cSending, setCSending] = useState(false);
  const [contactRef, setContactRef] = useState('');

  const cStyle = (k) => ({
    background: '#1A1A1A',
    border: `1px solid ${cErrors[k] ? C.red : cFocused === k ? C.red : '#2A2A2A'}`,
    color: C.ink, fontFamily: F.g, fontSize: 14, padding: '13px 16px',
    outline: 'none', borderRadius: 0, transition: 'border-color 0.15s', width: '100%', boxSizing: 'border-box',
  });

  const setField = (k, v) => {
    setCForm(f => ({ ...f, [k]: v }));
    if (cErrors[k]) setCErrors(e => ({ ...e, [k]: false }));
  };

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

  const infoCards = [
    { label: 'ORDER SUPPORT',    desc: 'Order issues, tracking, returns.' },
    { label: 'SIZING & PRODUCT', desc: 'Fit questions before you buy.' },
    { label: 'GENERAL',          desc: 'Everything else. Collaborations. Press.' },
  ];

  return (
    <div className="screen-enter">
      <Ticker />
      <div style={{ padding: isMobile ? '40px 24px' : '64px 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 64, maxWidth: 1100 }}>

        <div>
          <div style={{ ...mono(9, C.red), marginBottom: 16 }}>CONTACT · SUPPORT · RED-BATCH</div>
          <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: 'clamp(32px,5vw,56px)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: 32 }}>
            <div style={{ color: C.ink }}>GET IN</div>
            <div style={{ color: C.red }}>TOUCH.</div>
          </div>
          <div style={{ ...grotesk(14, 300, '#888'), maxWidth: 400, lineHeight: 1.9, marginBottom: 40 }}>
            Questions about an order, sizing, or the system. Fill in the form and a record will be created. Response time is typically within 24 hours.
          </div>
          <div>
            {infoCards.map(({ label, desc }) => (
              <div key={label} style={{ border: `1px solid ${C.line}`, padding: '16px 20px', marginBottom: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 8, height: 8, background: C.red, flexShrink: 0 }} />
                <div>
                  <div style={{ ...mono(8, C.dim) }}>{label}</div>
                  <div style={{ ...grotesk(13, 400, C.ink), marginTop: 2 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...mono(9, C.dim), lineHeight: 1.8, marginTop: 24 }}>
            Response time: within 24 hours.<br />
            South Africa only at this time.
          </div>
        </div>

        <div>
          <div style={{ ...grotesk(20, 600), letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Send a Record</div>
          <Divider />
          {cSent ? (
            <div style={{ border: `1px solid ${C.line}`, padding: 40, textAlign: 'center', position: 'relative', marginTop: 24 }}>
              {[{ t: true, l: true }, { t: true, l: false }, { t: false, l: true }, { t: false, l: false }].map(({ t, l }, i) => (
                <div key={i} style={{ position: 'absolute', width: 6, height: 6, background: C.red, top: t ? -1 : 'auto', bottom: !t ? -1 : 'auto', left: l ? -1 : 'auto', right: !l ? -1 : 'auto' }} />
              ))}
              <div style={{ ...mono(9, C.red) }}>RECORD CREATED.</div>
              <div style={{ ...grotesk(28, 700), letterSpacing: '0.08em', textTransform: 'uppercase', margin: '16px 0' }}>Message received.</div>
              <div style={{ ...mono(10, C.dim) }}>Ref: {contactRef}</div>
              <div style={{ ...grotesk(14, 300, '#888'), lineHeight: 1.8, marginTop: 16 }}>
                A record of your message has been created.<br />
                We will respond to {cForm.email} within 24 hours.
              </div>
              <div style={{ marginTop: 32 }}>
                <Btn v="ghost" onClick={() => { onNav('drop'); window.scrollTo(0,0); }}>Return to Drop</Btn>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 24 }}>
              {[
                { key: 'name',  label: 'FULL NAME',      type: 'text'  },
                { key: 'email', label: 'EMAIL ADDRESS',   type: 'email' },
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
                    <option key={opt} value={opt} style={{ background: C.bg2, color: C.ink }}>{opt}</option>
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
        </div>
      </div>
    </div>
  );
};
