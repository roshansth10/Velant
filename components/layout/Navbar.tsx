'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { useShop } from '@/lib/store';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, setIsSearchOpen, user } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkHeroPage = pathname === '/' || pathname.startsWith('/journal');

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-xl text-white'
            : isDarkHeroPage
            ? 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 text-white'
            : 'bg-white/95 backdrop-blur-md border-b border-neutral-200 py-4 text-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - exactly matching reference "V E L A N T" */}
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold tracking-[0.35em] uppercase hover:opacity-80 transition-opacity font-sans"
          >
            VELANT
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs tracking-[0.2em] uppercase font-mono">
            <Link
              href="/"
              className={`transition-colors hover:opacity-100 ${
                pathname === '/' ? 'opacity-100 font-semibold' : 'opacity-70 hover:opacity-100'
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`transition-colors hover:opacity-100 ${
                pathname.startsWith('/shop') ? 'opacity-100 font-semibold' : 'opacity-70 hover:opacity-100'
              }`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:opacity-100 ${
                pathname === '/about' ? 'opacity-100 font-semibold' : 'opacity-70 hover:opacity-100'
              }`}
            >
              About
            </Link>
            <Link
              href="/journal"
              className={`transition-colors hover:opacity-100 ${
                pathname.startsWith('/journal') ? 'opacity-100 font-semibold' : 'opacity-70 hover:opacity-100'
              }`}
            >
              Journal
            </Link>
          </nav>

          {/* Right Action Icons: Search, Account, Bag, Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog"
              className="p-2 sm:p-1.5 hover:opacity-75 transition-opacity flex items-center justify-center min-w-[38px] min-h-[38px]"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Account Icon */}
            <Link
              href={user ? '/account' : '/login'}
              aria-label="Account profile"
              className="p-2 sm:p-1.5 hover:opacity-75 transition-opacity relative flex items-center justify-center min-w-[38px] min-h-[38px]"
            >
              <User className="w-[18px] h-[18px]" />
              {user && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-black" />
              )}
            </Link>

            {/* Shopping Bag Icon with item badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping bag"
              className="p-2 sm:p-1.5 hover:opacity-75 transition-opacity relative flex items-center justify-center min-w-[38px] min-h-[38px]"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute 0.5 -right-0.5 min-w-[16px] h-[16px] px-1 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center leading-none shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:opacity-75 transition-opacity flex items-center justify-center min-w-[38px] min-h-[38px]"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
