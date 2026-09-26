'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '@/lib/store';

export function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, products, addToCart } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleClose = () => {
    setQuery('');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex flex-col text-white animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-8 pb-4 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">
            Catalog Search
          </span>
        </div>

        <button
          onClick={handleClose}
          className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search Input */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hoodies, oversized tees, cargos, caps..."
            className="w-full bg-transparent text-2xl sm:text-4xl font-light tracking-tight text-white placeholder-neutral-600 focus:outline-none border-b border-neutral-800 focus:border-white pb-4 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-0 top-3 text-neutral-400 hover:text-white text-xs font-mono uppercase"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Suggestions / Filter tags */}
        {!query && (
          <div className="mt-8 space-y-4">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
              Popular Searches & Categories
            </p>
            <div className="flex flex-wrap gap-2">
              {['Classic Hoodie', 'Oversized Tee', 'Cargo Pants', 'Baseball Cap', 'Heavyweight Fleece', 'Kathmandu'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-500 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.trim() && (
          <div className="mt-8 overflow-y-auto max-h-[60vh] pr-2">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Found {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              </span>
              <Link
                href={`/shop?q=${encodeURIComponent(query)}`}
                onClick={handleClose}
                className="text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1"
              >
                <span>View full shop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-neutral-400 text-base">No pieces matched &quot;{query}&quot;</p>
                <p className="text-neutral-600 text-xs font-mono">
                  Try searching for hoodies, tees, cargos, or accessories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-[#111111] border border-neutral-800 rounded-lg p-3 flex gap-3.5 hover:border-neutral-700 transition-colors"
                  >
                    <Link
                      href={`/shop/product/${product.slug}`}
                      onClick={handleClose}
                      className="relative w-20 h-24 bg-neutral-900 rounded overflow-hidden flex-shrink-0"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        referrerPolicy="no-referrer"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                          {product.categoryLabel}
                        </span>
                        <Link
                          href={`/shop/product/${product.slug}`}
                          onClick={handleClose}
                          className="text-sm font-medium text-white hover:underline line-clamp-1 mt-0.5"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs font-semibold text-neutral-200 mt-1">
                          Rs. {product.price.toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Default');
                          handleClose();
                        }}
                        className="self-start text-[11px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 pt-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Quick Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
