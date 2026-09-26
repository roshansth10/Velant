'use client';

import React, { useState } from 'react';
import { useShop } from '@/lib/store';
import { AccountNav } from '@/components/account/AccountNav';
import { Check, ShieldCheck } from 'lucide-react';

export default function AccountProfilePage() {
  const { user, showToast } = useShop();

  const [name, setName] = useState(user?.name || 'Aayush Rayamajhi');
  const [email, setEmail] = useState(user?.email || 'aayush.r@velant.com');
  const [phone, setPhone] = useState(user?.phone || '+977 9841998877');
  const [city, setCity] = useState('Kathmandu');
  const [street, setStreet] = useState('Ward 4, Baluwatar');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile and delivery preferences saved.');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-neutral-800 pb-6 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
            CUSTOMER PORTAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Profile & Settings
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Update your contact information and primary shipping address in Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <AccountNav />
          </div>

          <div className="lg:col-span-9 space-y-6">
            <form onSubmit={handleSave} className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6 text-xs font-mono">
              <h2 className="text-xs font-mono uppercase tracking-widest text-white border-b border-neutral-800 pb-3">
                Member Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-400 block mb-1.5">Full Legal Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1.5">Phone (Nepal Mobile)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1.5">Default City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-neutral-400 block mb-1.5">Default Street / Tole</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-widest font-bold rounded flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
