import md5 from 'blueimp-md5';

/* ── PAYFAST SIGNATURE ──
   PayFast requires an MD5 hash of the sorted key=value pairs, including the
   merchant passphrase, with spaces encoded as '+' rather than '%20'. */
export const buildPayfastSignature = (params) => {
  const sigString = Object.keys(params).sort()
    .map(k => `${k}=${encodeURIComponent(params[k]).replace(/%20/g, '+')}`)
    .join('&');
  return md5(sigString);
};

/* Builds and auto-submits a hidden POST form to the PayFast process URL. */
export const submitPayfastForm = (paramsWithPassphrase, payfastUrl) => {
  const signature = buildPayfastSignature(paramsWithPassphrase);
  const submitParams = { ...paramsWithPassphrase, signature };
  delete submitParams.passphrase;

  const pf = document.createElement('form');
  pf.method = 'POST';
  pf.action = payfastUrl;
  Object.entries(submitParams).forEach(([k, v]) => {
    const inp = document.createElement('input');
    inp.type = 'hidden';
    inp.name = k;
    inp.value = v;
    pf.appendChild(inp);
  });
  document.body.appendChild(pf);
  pf.submit();
};
