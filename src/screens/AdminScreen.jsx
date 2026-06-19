import { useState, useEffect } from 'react';
import { C, F, mono, grotesk } from '../lib/theme';
import { Btn } from '../components/Btn';
import { Divider } from '../components/Divider';
import { supabase } from '../lib/supabaseClient';

const EMPTY_FORM = {
  id: '', kind: 'batch', season: '', cycle: '', name: '', units: 0,
  status: 'COMING_SOON', date: '', price: '', sizes: '', origin: '',
  weight: '', fit: '', type: '', description: '', images: '',
  includes: '', items: '', sort_order: 0,
};

const inputStyle = { background: C.g2, border: `1px solid ${C.grey}`, color: C.white, fontFamily: F.g, fontSize: 13, padding: '10px 12px', outline: 'none', borderRadius: 0, width: '100%' };
const labelStyle = { ...mono(8), marginBottom: 6, display: 'block' };

const rowToForm = (row) => ({
  ...EMPTY_FORM,
  ...row,
  sizes: (row.sizes || []).join(', '),
  images: (row.images || []).join(', '),
  includes: (row.includes || []).join(', '),
  items: (row.items || []).join(', '),
});

const formToRow = (form) => ({
  ...form,
  units: Number(form.units) || 0,
  sort_order: Number(form.sort_order) || 0,
  sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()).filter(Boolean) : [],
  images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [],
  includes: form.includes ? form.includes.split(',').map(s => s.trim()).filter(Boolean) : [],
  items: form.items ? form.items.split(',').map(s => s.trim()).filter(Boolean) : [],
});

const Field = ({ label, children }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const LoginForm = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) { setError(error.message); return; }
    onLoggedIn();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.black }}>
      <form onSubmit={handleSubmit} style={{ border: `1px solid ${C.grey}`, padding: 32, width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ ...mono(9, C.red) }}>RED-BATCH · ADMIN</div>
        <Field label="Email">
          <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </Field>
        <Field label="Password">
          <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Field>
        {error && <div style={{ ...mono(9, C.red) }}>{error}</div>}
        <Btn disabled={busy}>{busy ? 'Signing in…' : 'Sign In'}</Btn>
      </form>
    </div>
  );
};

const ProductForm = ({ initial, onSaved, onCancel }) => {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.from('products').upsert(formToRow(form));
    setBusy(false);
    if (error) { setError(error.message); return; }
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: `1px solid ${C.grey}`, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="ID (e.g. RB-009)">
          <input style={inputStyle} value={form.id} onChange={set('id')} required disabled={!!initial.id} />
        </Field>
        <Field label="Kind">
          <select style={inputStyle} value={form.kind} onChange={set('kind')}>
            <option value="batch">batch</option>
            <option value="set">set</option>
          </select>
        </Field>
        <Field label="Name"><input style={inputStyle} value={form.name} onChange={set('name')} required /></Field>
        <Field label="Price (e.g. R 599)"><input style={inputStyle} value={form.price} onChange={set('price')} required /></Field>
        <Field label="Units"><input style={inputStyle} type="number" value={form.units} onChange={set('units')} /></Field>
        <Field label="Status">
          <select style={inputStyle} value={form.status} onChange={set('status')}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMING_SOON">COMING_SOON</option>
          </select>
        </Field>
        <Field label="Season"><input style={inputStyle} value={form.season || ''} onChange={set('season')} /></Field>
        <Field label="Cycle (sets only)"><input style={inputStyle} value={form.cycle || ''} onChange={set('cycle')} /></Field>
        <Field label="Date"><input style={inputStyle} value={form.date || ''} onChange={set('date')} /></Field>
        <Field label="Type (Tee / Hoodie)"><input style={inputStyle} value={form.type || ''} onChange={set('type')} /></Field>
        <Field label="Origin"><input style={inputStyle} value={form.origin || ''} onChange={set('origin')} /></Field>
        <Field label="Weight"><input style={inputStyle} value={form.weight || ''} onChange={set('weight')} /></Field>
        <Field label="Fit"><input style={inputStyle} value={form.fit || ''} onChange={set('fit')} /></Field>
        <Field label="Sort order"><input style={inputStyle} type="number" value={form.sort_order} onChange={set('sort_order')} /></Field>
      </div>
      <Field label="Sizes (comma-separated)"><input style={inputStyle} value={form.sizes} onChange={set('sizes')} placeholder="S, M, L, XL, 2XL" /></Field>
      <Field label="Description"><textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.description || ''} onChange={set('description')} /></Field>
      <Field label="Images (comma-separated paths)"><input style={inputStyle} value={form.images} onChange={set('images')} placeholder="./images/rb-009-a.png, ./images/rb-009-b.png" /></Field>
      <Field label="Includes (sets only, comma-separated)"><input style={inputStyle} value={form.includes} onChange={set('includes')} /></Field>
      <Field label="Items (sets only, comma-separated batch IDs)"><input style={inputStyle} value={form.items} onChange={set('items')} placeholder="RB-001, RB-002" /></Field>
      {error && <div style={{ ...mono(9, C.red) }}>{error}</div>}
      <div style={{ display: 'flex', gap: 12 }}>
        <Btn disabled={busy}>{busy ? 'Saving…' : 'Save Product'}</Btn>
        <Btn v="ghost" onClick={onCancel}>Cancel</Btn>
      </div>
    </form>
  );
};

