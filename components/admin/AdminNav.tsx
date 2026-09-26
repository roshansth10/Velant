'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Package, Tag, ArrowLeft, ExternalLink } from 'lucide-react';

export function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: Package },
    { href: '/admin/products', label: 'Inventory', icon: ShoppingBag },
    { href: '/admin/coupons', label: 'Coupons', icon: Tag },
  ];

  return (
    <div className="flex items-center justify-between bg-neutral-950 border border-neutral-800 p-3 rounded-xl mb-8 text-xs font-mono">
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="font-bold text-white px-2 py-1 bg-neutral-900 border border-neutral-700 rounded mr-2">
          VELANT HQ
        </span>

        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                isActive
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="text-neutral-400 hover:text-white flex items-center gap-1"
        >
          <span>Live Store</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
