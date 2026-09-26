'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Clock, ShieldCheck, MapPin, ArrowLeft } from 'lucide-react';

export default function ShippingPage() {
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
            LOGISTICS & DISPATCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-1">
            Nepal & Global Delivery Policy
          </h1>
        </div>

        <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-bold font-mono text-white uppercase">
              1. Kathmandu Valley Delivery (Same-Day & Next-Day)
            </h2>
            <p>
              We operate dedicated in-house couriers within Kathmandu, Lalitpur, and Bhaktapur. Orders placed before 2:00 PM (NPT) Sunday through Friday qualify for same-day evening delivery. All standard valley orders are delivered within 24 hours.
            </p>
            <p className="text-xs font-mono text-neutral-400">
              • Fee: Rs. 100 flat rate (Free on orders over Rs. 3,000).
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-neutral-900">
            <h2 className="text-base font-bold font-mono text-white uppercase">
              2. Major Cities Across Nepal
            </h2>
            <p>
              Deliveries outside the Kathmandu Valley (including Pokhara, Butwal, Biratnagar, Narayangarh, Dharan, Nepalgunj, and Dhangadhi) are fulfilled through Nepal Express Logistics. Delivery time is typically 2 to 3 business days.
            </p>
            <p className="text-xs font-mono text-neutral-400">
              • Fee: Rs. 150 flat rate (Free on orders over Rs. 3,000).
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-neutral-900">
            <h2 className="text-base font-bold font-mono text-white uppercase">
              3. Packaging & Environmental Standard
            </h2>
            <p>
              Every VELANT drop is packaged in 100% recycled biodegradable paper garment sleeves with reusable heavyweight ziplock moisture barriers.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-neutral-900">
            <h2 className="text-base font-bold font-mono text-white uppercase">
              4. Payment on Delivery
            </h2>
            <p>
              Cash on Delivery (COD) is available nationwide. Our courier riders also carry static eSewa and Fonepay QR codes on arrival for contactless digital payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
