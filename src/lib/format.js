/* ── PRICE PARSER ── */
export const parsePrice = (priceStr) => parseInt(priceStr.replace(/[R\s]/g, ''), 10);

export const fmtCurrency = (n) => `R ${n.toLocaleString()}`;
