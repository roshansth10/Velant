'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/"
            className="text-xs font-mono uppercase text-neutral-400 hover:text-white flex items-center gap-1.5 mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
            TERMS & CONDITIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-1">
            Terms of Service
          </h1>
        </div>

        <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
          <p>
            Welcome to VELANT. By accessing our website, placing an order, or browsing our media dispatches, you agree to comply with and be bound by the following terms of service.
          </p>

          <h3 className="text-white font-bold font-mono uppercase text-xs">Product Availability & Drops</h3>
          <p>
            All products are subject to availability. Our drops are manufactured in limited seasonal production runs. While we strive to display accurate colorways and fabric representations, slight variations in garment wash and screen display may occur.
          </p>

          <h3 className="text-white font-bold font-mono uppercase text-xs">Pricing & Currency</h3>
          <p>
            All prices are listed in Nepalese Rupees (NPR / Rs.) and include all statutory local taxes. Shipping fees are calculated dynamically at checkout based on delivery speed and location.
          </p>
        </div>
      </div>
    </div>
  );
}
