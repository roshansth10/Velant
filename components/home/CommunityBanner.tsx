'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function CommunityBanner() {
  const communityImage = '/images/nepal_model_female_street.jpg';

  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] flex items-center bg-black text-white overflow-hidden">
      {/* Background Image matching reference (Crew in urban streetwear setting) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={communityImage}
          alt="Velant Nepalese Streetwear Community"
          fill
          sizes="100vw"
          className="object-cover object-[center_40%] filter brightness-[0.78] contrast-[1.05]"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/85" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-16 flex justify-end">
        <div className="max-w-lg bg-black/70 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-sm space-y-5">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium block">
            KATHMANDU STREET CULTURE • काठमाडौँ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Not Just a Brand, <br />
            It&apos;s a Himalayan Movement.
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            Join thousands of creators across Nepal redefining South Asian urban self-expression, music, and streetwear craftsmanship.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 shadow-xl"
            >
              <span>Join Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
