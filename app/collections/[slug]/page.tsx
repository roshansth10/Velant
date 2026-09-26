'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import { useShop } from '@/lib/store';
import { ProductCard } from '@/components/products/ProductCard';

interface CollectionMeta {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  filterFn: (p: any) => boolean;
}

const COLLECTIONS_MAP: Record<string, CollectionMeta> = {
  'new-arrivals': {
    title: 'New Arrivals',
    subtitle: 'DROP 01 / S/S 2025',
    description: 'The latest drops crafted from custom 480 GSM French Terry and preshrunk combed cotton.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=2000&q=90',
    filterFn: (p) => p.newArrival || p.badge === 'New',
  },
  hoodies: {
    title: 'Hoodies & Sweats',
    subtitle: '480 GSM HEAVYWEIGHT FLEECE',
    description: 'Double-layered ergonomic hoods without drawstrings, dropped shoulders, and structural drape.',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=90',
    filterFn: (p) => p.category === 'hoodies',
  },
  tshirts: {
    title: 'T-Shirts & Tees',
    subtitle: '280 GSM COMBED JERSEY',
    description: 'Boxy streetwear silhouettes with snug 1.25-inch ribbed collars that retain shape forever.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=2000&q=90',
    filterFn: (p) => p.category === 't-shirts',
  },
  bottoms: {
    title: 'Bottoms & Cargos',
    subtitle: 'ARTICULATED TECHNICAL TAILORING',
    description: 'Ripstop cargo pants with adjustable bungee ankle cuffs, magnetic enclosures, and tactical versatility.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=2000&q=90',
    filterFn: (p) => p.category === 'bottoms',
  },
  accessories: {
    title: 'Accessories & Headwear',
    subtitle: 'TACTICAL ACCENTS',
    description: 'Low-profile 3D embroidered baseball dad caps, Cordura ballistic slings, and lifestyle accents.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=2000&q=90',
    filterFn: (p) => p.category === 'accessories',
  },
  men: {
    title: "Men's Collection",
    subtitle: 'URBAN ESSENTIALS',
    description: 'Engineered for daily urban movement in Kathmandu, Pokhara, and beyond.',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=2000&q=90',
    filterFn: (p) => p.gender === 'men' || p.gender === 'unisex',
  },
  women: {
    title: "Women's Collection",
    subtitle: 'RELAXED PROPORTIONS',
    description: 'Fluid streetwear silhouettes and relaxed essential cuts tailored for bold modern stylings.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=2000&q=90',
    filterFn: (p) => p.gender === 'women' || p.gender === 'unisex',
  },
  unisex: {
    title: 'Unisex Essentials',
    subtitle: 'BORDERLESS SILHOUETTES',
    description: 'Designed for everybody who moves different. Better Fits Bigger Dreams.',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=2000&q=90',
    filterFn: (p) => p.gender === 'unisex',
  },
};

export default function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { products, downloadImage } = useShop();

  const collection = COLLECTIONS_MAP[slug] || {
    title: slug.replace('-', ' ').toUpperCase(),
    subtitle: 'VELANT COLLECTION',
    description: 'Discover the latest releases and curated streetwear drops.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=2000&q=90',
    filterFn: () => true,
  };

  const matchingProducts = products.filter(collection.filterFn);

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      {/* Editorial Collection Hero Banner */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] filter brightness-[0.55] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Essentials</span>
          </Link>

          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-300 font-medium">
              {collection.subtitle}
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              {collection.title}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              {collection.description}
            </p>

            <div className="pt-3">
              <button
                onClick={() => downloadImage(collection.image, `velant-collection-${slug}.jpg`)}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-300 hover:text-white border border-white/20 hover:border-white px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Banner Image</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between pb-6 border-b border-neutral-900 mb-8 text-xs font-mono text-neutral-400">
          <span>{matchingProducts.length} Pieces in this collection</span>
          <span className="uppercase text-neutral-500">Free Nepal Shipping Over Rs. 3,000</span>
        </div>

        {matchingProducts.length === 0 ? (
          <div className="text-center py-24 space-y-4 bg-neutral-900/30 rounded-lg border border-neutral-800">
            <p className="text-base text-neutral-400">No pieces currently listed in this drop.</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-white text-black text-xs font-mono uppercase font-bold"
            >
              Browse Full Catalogue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {matchingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
