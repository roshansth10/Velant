'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { useShop } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isLiked = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, product.colors[0]?.name || 'Standard', 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      className="group relative flex flex-col w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with subtle light grey background matching the reference */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-sm bg-[#e8e7e3] transition-colors duration-300">
        <Link href={`/shop/product/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              product.images[1] && isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Secondary Image on Hover if available */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
              className={`object-cover object-center transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              referrerPolicy="no-referrer"
            />
          )}
        </Link>

        {/* Badge - matching reference style ("New" / "Bestseller") */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block bg-white/95 text-black text-[11px] font-sans font-medium px-2.5 py-0.8 tracking-tight shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Top Right Action: Wishlist */}
        <div className="absolute top-3 right-3 z-10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-neutral-800 hover:text-red-500 hover:bg-white flex items-center justify-center transition-all shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Quick Add Bar on Hover */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2 z-10">
          {product.sizes.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-0.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                    selectedSize === size
                      ? 'bg-white text-black font-bold'
                      : 'bg-black/60 text-white hover:bg-black/80'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleQuickAdd}
            className="w-full py-2 px-3 bg-white text-black hover:bg-neutral-200 text-xs font-medium tracking-wide uppercase flex items-center justify-center gap-1.5 transition-colors shadow-lg"
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info: Title & Price matching reference layout */}
      <div className="mt-3 flex flex-col gap-0.5">
        <Link
          href={`/shop/product/${product.slug}`}
          className="text-sm font-normal text-neutral-900 hover:text-neutral-600 transition-colors tracking-tight line-clamp-1"
        >
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="text-xs sm:text-sm font-medium text-neutral-900">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-neutral-400 line-through">
              Rs. {product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
