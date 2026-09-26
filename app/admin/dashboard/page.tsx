'use client';

import React from 'react';
import Link from 'next/link';
import { DollarSign, Package, ShoppingBag, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { useShop } from '@/lib/store';
import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminDashboardPage() {
  const { orders, products, updateOrderStatus } = useShop();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const lowStockProducts = products.filter((p) => p.stock < 10);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminNav />

        <div className="border-b border-neutral-800 pb-6 mb-8 flex justify-between items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
              OPERATIONS CONSOLE
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
              Store Intelligence & Analytics
            </h1>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            Kathmandu Hub • Live Mock Sync
          </span>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Total Revenue
            </span>
            <p className="text-2xl font-bold font-mono text-white">
              Rs. {totalRevenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this drop cycle</span>
            </div>
          </div>

          <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Orders Processed
            </span>
            <p className="text-2xl font-bold font-mono text-white">{orders.length}</p>
            <div className="text-[11px] font-mono text-neutral-400">
              {orders.filter((o) => o.orderStatus === 'Confirmed').length} waiting fulfillment
            </div>
          </div>

          <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Average Basket Value
            </span>
            <p className="text-2xl font-bold font-mono text-white">
              Rs. {averageOrderValue.toLocaleString()}
            </p>
            <div className="text-[11px] font-mono text-neutral-400">Target: Rs. 3,500</div>
          </div>

          <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Catalog Items
            </span>
            <p className="text-2xl font-bold font-mono text-white">{products.length}</p>
            <div className="text-[11px] font-mono text-neutral-400">Across 4 core categories</div>
          </div>
        </div>

        {/* Live Orders Table */}
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h2 className="text-sm font-mono uppercase tracking-widest text-white">
              Recent Customer Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-neutral-500 uppercase border-b border-neutral-800 pb-2">
                <tr>
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">City</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Quick Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-900/40">
                    <td className="py-3.5 font-bold text-white">#{order.id}</td>
                    <td className="py-3.5 text-white">{order.customerName}</td>
                    <td className="py-3.5 text-neutral-400">{order.shippingAddress.city}</td>
                    <td className="py-3.5 text-neutral-400">{order.items.length} pcs</td>
                    <td className="py-3.5 font-bold text-white">Rs. {order.total.toLocaleString()}</td>
                    <td className="py-3.5 uppercase text-neutral-400">{order.paymentMethod}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : order.orderStatus === 'Shipped'
                            ? 'bg-blue-950 text-blue-400 border border-blue-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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
