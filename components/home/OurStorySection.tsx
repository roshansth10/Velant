'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function OurStorySection() {
  const mainStoryImage = '/images/nepal_model_tee.jpg';
  const overlayStoryImage = '/images/nepal_model_hero.jpg';

  return (
    <section id="our-story" className="py-24 sm:py-32 bg-[#eeece7] text-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Story Copy matching reference */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-600 font-medium">
                OUR STORY
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.05]">
              More Than <br />
              Just Clothes.
            </h2>

            <p className="text-neutral-700 text-base sm:text-lg font-light leading-relaxed max-w-md">
              VELANT is a lifestyle brand built for dreamers, creators and go-getters. We blend comfort,
              quality and timeless design to give you pieces that move with your ambition.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-neutral-900 text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 hover:scale-105 shadow-md"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Editorial Collage matching reference */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Main Vertical Photo (Model in black hoodie back view) */}
              <div className="relative aspect-[3/4] w-[82%] bg-neutral-300 rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src={mainStoryImage}
                  alt="Velant Streetwear Silhouette"
                  fill
                  sizes="(max-width: 768px) 90vw, 500px"
                  className="object-cover object-center filter contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping Bottom-Right Photo (Model in white graphic tee with city backdrop) */}
              <div className="absolute -bottom-8 right-0 w-[55%] aspect-[4/5] bg-neutral-200 rounded-sm overflow-hidden shadow-2xl border-4 border-[#eeece7]">
                <Image
                  src={overlayStoryImage}
                  alt="Kathmandu Urban Horizon Tee"
                  fill
                  sizes="(max-width: 768px) 50vw, 300px"
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Barcode Stamp at bottom left of secondary photo matching reference */}
                <div className="absolute bottom-2 left-2 bg-white/95 px-2 py-1 flex flex-col items-center shadow-sm">
                  {/* Stylized Barcode SVG */}
                  <svg className="w-16 h-5" viewBox="0 0 100 30" fill="currentColor">
                    <rect x="0" y="0" width="4" height="24" />
                    <rect x="7" y="0" width="2" height="24" />
                    <rect x="12" y="0" width="6" height="24" />
                    <rect x="21" y="0" width="3" height="24" />
                    <rect x="27" y="0" width="5" height="24" />
                    <rect x="35" y="0" width="2" height="24" />
                    <rect x="40" y="0" width="7" height="24" />
                    <rect x="50" y="0" width="3" height="24" />
                    <rect x="56" y="0" width="5" height="24" />
                    <rect x="64" y="0" width="2" height="24" />
                    <rect x="69" y="0" width="6" height="24" />
                    <rect x="78" y="0" width="4" height="24" />
                    <rect x="85" y="0" width="3" height="24" />
                    <rect x="91" y="0" width="5" height="24" />
                  </svg>
                  <span className="text-[7px] font-mono tracking-widest text-neutral-800 uppercase">
                    VLNT-2026-NP
                  </span>
                </div>
              </div>

              {/* Handwritten Script Accent: "Same Dreams Different Paths." */}
              <div className="absolute top-8 right-2 sm:-right-4 transform rotate-6 z-20 pointer-events-none">
                <span className="font-serif italic font-normal text-2xl sm:text-3xl text-neutral-800 drop-shadow-sm whitespace-nowrap">
                  Same Dreams <br />
                  <span className="pl-6">Different Paths.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
