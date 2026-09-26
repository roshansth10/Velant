'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Check, X } from 'lucide-react';
import { useShop } from '@/lib/store';
import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCouponStatus, deleteCoupon, showToast } = useShop();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minSpend, setMinSpend] = useState<number>(2000);

  const handleToggle = (id: string) => {
    toggleCouponStatus(id);
    showToast('Coupon status updated.');
  };

  const handleDelete = (id: string) => {
    deleteCoupon(id);
    showToast('Coupon deleted.');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    const newCoupon = {
      id: `c-${Date.now()}`,
      code: code.toUpperCase(),
      discountType,
      value: Number(discountValue),
      minOrder: Number(minSpend),
      isActive: true,
      expiryDate: '2025-12-31',
      usageCount: 0,
    };
    addCoupon(newCoupon);
    setIsModalOpen(false);
    setCode('');
    showToast(`Coupon ${newCoupon.code} created!`);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminNav />

        <div className="border-b border-neutral-800 pb-6 mb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
              MARKETING & PROMOTIONS
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
              Discount Coupons ({coupons.length})
            </h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase font-bold rounded"
          >
            <Plus className="w-4 h-4" />
            <span>Create Promo Code</span>
          </button>
        </div>

        {/* Coupons Table */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900/60 text-neutral-400 uppercase border-b border-neutral-800">
                <tr>
                  <th className="p-4">Promo Code</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Min. Spend</th>
                  <th className="p-4">Total Redemptions</th>
                  <th className="p-4">Active Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-neutral-900/40">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{c.code}</span>
                    </td>
                    <td className="p-4 text-emerald-400 font-bold">
                      {c.discountType === 'percentage' ? `${c.value}% OFF` : `Rs. ${c.value} OFF`}
                    </td>
                    <td className="p-4 text-neutral-400">Rs. {c.minOrder.toLocaleString()}</td>
                    <td className="p-4 text-neutral-400">{c.usageCount} times</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggle(c.id)}
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          c.isActive
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-neutral-950 border border-neutral-800 rounded-xl max-w-md w-full p-6 space-y-4 text-xs font-mono text-white"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white">Create Promo Code</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. MONSOON20"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">Type</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (Rs.)</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">
                  Value ({discountType === 'percentage' ? '%' : 'Rs.'})
                </label>
                <input
                  type="number"
                  required
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Minimum Order Spend (Rs.)</label>
              <input
                type="number"
                value={minSpend}
                onChange={(e) => setMinSpend(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
              />
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-white text-black font-bold uppercase rounded hover:bg-neutral-200"
              >
                Create Code
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
