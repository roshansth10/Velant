'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useShop } from '@/lib/store';
import { ProductCard } from '@/components/products/ProductCard';

export function BestSellersSection() {
  const { products } = useShop();

  // Pick the 4 exact reference items: Classic Hoodie, Oversized Tee, Cargo Pants, Baseball Cap
  const bestSellers = [
    products.find((p) => p.slug === 'classic-hoodie') || products[0],
    products.find((p) => p.slug === 'oversized-tee') || products[1],
    products.find((p) => p.slug === 'cargo-pants') || products[2],
    products.find((p) => p.slug === 'baseball-cap') || products[3],
  ].filter(Boolean);

  return (
    <section className="py-24 sm:py-32 bg-[#eeece7] text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header matching reference */}
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-600 font-medium">
              FEATURED COLLECTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
              Best Sellers
            </h2>
          </div>

          <Link
            href="/shop"
            className="group text-xs sm:text-sm font-mono tracking-wider text-neutral-800 hover:text-black flex items-center gap-1.5 transition-colors pb-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid matching reference */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
