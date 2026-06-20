/* RED-BATCH · Store config — read from Vite env vars at build time */
export const PAYFAST_MERCHANT_ID       = import.meta.env.VITE_PAYFAST_MERCHANT_ID;
export const PAYFAST_MERCHANT_KEY      = import.meta.env.VITE_PAYFAST_MERCHANT_KEY;
export const PAYFAST_PASSPHRASE        = import.meta.env.VITE_PAYFAST_PASSPHRASE;
export const PAYFAST_URL               = import.meta.env.VITE_PAYFAST_URL;

export const EMAILJS_PUBLIC_KEY        = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
export const EMAILJS_SERVICE_ID        = import.meta.env.VITE_EMAILJS_SERVICE_ID;
export const EMAILJS_OWNER_TEMPLATE    = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE;
export const EMAILJS_CUSTOMER_TEMPLATE = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE;

export const STORE_OWNER_EMAIL         = import.meta.env.VITE_STORE_OWNER_EMAIL;
export const DELIVERY_FEE              = Number(import.meta.env.VITE_DELIVERY_FEE);
