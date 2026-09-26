'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ArrowRight, Search, ExternalLink } from 'lucide-react';
import { useShop } from '@/lib/store';
import { AccountNav } from '@/components/account/AccountNav';

export default function AccountOrdersPage() {
  const { orders } = useShop();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'all' && o.orderStatus.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesId = o.id.toLowerCase().includes(q);
      const matchesItem = o.items.some((i) => i.name.toLowerCase().includes(q));
      if (!matchesId && !matchesItem) return false;
    }
    return true;
  });

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-neutral-800 pb-6 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
            CUSTOMER PORTAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Order History
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Review delivery status, tracking numbers, and view digital invoices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <AccountNav />
          </div>

          <div className="lg:col-span-9 space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-xs font-mono">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {['all', 'confirmed', 'processing', 'shipped', 'delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1.5 rounded uppercase ${
                      filterStatus === st
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white bg-neutral-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search order ID or item"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 pl-8 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                <Package className="w-10 h-10 text-neutral-600 mx-auto" />
                <p className="text-sm font-light text-neutral-400">No orders match the selected filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4 hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-neutral-900 pb-4 text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-sm">#{order.id}</span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="text-neutral-400 text-right sm:text-left">
                        Placed on {order.createdAt || order.date}
                      </div>
                    </div>

                    {/* Order items preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="relative w-12 h-14 bg-neutral-900 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="50px"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="text-xs font-mono">
                            <h4 className="text-white font-medium truncate max-w-[180px]">{item.name}</h4>
                            <p className="text-neutral-500 text-[11px]">
                              {item.size} • {item.color} • Qty {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-neutral-900 text-xs font-mono">
                      <div>
                        <span className="text-neutral-400">Total: </span>
                        <span className="text-white font-bold">Rs. {order.total.toLocaleString()}</span>
                        <span className="text-neutral-500 ml-2">({order.paymentMethod.toUpperCase()})</span>
                      </div>

                      <Link
                        href={`/account/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded transition-colors text-xs font-mono uppercase"
                      >
                        <span>View Order Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
