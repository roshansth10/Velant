'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Heart, ArrowRight, ShieldCheck, Clock, Truck } from 'lucide-react';
import { useShop } from '@/lib/store';
import { AccountNav } from '@/components/account/AccountNav';

export default function AccountOverviewPage() {
  const { user, orders, wishlist } = useShop();

  const recentOrders = orders.slice(0, 2);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-neutral-800 pb-6 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
            CUSTOMER PORTAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Welcome Back, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Member ID: VELANT-VIP-{user?.id.toUpperCase()} • Tier: Founder Circle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3">
            <AccountNav />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
                  Total Orders
                </span>
                <p className="text-2xl font-bold font-mono text-white">{orders.length}</p>
                <Link
                  href="/account/orders"
                  className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 pt-1"
                >
                  <span>View History</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
                  Saved Pieces
                </span>
                <p className="text-2xl font-bold font-mono text-white">{wishlist.length}</p>
                <Link
                  href="/account/wishlist"
                  className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 pt-1"
                >
                  <span>View Wishlist</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
                  Default Destination
                </span>
                <p className="text-sm font-semibold text-white truncate">Kathmandu, Nepal</p>
                <Link
                  href="/account/profile"
                  className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 pt-1"
                >
                  <span>Manage Address</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h2 className="text-sm font-mono uppercase tracking-widest text-white">Recent Orders</h2>
                <Link
                  href="/account/orders"
                  className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1"
                >
                  <span>See All ({orders.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {orders.length === 0 ? (
                <p className="text-xs font-mono text-neutral-500 py-6 text-center">
                  No orders placed yet.
                </p>
              ) : (
                <div className="divide-y divide-neutral-900">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-white">#{order.id}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase">
                            {order.orderStatus}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-neutral-400">
                          {order.createdAt || order.date} • {order.items.length} items • Rs. {order.total.toLocaleString()}
                        </p>
                      </div>

                      <Link
                        href={`/account/orders/${order.id}`}
                        className="px-4 py-2 rounded bg-neutral-900 border border-neutral-800 hover:border-white text-xs font-mono uppercase text-white transition-colors"
                      >
                        Order Details
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
