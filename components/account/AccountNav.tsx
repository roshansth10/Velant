'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Heart, User, MapPin, LogOut } from 'lucide-react';
import { useShop } from '@/lib/store';

export function AccountNav() {
  const pathname = usePathname();
  const { logout, user } = useShop();

  const links = [
    { href: '/account', label: 'Dashboard', icon: User, exact: true },
    { href: '/account/orders', label: 'Order History', icon: Package },
    { href: '/account/wishlist', label: 'Saved Wishlist', icon: Heart },
    { href: '/account/profile', label: 'Profile & Settings', icon: MapPin },
  ];

  return (
    <div className="flex flex-col space-y-1 bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-xs font-mono">
      <div className="pb-3 mb-2 border-b border-neutral-800">
        <p className="text-white font-bold truncate">{user?.name || 'Valued Member'}</p>
        <p className="text-neutral-500 text-[11px] truncate">{user?.email}</p>
      </div>

      {links.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact
          ? pathname === item.href
          : pathname?.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${
              isActive
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2.5 rounded text-red-400 hover:text-red-300 hover:bg-neutral-900 transition-colors pt-3 border-t border-neutral-800 mt-2 text-left"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
