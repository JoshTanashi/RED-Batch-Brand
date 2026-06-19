import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const toBatch = (row) => ({
  id: row.id, season: row.season, name: row.name, units: row.units,
  status: row.status, date: row.date, price: row.price, sizes: row.sizes || [],
  origin: row.origin, weight: row.weight, fit: row.fit, type: row.type,
  desc: row.description, images: row.images || [],
});

const toSet = (row) => ({
  id: row.id, cycle: row.cycle, name: row.name, items: row.items || [],
  price: row.price, units: row.units, status: row.status, date: row.date,
  desc: row.description, includes: row.includes || [], images: row.images || [],
});

export const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*').order('sort_order');
  if (error) throw error;
  const batches = data.filter(r => r.kind === 'batch').map(toBatch);
  const sets = data.filter(r => r.kind === 'set').map(toSet);
  return { batches, sets };
};
