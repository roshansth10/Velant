export interface VoiceTestimonial {
  id: string;
  quote: string;
  author: string;
  city: string;
  itemPurchased: string;
}

export const VOICES: VoiceTestimonial[] = [
  {
    id: '1',
    quote: "Velant's quality is insane. The fit, the fabric, everything feels premium. Finally a brand that gets it.",
    author: 'Aayush R.',
    city: 'Kathmandu',
    itemPurchased: 'Classic Hoodie (Onyx Black)',
  },
  {
    id: '2',
    quote: "The 280 GSM cotton on the Oversized Tee is legitimately better than most imported brands costing triple. Doesn't bacon at the collar after washing.",
    author: 'Sweta S.',
    city: 'Lalitpur',
    itemPurchased: 'Oversized Tee (Pitch Black)',
  },
  {
    id: '3',
    quote: "Cargo pants fit is godly. The ankle bungee adjustability means I can switch between stacked look on Dunks or cropped above loafers.",
    author: 'Rohan T.',
    city: 'Pokhara',
    itemPurchased: 'Cargo Pants (Matte Black)',
  },
  {
    id: '4',
    quote: "Customer service and delivery speed inside Kathmandu valley was within 24 hours. The packaging and custom dust bag felt like unboxing luxury.",
    author: 'Prashant K.',
    city: 'Bhaktapur',
    itemPurchased: 'Acid Wash Heavyweight Zip Hoodie',
  },
];

export const LOOKBOOK_ASSETS = [
  {
    id: 'hero-hoodie',
    title: 'Velant Hero Hoodie Campaign - Kathmandu Dusk',
    category: 'Hero Editorial',
    url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=2000&q=90',
    dimensions: '2000 x 2667',
    tag: 'Look 01 / Campaign',
  },
  {
    id: 'oversized-tee-editorial',
    title: 'Model in Oversized Tee & Sling - Street Movement',
    category: 'Editorial Lookbook',
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=2000&q=90',
    dimensions: '2000 x 2500',
    tag: 'Look 02 / S/S 25',
  },
  {
    id: 'cargo-utility',
    title: 'Articulated Utility Cargos - Tactical Styling',
    category: 'Product & Details',
    url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=2000&q=90',
    dimensions: '2000 x 2500',
    tag: 'Look 03 / Bottoms',
  },
  {
    id: 'community-crew',
    title: 'Velant Community Crew - Urban Kathmandu',
    category: 'Community Campaign',
    url: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=2000&q=90',
    dimensions: '2000 x 1333',
    tag: 'Look 04 / Community',
  },
  {
    id: 'next-chapter-film',
    title: 'The Next Chapter - Mountain Ridge Silhouette',
    category: 'Editorial Campaign',
    url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=90',
    dimensions: '2000 x 2667',
    tag: 'Look 05 / Mountain',
  },
  {
    id: 'baseball-cap-detail',
    title: '3D Tonal Embroidery Baseball Cap Studio',
    category: 'Accessories',
    url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=2000&q=90',
    dimensions: '2000 x 2000',
    tag: 'Look 06 / Headwear',
  },
];
