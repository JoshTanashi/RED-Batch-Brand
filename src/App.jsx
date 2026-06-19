import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { C, F, mono } from './lib/theme';
import { EMAILJS_PUBLIC_KEY } from './lib/config';
import { useCursor } from './lib/useCursor';
import { fetchProducts } from './lib/supabaseClient';
import { AnimatedBg } from './components/AnimatedBg';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DropScreen } from './screens/DropScreen';
import { ProductScreen } from './screens/ProductScreen';
import { QueueScreen } from './screens/QueueScreen';
import { SetsScreen } from './screens/SetsScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { CancelScreen } from './screens/CancelScreen';
import { ContactScreen } from './screens/ContactScreen';
import { AdminScreen } from './screens/AdminScreen';

export const App = () => {
  const [screen, setScreen] = useState('drop');
  const [selectedBatchId, setSelectedBatchId] = useState('RB-001');
  const [cart, setCart] = useState([]);
  const [orderRef, setOrderRef] = useState('');
  const [products, setProducts] = useState({ batches: [], sets: [] });
  const [productsLoading, setProductsLoading] = useState(true);

  useCursor();

  useEffect(() => { emailjs.init(EMAILJS_PUBLIC_KEY); }, []);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(err => console.error('Failed to load products:', err))
      .finally(() => setProductsLoading(false));
  }, []);

  useEffect(() => {
    const handlePop = (e) => {
      if (e.state && e.state.screen) {
        setScreen(e.state.screen);
      } else {
        setScreen('drop');
      }
    };
    window.addEventListener('popstate', handlePop);
    const params = new URLSearchParams(window.location.search);
    const initialScreen = params.get('s') || 'drop';
    setScreen(initialScreen);
    window.history.replaceState(
      { screen: initialScreen }, '', '?s=' + initialScreen
    );
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const nav = (s) => {
    setScreen(s);
    window.history.pushState({ screen: s }, '', '?s=' + s);
  };

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

  if (screen === 'admin') {
    return <AdminScreen />;
  }

  if (productsLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.black }}>
        <span style={{ ...mono(10, C.dim) }}>LOADING…</span>
      </div>
    );
  }

  const screens = {
    drop:      <DropScreen onNav={nav} onSelectBatch={setSelectedBatchId} batches={products.batches} />,
    product:   <ProductScreen onNav={nav} batchId={selectedBatchId} cart={cart} addToCart={addToCart} onSelectBatch={setSelectedBatchId} batches={products.batches} />,
    queue:     <QueueScreen />,
    sets:      <SetsScreen onNav={nav} cart={cart} addToCart={addToCart} sets={products.sets} />,
    cart:      <CartScreen cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} clearCart={clearCart} onNav={nav} />,
    checkout:  <CheckoutScreen cart={cart} onNav={nav} onOrderComplete={onOrderComplete} />,
    success:   <SuccessScreen orderRef={orderRef} clearCart={clearCart} onNav={nav} />,
    cancel:    <CancelScreen onNav={nav} />,
    contact:   <ContactScreen onNav={nav} />,
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: F.g, color: C.white, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header screen={screen} onNav={nav} cart={cart} />
        <div key={screen} style={{ flex: 1 }}>{screens[screen] || screens.drop}</div>
        <Footer onNav={nav} />
      </div>
    </div>
  );
};
