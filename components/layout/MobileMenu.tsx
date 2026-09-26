'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Search, User, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useShop } from '@/lib/store';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { cartCount, setIsCartOpen, setIsSearchOpen, user } = useShop();
  const [isShopExpanded, setIsShopExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col justify-between p-6 animate-in fade-in duration-200">
      {/* Top Header matching reference */}
      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-5">
        <Link
          href="/"
          onClick={onClose}
          className="text-lg font-bold tracking-[0.35em] uppercase font-sans text-white"
        >
          VELANT
        </Link>
        <button
          onClick={onClose}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Navigation Links matching reference */}
      <div className="flex-1 py-10 flex flex-col justify-center space-y-6">
        <div>
          <Link
            href="/"
            onClick={onClose}
            className="text-2xl font-light tracking-wide hover:text-neutral-400 transition-colors block py-2"
          >
            Home
          </Link>
        </div>

        {/* Shop with + expandable sub-links */}
        <div className="border-b border-neutral-900 pb-3">
          <div className="flex items-center justify-between">
            <Link
              href="/shop"
              onClick={onClose}
              className="text-2xl font-light tracking-wide hover:text-neutral-400 transition-colors py-2"
            >
              Shop
            </Link>
            <button
              onClick={() => setIsShopExpanded(!isShopExpanded)}
              className="p-2 text-neutral-400 hover:text-white"
              aria-label="Toggle shop categories"
            >
              {isShopExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>

          {isShopExpanded && (
            <div className="pl-4 pt-2 pb-2 space-y-3 text-sm text-neutral-400 font-mono tracking-wider uppercase animate-in slide-in-from-top-1 duration-150">
              <Link href="/shop" onClick={onClose} className="block hover:text-white">
                → All Essentials
              </Link>
              <Link href="/collections/hoodies" onClick={onClose} className="block hover:text-white">
                → Hoodies
              </Link>
              <Link href="/collections/tshirts" onClick={onClose} className="block hover:text-white">
                → T-Shirts
              </Link>
              <Link href="/collections/bottoms" onClick={onClose} className="block hover:text-white">
                → Bottoms & Cargos
              </Link>
              <Link href="/collections/accessories" onClick={onClose} className="block hover:text-white">
                → Accessories
              </Link>
              <Link href="/collections/new-arrivals" onClick={onClose} className="block hover:text-white">
                → New Arrivals (Drop 01)
              </Link>
            </div>
          )}
        </div>

        <div>
          <Link
            href="/about"
            onClick={onClose}
            className="text-2xl font-light tracking-wide hover:text-neutral-400 transition-colors block py-2"
          >
            About
          </Link>
        </div>

        <div>
          <Link
            href="/journal"
            onClick={onClose}
            className="text-2xl font-light tracking-wide hover:text-neutral-400 transition-colors block py-2"
          >
            Journal
          </Link>
        </div>
      </div>

      {/* Bottom Icons matching reference screenshot */}
      <div className="border-t border-neutral-800/80 pt-6 flex items-center justify-around text-neutral-300">
        <button
          onClick={() => {
            onClose();
            setIsSearchOpen(true);
          }}
          className="p-3 hover:text-white"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        <Link
          href={user ? '/account' : '/login'}
          onClick={onClose}
          className="p-3 hover:text-white relative"
          aria-label="Account"
        >
          <User className="w-5 h-5" />
          {user && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />
          )}
        </Link>

        <button
          onClick={() => {
            onClose();
            setIsCartOpen(true);
          }}
          className="p-3 hover:text-white relative"
          aria-label="Shopping Bag"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
