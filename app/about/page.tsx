'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, Compass, ShieldCheck, Feather } from 'lucide-react';
import { useShop } from '@/lib/store';

export default function AboutPage() {
  const { downloadImage } = useShop();

  const heroImage = '/images/nepal_model_hoodie.jpg';
  const cityImage = '/images/nepal_model_female_street.jpg';

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[520px] sm:h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Velant Kathmandu Origins"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] filter brightness-[0.55] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-300 font-medium">
              BRAND PHILOSOPHY & CRAFT • काठमाडौँ
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              More Than Just Clothes.
            </h1>
            <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
              VELANT was founded in Kathmandu with a simple mission: create streetwear that honors
              Himalayan ambition, effortless comfort, and architectural proportions.
            </p>

            <div className="pt-3">
              <button
                onClick={() => downloadImage(heroImage, 'velant-origins-hero.jpg')}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-300 hover:text-white border border-white/20 hover:border-white px-4 py-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save High-Res Campaign Photo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Section 1: Same Dreams Different Paths */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
              OUR CREED • काठमाडौँ
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Same Dreams. <br />
              Different Paths.
            </h2>
            <p className="text-neutral-300 text-base font-light leading-relaxed">
              Whether you are an engineer writing code late at night in Patan, a visual artist
              painting murals across Thamel, an athlete training in Pokhara valleys, or a dreamer charting
              an uncharted career, VELANT is designed to move with your ambition.
            </p>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Every drop is numbered and produced in controlled batches right here in Nepal. We avoid wasteful fast-fashion
              cycles and focus exclusively on timeless silhouettes that last for years.
            </p>
          </div>

          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative aspect-[4/5] w-full max-w-md rounded-sm overflow-hidden border border-neutral-800 shadow-2xl">
              <Image
                src={cityImage}
                alt="Kathmandu Streetwear Model in Jhamsikhel"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
              <button
                onClick={() => downloadImage(cityImage, 'velant-kathmandu-street.jpg')}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-sm border border-neutral-700"
                title="Download asset"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars Section: The Craft */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            ENGINEERED SPECIFICATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Obsessive Attention to Detail
          </h2>
          <p className="text-neutral-400 text-sm font-light">
            We spent nine months perfecting our custom fabric weights and collar elasticities in Kathmandu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">480 GSM Heavy French Terry</h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Our hoodies feature a dense loopback interior that locks in structural volume without
              adding stifling heat. Pre-shrunk to ensure zero shrinkage across lifetime washes.
            </p>
          </div>

          <div className="p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Zero-Sag 1.25&quot; Ribbed Collars</h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              T-shirt collars are double-needle reinforced with elastane core yarn so they hug clean
              against your clavicle and never bacon or loosen.
            </p>
          </div>

          <div className="p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Himalayan Tested Durability</h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Field tested in the temperature swings of Kathmandu and the Annapurna highlands. Breathable
              enough for warm afternoons, insulating when mountain winds roll in.
            </p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-4xl mx-auto px-4 text-center py-16 border-t border-neutral-900 space-y-6">
        <h2 className="text-3xl font-bold text-white">Experience the Difference</h2>
        <p className="text-neutral-400 text-sm font-light max-w-md mx-auto">
          Explore our current drop of oversized hoodies, combed tees, and utilitarian bottom wear.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-widest font-bold rounded-full transition-all"
        >
          <span>Shop The Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
