import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { C, F, TONES } from './lib/theme';
import { EMAILJS_PUBLIC_KEY } from './lib/config';
import { useCursor } from './lib/useCursor';
import { useLenis } from './lib/useLenis';
import { LazyMotion, domAnimation, MotionConfig, AnimatePresence, m, EASE } from './lib/motion';
import { BATCHES, SETS } from './lib/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './screens/HomeScreen';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { ResultScreen } from './screens/ResultScreen';

const HEADER_H = 58;
const SCREENS = ['drop', 'product', 'cart', 'checkout', 'success', 'cancel'];

/* Legacy routes collapse into home sections. */
const ALIASES = {
  queue:   { screen: 'drop', anchor: 'queue' },
  contact: { screen: 'drop', anchor: 'contact' },
  sets:    { screen: 'drop' },
};

const resolve = (target) => {
  const [s, hash] = (target || 'drop').split('#');
  const a = ALIASES[s];
  if (a) return { screen: a.screen, anchor: hash || a.anchor };
  return { screen: SCREENS.includes(s) ? s : 'drop', anchor: hash || null };
};

const url = (screen, anchor) => '?s=' + screen + (anchor ? '#' + anchor : '');

export const App = () => {
  const [screen, setScreen] = useState('drop');
  const [selectedBatchId, setSelectedBatchId] = useState('RB-001');
  const [cart, setCart] = useState([]);
  const [orderRef, setOrderRef] = useState('');
  const [introDone, setIntroDone] = useState(() => !!sessionStorage.getItem('rb-intro'));
  const anchorRef = useRef(null);
  const [scrollNonce, setScrollNonce] = useState(0);

  useCursor();
  const lenisRef = useLenis();

  useEffect(() => { emailjs.init(EMAILJS_PUBLIC_KEY); }, []);

  /* Preloader handoff: index.html paints it pre-React; we retire it. */
  useEffect(() => {
    const el = document.getElementById('preloader');
    if (sessionStorage.getItem('rb-intro')) { el?.remove(); return; }
    const t = setTimeout(() => {
      sessionStorage.setItem('rb-intro', '1');
      setIntroDone(true);
      el?.classList.add('done');
      setTimeout(() => el?.remove(), 600);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    const handlePop = (e) => {
      const st = e.state || {};
      setScreen(SCREENS.includes(st.screen) ? st.screen : 'drop');
      anchorRef.current = st.anchor || null;
      setScrollNonce(n => n + 1);
    };
    window.addEventListener('popstate', handlePop);
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('s') || 'drop';
    const hash = window.location.hash.slice(1);
    const r = resolve(hash ? `${raw}#${hash}` : raw);
    setScreen(r.screen);
    anchorRef.current = r.anchor;
    setScrollNonce(n => n + 1);
    window.history.replaceState({ screen: r.screen, anchor: r.anchor }, '', url(r.screen, r.anchor));
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const nav = (target) => {
    const r = resolve(target);
    anchorRef.current = r.anchor;
    setScrollNonce(n => n + 1);
    if (r.screen !== screen) {
      setScreen(r.screen);
      window.history.pushState({ screen: r.screen, anchor: r.anchor }, '', url(r.screen, r.anchor));
    } else {
      window.history.replaceState({ screen: r.screen, anchor: r.anchor }, '', url(r.screen, r.anchor));
    }
  };

  /* Single scroll owner. Anchor targets may mount a beat later
     (AnimatePresence mode="wait"), so retry briefly. */
  useLayoutEffect(() => {
    let tries = 0, raf;
    const attempt = () => {
      const anchor = anchorRef.current;
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
          if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -HEADER_H });
          else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_H });
          return;
        }
        if (++tries < 60) raf = requestAnimationFrame(attempt);
      } else if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };
    raf = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(raf);
  }, [screen, scrollNonce]);

  const addToCart = (item) => {
    const qty = item.quantity || 1;
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id && c.size === item.size && c.colour === item.colour);
      if (existing) return prev.map(c => c.id === item.id && c.size === item.size && c.colour === item.colour ? { ...c, quantity: Math.min(10, c.quantity + qty) } : c);
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (id, size, colour) => setCart(prev => prev.filter(c => !(c.id === id && c.size === size && c.colour === colour)));

  const updateCartQuantity = (id, size, colour, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, size, colour);
    } else {
      setCart(prev => prev.map(c => c.id === id && c.size === size && c.colour === colour ? { ...c, quantity: Math.min(10, newQty) } : c));
    }
  };

  const clearCart = () => setCart([]);
  const onOrderComplete = (ref) => setOrderRef(ref);

  const screens = {
    drop:      <HomeScreen onNav={nav} onSelectBatch={setSelectedBatchId} batches={BATCHES} sets={SETS} addToCart={addToCart} introDone={introDone} />,
    product:   <ProductScreen onNav={nav} batchId={selectedBatchId} cart={cart} addToCart={addToCart} onSelectBatch={setSelectedBatchId} batches={BATCHES} />,
    cart:      <CartScreen cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} clearCart={clearCart} onNav={nav} />,
    checkout:  <CheckoutScreen cart={cart} onNav={nav} onOrderComplete={onOrderComplete} />,
    success:   <ResultScreen status="success" orderRef={orderRef} clearCart={clearCart} onNav={nav} />,
    cancel:    <ResultScreen status="cancel" onNav={nav} />,
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div style={{ ...TONES.light, minHeight: '100vh', background: C.bg, fontFamily: F.g, color: C.ink, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <Header screen={screen} onNav={nav} cart={cart} />
          <AnimatePresence mode="wait">
            <m.div key={screen} style={{ flex: 1 }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}>
              {screens[screen] || screens.drop}
            </m.div>
          </AnimatePresence>
          <Footer onNav={nav} />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
};
