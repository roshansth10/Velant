'use client';

import React from 'react';
import Link from 'next/link';
import { RotateCcw, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ReturnsPage() {
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
            CUSTOMER ASSURANCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-1">
            Exchanges & Returns Policy
          </h1>
        </div>

        <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-bold font-mono text-white uppercase">
              7-Day Doorstep Size Swap
            </h2>
            <p>
              We want you to wear clothes that fit your exact aesthetic preference. If the proportions are too oversized or too snug, you have 7 calendar days from the date of delivery to request an exchange.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-neutral-900">
            <h2 className="text-base font-bold font-mono text-white uppercase">
              Condition Requirements
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400 text-xs font-mono">
              <li>Item must be unworn, unwashed, and in brand-new condition.</li>
              <li>Original cardboard tag and woven label intact.</li>
              <li>Free of perfumes, deodorants, makeup stains, or pet hair.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-4 border-t border-neutral-900">
            <h2 className="text-base font-bold font-mono text-white uppercase">
              How to Initiate a Swap
            </h2>
            <p>
              Simply contact our concierge via WhatsApp at <strong className="text-white font-mono">+977 9841-998877</strong> or message our support portal with your Order ID. In Kathmandu Valley, our courier will bring the new size and collect the old one in a single visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