const ProductList = ({ products, onEdit, onDelete }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: C.grey }}>
    {products.map(p => (
      <div key={p.id} style={{ background: C.black, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <div style={{ fontFamily: F.m, fontSize: 12, color: C.white }}>{p.id} · {p.name}</div>
          <div style={{ ...mono(8, C.dim), marginTop: 2 }}>{p.kind} · {p.status} · {p.price} · {p.units} units</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onEdit(p)} style={{ ...mono(9, C.dim), background: 'none', border: `1px solid ${C.grey}`, padding: '6px 12px', cursor: 'pointer' }}>EDIT</button>
          <button onClick={() => onDelete(p.id)} style={{ ...mono(9, C.red), background: 'none', border: `1px solid ${C.grey}`, padding: '6px 12px', cursor: 'pointer' }}>DELETE</button>
        </div>
      </div>
    ))}
  </div>
);

export const AdminScreen = () => {
  const [session, setSession] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadProducts = () => {
    supabase.from('products').select('*').order('sort_order').then(({ data, error }) => {
      if (!error) setProducts(data);
    });
  };

  useEffect(() => { if (session) loadProducts(); }, [session]);

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete product ${id}? This cannot be undone.`)) return;
    await supabase.from('products').delete().eq('id', id);
    loadProducts();
  };

  const handleSaved = () => {
    setEditing(null);
    setCreating(false);
    loadProducts();
  };

  if (session === undefined) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.black }}>
        <span style={{ ...mono(10, C.dim) }}>LOADING…</span>
      </div>
    );
  }

  if (!session) {
    return <LoginForm onLoggedIn={() => {}} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: C.black, padding: '48px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ ...grotesk(24, 700), letterSpacing: '0.06em', textTransform: 'uppercase' }}>Product Admin</div>
        <button onClick={() => supabase.auth.signOut()} style={{ ...mono(9, C.dim), background: 'none', border: `1px solid ${C.grey}`, padding: '8px 16px', cursor: 'pointer' }}>SIGN OUT</button>
      </div>
      <Divider />

      {editing || creating ? (
        <ProductForm
          initial={editing ? rowToForm(editing) : EMPTY_FORM}
          onSaved={handleSaved}
          onCancel={() => { setEditing(null); setCreating(false); }}
        />
      ) : (
        <>
          <Btn onClick={() => setCreating(true)} style={{ width: 200 }}>+ New Product</Btn>
          <ProductList products={products} onEdit={setEditing} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};
