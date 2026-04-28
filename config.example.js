/*
 * SETUP INSTRUCTIONS
 * ─────────────────────────────────────────────────────
 * 1. Copy this file:  cp config.example.js config.js
 * 2. Open config.js and fill in your real credentials
 * 3. config.js is gitignored — safe to store real values
 * 4. Never rename config.example.js or add real values to it
 * 5. For Netlify production deployment:
 *    Go to Netlify → Site Settings → Environment Variables
 *    Add each key from this file with your real values
 *    Then use a Netlify build plugin or _headers to inject them
 * ─────────────────────────────────────────────────────
 */

/* RED-BATCH · Config Example
 * Copy this file to config.js and fill in real values.
 * config.js is gitignored — config.example.js is not.
 */

const STORE_CONFIG = {
  PAYFAST_MERCHANT_ID:       'YOUR_MERCHANT_ID',
  PAYFAST_MERCHANT_KEY:      'YOUR_MERCHANT_KEY',
  PAYFAST_PASSPHRASE:        'YOUR_PASSPHRASE',
  EMAILJS_PUBLIC_KEY:        'YOUR_EMAILJS_PUBLIC_KEY',
  EMAILJS_SERVICE_ID:        'YOUR_SERVICE_ID',
  EMAILJS_OWNER_TEMPLATE:    'YOUR_OWNER_TEMPLATE_ID',
  EMAILJS_CUSTOMER_TEMPLATE: 'YOUR_CUSTOMER_TEMPLATE_ID',
  STORE_OWNER_EMAIL:         'your@email.com',
  DELIVERY_FEE:              60,
  PAYFAST_URL:               'https://sandbox.payfast.co.za/eng/process',
};
