'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function CategorySection() {
  const categories = [
    {
      id: 'hoodies',
      name: 'Hoodies',
      href: '/collections/hoodies',
      image: '/images/nepal_model_hoodie.jpg',
      count: '14 Styles',
    },
    {
      id: 't-shirts',
      name: 'T-Shirts',
      href: '/collections/tshirts',
      image: '/images/nepal_model_graphic_tee.jpg',
      count: '22 Styles',
    },
    {
      id: 'bottoms',
      name: 'Bottoms',
      href: '/collections/bottoms',
      image: '/images/nepal_model_female_jacket.jpg',
      count: '12 Styles',
    },
    {
      id: 'accessories',
      name: 'Accessories',
      href: '/collections/accessories',
      image: '/images/nepal_model_cap.jpg',
      count: '16 Styles',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0d0d0d] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header matching reference */}
        <div className="mb-12 sm:mb-16 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
            SHOP BY CATEGORY • काठमाडौँ
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Find Your Essentials
          </h2>
        </div>

        {/* 4 Cards Grid matching reference */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative flex flex-col">
              <Link
                href={cat.href}
                className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 rounded-sm"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
              </Link>

              {/* Text Info matching reference */}
              <div className="mt-3 flex flex-col gap-0.5">
                <Link
                  href={cat.href}
                  className="text-base font-medium text-white hover:text-neutral-300 transition-colors tracking-tight"
                >
                  {cat.name}
                </Link>
                <Link
                  href={cat.href}
                  className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 group-hover:gap-2 transition-all mt-0.5"
                >
                  <span>Shop</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
