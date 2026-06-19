/* ── DATA ──
   Static for now; replaced by a Supabase-backed fetch in a later phase. */
export const SETS = [
  {
    id: 'SET-001',
    cycle: 'CYCLE-01',
    name: 'The CYCLE-01 Record',
    items: ['RB-001', 'RB-002', 'RB-003', 'RB-004', 'RB-005'],
    price: 'R 3 299',
    units: 10,
    status: 'ACTIVE',
    date: '2026.04.23',
    desc: 'The complete CYCLE-01 record. Every tee from the cycle plus the best-seller hoodie. One colourway. Issued together as a single verified unit. This is the full collection in one record — once it closes it exists permanently in the archive. 10 sets only. No restock. Ever.',
    includes: [
      'Heavyweight Tee Vol.1 (RB-001)',
      'Heavyweight Tee Vol.2 (RB-003)',
      'Heavyweight Tee Vol.3 (RB-005)',
      'Oversized Hoodie — Best Seller (RB-002)',
      'Matching colourway across all pieces',
      'Shared batch stamp',
      'Collector packaging',
    ],
    images: ['./images/set-001-a.png', './images/set-001-b.png'],
  },
];

export const BATCHES = [
  {
    id: 'RB-001', season: 'CYCLE-01', name: 'Heavyweight Tee',
    units: 70, status: 'ACTIVE', date: '2026.04.23', price: 'R 599',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '380gsm Cotton', fit: 'Oversized / Boxy', type: 'Tee',
    desc: 'Heavyweight 380gsm cotton. Oversized boxy cut, dropped shoulder. Each unit is issued a permanent batch identifier. Washed black and off-white colourways. 70 units. No restock.',
    images: ['./images/rb-001-a.png','./images/rb-001-b.png','./images/rb-001-c.png'],
  },
  {
    id: 'RB-002', season: 'CYCLE-01', name: 'Oversized Hoodie',
    units: 50, status: 'ACTIVE', date: '2026.04.23', price: 'R 799',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '500gsm Fleece', fit: 'Oversized / Drop Shoulder', type: 'Hoodie',
    desc: 'Heavyweight 500gsm fleece. Double-layered structured hood, single kangaroo pocket, ribbed cuffs and hem. Batch identifier woven into back neck label. 50 units. No restock.',
    images: ['./images/rb-002-a.png','./images/rb-004-b.png','./images/rb-002-c.png'],
  },
  {
    id: 'RB-007', season: 'CYCLE-01', name: 'Heavyweight Tee Vol.4',
    units: 60, status: 'ACTIVE', date: '2026.04.23', price: 'R 599',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '380gsm Cotton', fit: 'Oversized / Boxy', type: 'Tee',
    desc: 'Heavyweight 380gsm cotton. Oversized boxy cut, dropped shoulder. New graphic treatment on the fourth colourway. Each unit is issued a permanent batch identifier. 60 units. No restock.',
    images: ['./images/rb-003-a.png','./images/rb-003-b.png'],
  },
  {
    id: 'RB-008', season: 'CYCLE-01', name: 'Oversized Hoodie Vol.4',
    units: 40, status: 'ACTIVE', date: '2026.04.23', price: 'R 799',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '500gsm Fleece', fit: 'Oversized / Drop Shoulder', type: 'Hoodie',
    desc: 'Heavyweight 500gsm fleece. Double-layered structured hood, kangaroo pocket, ribbed cuffs and hem. Fourth colourway. Batch identifier woven into back neck label. 40 units. No restock.',
    images: ['./images/rb-004-a.png','./images/rb-004-b.png'],
  },
  {
    id: 'RB-003', season: 'CYCLE-01', name: 'Heavyweight Tee Vol.2',
    units: 60, status: 'COMING_SOON', date: '2026.TBC', price: 'R 599',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '380gsm Cotton', fit: 'Oversized / Boxy', type: 'Tee',
    desc: 'Second colourway drop. Heavyweight 380gsm cotton. Same oversized boxy cut as RB-001. New graphic treatment. 60 units. No restock.',
    images: ['./images/rb-003-a.png','./images/rb-003-b.png'],
  },
  {
    id: 'RB-004', season: 'CYCLE-01', name: 'Oversized Hoodie Vol.2',
    units: 40, status: 'COMING_SOON', date: '2026.TBC', price: 'R 799',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '500gsm Fleece', fit: 'Oversized / Drop Shoulder', type: 'Hoodie',
    desc: 'Second colourway drop. 500gsm fleece. Same silhouette as RB-002. New CYCLE-01 graphic on back. 40 units. No restock.',
    images: ['./images/rb-004-a.png','./images/rb-004-b.png'],
  },
  {
    id: 'RB-005', season: 'CYCLE-01', name: 'Heavyweight Tee Vol.3',
    units: 50, status: 'COMING_SOON', date: '2026.TBC', price: 'R 599',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '380gsm Cotton', fit: 'Oversized / Boxy', type: 'Tee',
    desc: 'Third graphic. Heavyweight 380gsm cotton. Oversized boxy construction. Limited colourway. 50 units. No restock.',
    images: ['./images/rb-005-a.png','./images/rb-005-b.png'],
  },
  {
    id: 'RB-006', season: 'CYCLE-01', name: 'Pullover Hoodie Vol.3',
    units: 30, status: 'COMING_SOON', date: '2026.TBC', price: 'R 799',
    sizes: ['S','M','L','XL','2XL'], origin: 'South Africa',
    weight: '500gsm Fleece', fit: 'Oversized / Drop Shoulder', type: 'Hoodie',
    desc: 'Third colourway. 500gsm fleece. Double-layered hood, kangaroo pocket. Batch label at neck. 30 units. No restock.',
    images: ['./images/rb-006-a.png','./images/rb-006-b.png'],
  },
];

export const ACTIVE_BATCHES = BATCHES.filter(b => b.status === 'ACTIVE');
export const ACTIVE_UNITS   = ACTIVE_BATCHES.reduce((s, b) => s + b.units, 0);
export const NEXT = { id: 'RB-003', season: 'CYCLE-02', date: '2026.TBC', desc: 'Batch not yet released. Register to receive notification when the record opens.' };
