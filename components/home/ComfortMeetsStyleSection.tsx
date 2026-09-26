'use client';

import React from 'react';
import Image from 'next/image';
import { Wind, Feather, Recycle } from 'lucide-react';

export function ComfortMeetsStyleSection() {
  const comfortImage =
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85';

  return (
    <section className="relative py-24 sm:py-32 bg-[#121212] text-white overflow-hidden">
      {/* Background Giant Outline Typography matching reference "COMFORT MEETS STYLE" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none opacity-20 hidden lg:block">
        <p
          className="text-center font-extrabold uppercase tracking-tighter text-[110px] xl:text-[140px] leading-[0.85] text-transparent"
          style={{
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.45)',
          }}
        >
          COMFORT <br />
          MEETS <br />
          STYLE
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Model Photo in White Tee + Sling matching reference */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
            <div className="relative aspect-[3/4] w-full max-w-md bg-neutral-900 rounded-sm overflow-hidden shadow-2xl border border-neutral-800 group">
              <Image
                src={comfortImage}
                alt="Model in White Oversized Tee with Sling"
                fill
                sizes="(max-width: 768px) 90vw, 450px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Right: Technical Specs & Quality Pillars matching reference */}
          <div className="lg:col-span-6 space-y-10">
            {/* Mobile / Tablet visible headline */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
                ENGINEERED FOR MOVEMENT
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-[1.05]">
                Comfort Meets Style
              </h2>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block border-b border-neutral-800 pb-3">
                PREMIUM QUALITY
              </span>

              {/* Pillar 1: Breathable Fabrics */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900/90 flex items-center justify-center flex-shrink-0 text-white">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white tracking-tight">Breathable Fabrics</h3>
                  <p className="text-sm text-neutral-400 font-light mt-0.5">Stay fresh, all day.</p>
                </div>
              </div>

              {/* Pillar 2: Durable Stitching */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900/90 flex items-center justify-center flex-shrink-0 text-white">
                  <Feather className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white tracking-tight">Durable Stitching</h3>
                  <p className="text-sm text-neutral-400 font-light mt-0.5">Made to last.</p>
                </div>
              </div>

              {/* Pillar 3: Sustainable Production */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900/90 flex items-center justify-center flex-shrink-0 text-white">
                  <Recycle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white tracking-tight">Sustainable Production</h3>
                  <p className="text-sm text-neutral-400 font-light mt-0.5">Better for tomorrow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
