'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useShop } from '@/lib/store';
import { AccountNav } from '@/components/account/AccountNav';
import { ProductCard } from '@/components/products/ProductCard';

export default function AccountWishlistPage() {
  const { wishlist, products } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-neutral-800 pb-6 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
            CUSTOMER PORTAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Saved Wishlist
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Keep track of silhouettes you want to cop in future drops.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <AccountNav />
          </div>

          <div className="lg:col-span-9">
            {savedProducts.length === 0 ? (
              <div className="p-12 text-center bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
                <Heart className="w-10 h-10 text-neutral-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base text-white">Your wishlist is empty</h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Explore our hoodies, heavyweight tees, and cargos and hit the heart icon.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-2.5 bg-white text-black text-xs font-mono uppercase font-bold tracking-wider rounded"
                >
                  Explore Essentials
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {savedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
