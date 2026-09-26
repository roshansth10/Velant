'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { VOICES } from '@/data/community';

export function VoicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVoice = VOICES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + VOICES.length) % VOICES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % VOICES.length);
  };

  const bgImage = '/images/nepal_model_hoodie.jpg';

  return (
    <section className="relative w-full min-h-[460px] sm:min-h-[520px] flex items-center bg-black text-white overflow-hidden py-20">
      {/* Background Image: Nepalese streetwear model */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Atmospheric Himalayan Silhouette"
          fill
          sizes="100vw"
          className="object-cover object-[center_60%] filter brightness-[0.45] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title Column matching reference */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
              VOICES • काठमाडौँ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              What Our <br className="hidden sm:inline" />
              Community Says
            </h2>
          </div>

          {/* Right Quote Carousel Column matching reference */}
          <div className="lg:col-span-8 relative">
            <div className="flex items-start gap-4 sm:gap-6">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-white/40 flex-shrink-0 -scale-x-100" />
              <div className="space-y-4 max-w-2xl">
                <p className="text-lg sm:text-2xl font-light text-neutral-100 leading-relaxed italic">
                  &quot;{currentVoice.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium tracking-wide text-neutral-300">
                    {currentVoice.author}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    {currentVoice.city} • Verified Purchase ({currentVoice.itemPurchased})
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Controls: < and > plus dots matching reference */}
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                {VOICES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-neutral-600 hover:bg-neutral-400'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Previous quote"
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-white/80 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next quote"
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-white/80 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
