'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, X, ArrowUpDown, Download } from 'lucide-react';
import { useShop } from '@/lib/store';
import { ProductCard } from '@/components/products/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || '';

  const { products, setIsAssetModalOpen } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Essentials' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 't-shirts', label: 'T-Shirts' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36', 'ONE SIZE'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Gender filter
      if (selectedGender !== 'all' && p.gender !== selectedGender && p.gender !== 'unisex') {
        return false;
      }
      // Size filter
      if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) {
        return false;
      }
      // Price filter
      if (p.price > priceMax) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesTag = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCategory && !matchesTag) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedGender, selectedSize, priceMax, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('all');
    setSelectedSize('all');
    setPriceMax(5000);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="border-b border-neutral-800 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
              CATALOGUE / 2025 ESSENTIALS
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              The Collection
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base font-light max-w-lg">
              Engineered drop-shoulder silhouettes, 480 GSM fleeces, combed cotton tees, and tactical utility wear.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAssetModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700 hover:border-white text-xs font-mono tracking-wider text-neutral-300 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Product Assets</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Bar */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-neutral-900">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1.5 text-xs font-mono text-neutral-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured" className="bg-neutral-900">Featured</option>
                <option value="newest" className="bg-neutral-900">New Arrivals</option>
                <option value="price-asc" className="bg-neutral-900">Price: Low to High</option>
                <option value="price-desc" className="bg-neutral-900">Price: High to Low</option>
                <option value="rating" className="bg-neutral-900">Highest Rated</option>
              </select>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-white"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Shop Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-6 border-r border-neutral-900">
            {/* Active search indicator */}
            {searchQuery && (
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-300 truncate">Search: &quot;{searchQuery}&quot;</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-neutral-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Price Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400">
                <span>Max Price</span>
                <span className="text-white font-semibold">Rs. {priceMax.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="900"
                max="5000"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-white bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-600">
                <span>Rs. 999</span>
                <span>Rs. 5,000</span>
              </div>
            </div>

            {/* Gender / Fit Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Fit Silhouette</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'unisex', label: 'Unisex' },
                  { id: 'men', label: 'Men' },
                  { id: 'women', label: 'Women' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGender(g.id)}
                    className={`px-3 py-1 rounded border text-xs font-mono transition-colors ${
                      selectedGender === g.id
                        ? 'bg-white text-black border-white'
                        : 'border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Size</h3>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-2.5 py-1 rounded text-xs font-mono border transition-colors ${
                    selectedSize === 'all'
                      ? 'bg-white text-black border-white'
                      : 'border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-2.5 py-1 rounded text-xs font-mono border transition-colors ${
                      selectedSize === s
                        ? 'bg-white text-black border-white'
                        : 'border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={resetFilters}
              className="w-full py-2.5 text-xs uppercase font-mono tracking-widest text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded transition-colors"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 text-xs font-mono text-neutral-400">
              <span>Showing {filteredProducts.length} essentials</span>
              {selectedCategory !== 'all' && (
                <span className="uppercase text-neutral-500">Category: {selectedCategory}</span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 space-y-4 bg-neutral-900/40 rounded-lg border border-neutral-800/80">
                <p className="text-lg font-light text-neutral-300">No items match your active filters.</p>
                <p className="text-xs text-neutral-500 font-mono">
                  Try adjusting the maximum price or selecting another category.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-xs bg-neutral-950 p-6 flex flex-col justify-between h-full overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <h3 className="text-sm font-mono uppercase tracking-widest text-white">Filter Pieces</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-neutral-400">
                  <span>Max Price</span>
                  <span className="text-white">Rs. {priceMax.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="900"
                  max="5000"
                  step="100"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              {/* Mobile Sizes */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase">Size</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedSize('all')}
                    className={`px-3 py-1 text-xs font-mono rounded border ${
                      selectedSize === 'all' ? 'bg-white text-black' : 'border-neutral-800 text-neutral-400'
                    }`}
                  >
                    All
                  </button>
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 text-xs font-mono rounded border ${
                        selectedSize === s ? 'bg-white text-black' : 'border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-white text-black text-xs font-mono uppercase tracking-widest font-bold rounded"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2 text-neutral-400 text-xs font-mono uppercase"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-white font-mono">Loading VELANT Catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
