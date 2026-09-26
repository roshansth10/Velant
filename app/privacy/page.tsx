'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
            LEGAL & SECURITY
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-1">
            Privacy Policy
          </h1>
        </div>

        <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
          <p>
            At VELANT (Velant Apparel Nepal Pvt. Ltd.), we respect the privacy of our community and customers. This Privacy Policy explains how we collect, store, and utilize your personal data when you interact with our e-commerce platform.
          </p>

          <h3 className="text-white font-bold font-mono uppercase text-xs">Information We Collect</h3>
          <p>
            We collect contact data (name, email address, telephone number) and delivery addresses solely for fulfillment of your garment orders and SMS delivery dispatches across Nepal.
          </p>

          <h3 className="text-white font-bold font-mono uppercase text-xs">Payment Information</h3>
          <p>
            We never store sensitive banking credentials, eSewa PINs, or Khalti passwords. All digital wallet sessions and QR handoffs are handled through secure mock tokenizations and direct merchant gateways.
          </p>
        </div>
      </div>
    </div>
  );
}
