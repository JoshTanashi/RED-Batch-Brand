import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { C, F, mono, grotesk } from '../lib/theme';
import { useIsMobile } from '../lib/useIsMobile';
import { fmtCurrency } from '../lib/format';
import { submitPayfastForm } from '../lib/payfast';
import {
  PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASSPHRASE, PAYFAST_URL,
  EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE, EMAILJS_CUSTOMER_TEMPLATE, STORE_OWNER_EMAIL,
} from '../lib/config';
import { Ticker } from '../components/Ticker';
import { Divider } from '../components/Divider';
import { Btn } from '../components/Btn';

export const CheckoutScreen = ({ cart, onNav, onOrderComplete }) => {
  const isMobile = useIsMobile();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const [deliveryMethod, setDeliveryMethod] = useState('door');
  const [pudoLocker, setPudoLocker] = useState('');
  const deliveryFee = deliveryMethod === 'locker' ? 60 : 120;
  const total = subtotal + deliveryFee;

  const blankForm = { fullName: '', email: '', phone: '', address: '', suburb: '', city: '', province: '', postalCode: '' };
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [policyError, setPolicyError] = useState(false);

  const provinces = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'];

  const setField = (k, v) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: false })); };

  const iStyle = (k) => ({
    background: C.g2, border: `1px solid ${errors[k] ? C.red : focused === k ? C.red : C.grey}`,
    color: C.white, fontFamily: F.g, fontSize: 14, padding: '13px 16px',
    outline: 'none', borderRadius: 0, transition: 'border-color 0.15s', width: '100%', boxSizing: 'border-box',
  });

  const validate = () => {
    const e = {};
    Object.entries(form).forEach(([k, v]) => { if (!v.trim()) e[k] = true; });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!policyAccepted) { setPolicyError(true); return; }
    if (!validate()) return;
    setSubmitting(true);
    const parts = form.fullName.trim().split(' ');
    const firstName = parts[0];
    const lastName  = parts.slice(1).join(' ') || '-';
    const orderRef  = `RB${(cart[0]?.id || 'RB-001').replace('RB-', '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const productName = cart.map(i => i.name).join(', ');
    const productDesc = cart.map(i => `${i.name} · ${i.size} · ${i.colour}`).join(', ');

    const emailParams = {
      order_ref: orderRef, product_name: productName,
      size: cart.map(i => i.isSet ? 'Tee: ' + i.teeSize + ' / Hoodie: ' + i.hoodieSize : i.size).join(', '),
      colour: cart.map(i => i.isSet ? 'Washed Black — Complete Set' : i.colour).join(', '),
      price: fmtCurrency(total), customer_name: form.fullName, customer_phone: form.phone,
      customer_email: form.email, address_line1: form.address, suburb: form.suburb,
      city: form.city, province: form.province, postal_code: form.postalCode,
      courier: 'Pudo',
      delivery_method: deliveryMethod === 'locker' ? 'Pudo Locker-to-Locker (R60)' : 'Pudo Door-to-Door (R120)',
      pudo_locker: pudoLocker || 'N/A',
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE, { ...emailParams, to_email: STORE_OWNER_EMAIL });
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE, emailParams);
    } catch (err) { console.error('EmailJS error:', err); }

    onOrderComplete(orderRef);

    const pfParams = {
      merchant_id: PAYFAST_MERCHANT_ID, merchant_key: PAYFAST_MERCHANT_KEY,
      return_url: 'https://redbatch.store/success', cancel_url: 'https://redbatch.store/cancel',
      notify_url: 'https://redbatch.store/.netlify/functions/payfast-notify',
      name_first: firstName, name_last: lastName, email_address: form.email,
      m_payment_id: orderRef, amount: (subtotal + deliveryFee).toFixed(2),
      item_name: `RED-BATCH ${orderRef}`, item_description: productDesc,
      passphrase: PAYFAST_PASSPHRASE,
    };

    submitPayfastForm(pfParams, PAYFAST_URL);
  };

  const textFields = [
    { key: 'fullName', label: 'Full Name',     type: 'text'  },
    { key: 'email',    label: 'Email Address',  type: 'email' },
    { key: 'phone',    label: 'Phone Number',   type: 'tel'   },
    { key: 'address',  label: 'Street Address', type: 'text'  },
    { key: 'suburb',   label: 'Suburb',         type: 'text'  },
    { key: 'city',     label: 'City',           type: 'text'  },
  ];

  return (
    <div className="screen-enter">
      <Ticker />
      <div style={{ padding: isMobile ? '32px 24px' : '48px' }}>
        <div style={{ ...mono(9, C.red), marginBottom: 12 }}>DELIVERY RECORD</div>
        <div style={{ fontFamily: F.g, fontWeight: 700, fontSize: isMobile ? 36 : 52, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 40 }}>CHECKOUT.</div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: isMobile ? 40 : 48, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {textFields.map(({ key, label, type }) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ ...mono(9), marginBottom: 2 }}>{label} *</div>
                <input type={type} value={form[key]} onChange={e => setField(key, e.target.value)}
                  onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
                  style={iStyle(key)} />
                {errors[key] && <div style={{ ...mono(9, C.red) }}>Field required.</div>}
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ ...mono(9), marginBottom: 2 }}>Province *</div>
              <select value={form.province} onChange={e => setField('province', e.target.value)}
                onFocus={() => setFocused('province')} onBlur={() => setFocused(null)}
                style={{ ...iStyle('province'), cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}>
                <option value="">Select province</option>
                {provinces.map(p => <option key={p} value={p} style={{ background: C.g2, color: C.white }}>{p}</option>)}
              </select>
              {errors.province && <div style={{ ...mono(9, C.red) }}>Field required.</div>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ ...mono(9), marginBottom: 2 }}>Postal Code *</div>
              <input type="text" value={form.postalCode} onChange={e => setField('postalCode', e.target.value)}
                onFocus={() => setFocused('postalCode')} onBlur={() => setFocused(null)}
                style={iStyle('postalCode')} />
              {errors.postalCode && <div style={{ ...mono(9, C.red) }}>Field required.</div>}
            </div>
          </div>

          <div style={{ border: `1px solid ${C.grey}`, padding: 28, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: C.red }} />
            <div style={{ ...mono(9, C.red), marginBottom: 20 }}>ORDER SUMMARY</div>
            {cart.map(item => (
              <div key={`${item.id}-${item.size}-${item.colour}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.g2}` }}>
                <div>
                  <div style={{ fontFamily: F.m, fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', color: C.white }}>{item.name}</div>
                  <div style={{ ...mono(8, C.dim), marginTop: 3 }}>{item.isSet ? 'COMPLETE SET' : item.size} · {item.colour}</div>
                </div>
                <span style={{ fontFamily: F.m, fontSize: 12, color: C.white }}>{fmtCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            {[['Subtotal', fmtCurrency(subtotal)], [deliveryMethod === 'locker' ? 'Pudo Locker-to-Locker' : 'Pudo Door-to-Door', fmtCurrency(deliveryFee)]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.g2}` }}>
                <span style={{ ...grotesk(13, 400, C.dim) }}>{k}</span>
                <span style={{ fontFamily: F.m, fontSize: 13, color: C.white }}>{v}</span>
              </div>
            ))}
            <Divider color={C.red} />
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0' }}>
              <span style={{ ...grotesk(14, 600) }}>Total</span>
              <span style={{ fontFamily: F.m, fontWeight: 700, fontSize: 18, color: C.white }}>{fmtCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <div style={{ ...mono(9, C.red), marginBottom: 12 }}>DELIVERY METHOD</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 1, background: C.grey, marginBottom: 20 }}>
            <div onClick={() => setDeliveryMethod('locker')} style={{ background: C.black, padding: 16, cursor: 'pointer', border: `2px solid ${deliveryMethod === 'locker' ? C.red : 'transparent'}`, transition: 'border-color 0.15s', position: 'relative' }}>
              <div style={{ ...mono(9, deliveryMethod === 'locker' ? C.red : C.dim) }}>PUDO LOCKER · R 60</div>
              <div style={{ ...grotesk(13, 300, '#888'), marginTop: 6 }}>Collect from your nearest Pudo locker. You will receive a collection notification via SMS or email.</div>
              {deliveryMethod === 'locker' && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ ...mono(8, C.dim), marginBottom: 4 }}>YOUR NEAREST PUDO LOCKER / AREA</div>
                  <input value={pudoLocker} onChange={e => setPudoLocker(e.target.value)}
                    placeholder="e.g. Sandton City Pudo Locker"
                    style={{ background: C.g2, border: `1px solid ${C.grey}`, color: C.white, fontFamily: F.g, fontSize: 14, padding: '10px 12px', outline: 'none', borderRadius: 0, width: '100%', boxSizing: 'border-box' }} />
                </div>
              )}
            </div>
            <div onClick={() => setDeliveryMethod('door')} style={{ background: C.black, padding: 16, cursor: 'pointer', border: `2px solid ${deliveryMethod === 'door' ? C.red : 'transparent'}`, transition: 'border-color 0.15s', position: 'relative' }}>
              {deliveryMethod === 'door' && <div style={{ position: 'absolute', top: 0, right: 0, width: 6, height: 6, background: C.red }} />}
              <div style={{ ...mono(9, deliveryMethod === 'door' ? C.red : C.dim) }}>PUDO DOOR-TO-DOOR · R 120</div>
              <div style={{ ...grotesk(13, 300, '#888'), marginTop: 6 }}>Delivered directly to your address. Allow 2–4 business days after dispatch.</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 0, borderTop: `1px solid ${C.grey}`, paddingTop: 32 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16 }}>
            <div
              onClick={() => { setPolicyAccepted(a => !a); setPolicyError(false); }}
              style={{ width: 14, height: 14, border: `1px solid ${policyAccepted ? C.red : C.grey}`, background: policyAccepted ? C.red : 'transparent', cursor: 'pointer', flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
              {policyAccepted && <span style={{ color: C.white, fontSize: 10, lineHeight: 1 }}>✓</span>}
            </div>
            <div style={{ ...mono(9, '#888'), lineHeight: 1.6 }}>
              I understand that all sales are final. No returns or refunds are accepted. Each item is made-to-order for me specifically.
            </div>
          </div>
          <Btn onClick={handleSubmit} disabled={submitting || !policyAccepted} style={{ opacity: !policyAccepted ? 0.4 : 1, cursor: !policyAccepted ? 'not-allowed' : 'pointer' }}>
            {submitting ? 'Processing...' : 'Confirm Order — Pay Now →'}
          </Btn>
          {policyError && <div style={{ ...mono(9, C.red), marginTop: 8 }}>Please accept the policy to continue.</div>}
        </div>
      </div>
    </div>
  );
};
