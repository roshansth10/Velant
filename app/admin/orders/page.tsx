'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Search, Filter, CheckCircle2, Truck, Clock, Eye } from 'lucide-react';
import { useShop } from '@/lib/store';
import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, showToast } = useShop();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (filter !== 'all' && o.orderStatus.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminNav />

        <div className="border-b border-neutral-800 pb-6 mb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
              FULFILLMENT OPS
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
              Customer Orders ({orders.length})
            </h1>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {['all', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded uppercase whitespace-nowrap ${
                  filter === st
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white bg-neutral-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, customer name, tel..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 pl-9 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900/60 text-neutral-400 uppercase border-b border-neutral-800">
                <tr>
                  <th className="p-4">Order Ref</th>
                  <th className="p-4">Customer & Contact</th>
                  <th className="p-4">Delivery Address</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Fulfillment Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-900/40">
                    <td className="p-4">
                      <span className="font-bold text-white block">#{order.id}</span>
                      <span className="text-[11px] text-neutral-500">{order.createdAt || order.date}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-white font-medium block">{order.customerName}</span>
                      <span className="text-[11px] text-neutral-400">{order.customerPhone}</span>
                    </td>
                    <td className="p-4 text-neutral-400 max-w-xs truncate">
                      {order.shippingAddress.street}, {order.shippingAddress.city}
                    </td>
                    <td className="p-4">
                      <span className="text-white font-semibold">
                        {order.items.reduce((a, b) => a + b.quantity, 0)} pcs
                      </span>
                      <span className="text-[11px] text-neutral-500 block">
                        Rs. {order.total.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 uppercase">
                      <span className="text-white font-medium">{order.paymentMethod}</span>
                      <span className="text-[10px] block text-emerald-400">{order.paymentStatus}</span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/account/orders/${order.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-neutral-400 hover:text-white p-1"
                        title="View receipt"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
