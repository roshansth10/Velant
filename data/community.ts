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
    quote: "Velant's quality is insane. The fit, the fabric, everything feels premium. Finally a Nepali streetwear brand that truly leads the standard.",
    author: 'Aayush R.',
    city: 'Kathmandu',
    itemPurchased: 'Himalayan Heavyweight Oversized Hoodie',
  },
  {
    id: '2',
    quote: "The 280 GSM cotton on the Boxy Tee is legitimately better than most imported brands costing triple. Doesn't lose shape after washing in Kathmandu water.",
    author: 'Sweta S.',
    city: 'Lalitpur',
    itemPurchased: 'Kathmandu Valley Boxy Tee',
  },
  {
    id: '3',
    quote: "Cargo pants fit is godly. The ankle bungee adjustability means I can switch between stacked look on Dunks or cropped above boots in Pokhara.",
    author: 'Rohan T.',
    city: 'Pokhara',
    itemPurchased: 'Lalitpur Articulated Cargo Pants',
  },
  {
    id: '4',
    quote: "Customer service and delivery speed inside Kathmandu valley was within 24 hours. The packaging and custom dust bag felt like unboxing luxury.",
    author: 'Prashant K.',
    city: 'Bhaktapur',
    itemPurchased: 'Annapurna Acid Wash Zip Hoodie',
  },
];

export const LOOKBOOK_ASSETS = [
  {
    id: 'hero-hoodie',
    title: 'Velant Hero Hoodie Campaign - Kathmandu Alleyways',
    category: 'Hero Editorial',
    url: '/images/nepal_model_hoodie.jpg',
    dimensions: '2000 x 2667',
    tag: 'Look 01 / Campaign',
  },
  {
    id: 'oversized-tee-editorial',
    title: 'Nepalese Model in Graphic Mandala Tee - Kathmandu Courtyard',
    category: 'Editorial Lookbook',
    url: '/images/nepal_model_graphic_tee.jpg',
    dimensions: '2000 x 2500',
    tag: 'Look 02 / S/S 25',
  },
  {
    id: 'cargo-utility',
    title: 'Nepalese Female Model in Puffer Street Jacket - Kathmandu Neon',
    category: 'Product & Details',
    url: '/images/nepal_model_female_jacket.jpg',
    dimensions: '2000 x 2500',
    tag: 'Look 03 / Outerwear',
  },
  {
    id: 'community-crew',
    title: 'Nepalese Streetwear Culture - Jhamsikhel Urban Movement',
    category: 'Community Campaign',
    url: '/images/nepal_model_female_street.jpg',
    dimensions: '2000 x 1333',
    tag: 'Look 04 / Community',
  },
  {
    id: 'next-chapter-film',
    title: 'Himalayan Ridge Silhouette - Kathmandu Streetwear',
    category: 'Editorial Campaign',
    url: '/images/nepal_model_street.jpg',
    dimensions: '2000 x 2667',
    tag: 'Look 05 / Mountain',
  },
  {
    id: 'baseball-cap-detail',
    title: 'Nepalese Model with Himalayan Silver Accessories & Beanie',
    category: 'Accessories',
    url: '/images/nepal_model_cap.jpg',
    dimensions: '2000 x 2000',
    tag: 'Look 06 / Headwear',
  },
];
