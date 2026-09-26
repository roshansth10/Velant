'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import gsap from 'gsap';

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: '01',
      counter: '01 / 02',
      tagline: 'NEPALESE PREMIUM STREETWEAR • काठमाडौँ',
      titleLine1: 'Better',
      titleLine2: 'Fits',
      titleLine3: 'Bigger',
      titleLine4: 'Dreams.',
      subtitle:
        'Modern Himalayan essentials for the ones who move different. Designed for comfort in Kathmandu. Built for your journey.',
      ctaText: 'Shop Collection',
      ctaLink: '/shop',
      image: '/images/nepal_model_hoodie.jpg',
      hasVideo: false,
    },
    {
      id: '02',
      counter: '02 / 02',
      tagline: 'KATHMANDU UNDERGROUND • S/S 2026',
      titleLine1: 'The Next',
      titleLine2: 'Himalayan',
      titleLine3: 'Chapter.',
      titleLine4: '',
      subtitle:
        "New season. Authentic Nepalese identity. Explore the heavyweight collection engineered for Kathmandu streets.",
      ctaText: 'Explore Collection',
      ctaLink: '/collections/new-arrivals',
      image: '/images/nepal_model_street.jpg',
      hasVideo: true,
    },
  ];

  const current = slides[activeSlide];

  // GSAP animation when active slide changes
  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [activeSlide]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('our-story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden"
    >
      {/* Background Image with Dark Mood & Subtle Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          key={current.id}
          src={current.image}
          alt={current.tagline}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] filter brightness-[0.75] contrast-[1.08] transition-opacity duration-1000 ease-in-out"
        />
        {/* Layered cinematic vignettes matching reference */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Top Spacer for fixed navbar */}
      <div className="h-28 sm:h-32" />

      {/* Main Content Area matching reference composition */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-12 flex-1 flex flex-col justify-center"
      >
        <div className="max-w-2xl">
          {/* Eyebrow / Tagline matching reference */}
          <div className="hero-anim-item flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-neutral-300 font-mono font-medium">
              {current.tagline}
            </span>
          </div>

          {/* Large Editorial Headline matching reference typography */}
          <h1 className="hero-anim-item text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white">
            {current.titleLine1 && <span className="block">{current.titleLine1}</span>}
            {current.titleLine2 && <span className="block">{current.titleLine2}</span>}
            {current.titleLine3 && <span className="block">{current.titleLine3}</span>}
            {current.titleLine4 && <span className="block">{current.titleLine4}</span>}
          </h1>

          {/* Supporting Text matching reference */}
          <p className="hero-anim-item text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-lg mt-6 mb-8 text-pretty">
            {current.subtitle}
          </p>

          {/* CTA Row matching reference button style */}
          <div className="hero-anim-item flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href={current.ctaLink}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Watch Film CTA */}
            {current.hasVideo && (
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-wider uppercase text-white/90 hover:text-white group transition-colors"
              >
                <div className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                  <Play className="w-4 h-4 fill-white translate-x-0.5" />
                </div>
                <span>Watch Film</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar matching reference */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pb-8 flex items-center justify-between text-xs font-mono text-neutral-400">
        {/* Slide Counter & Switcher */}
        <div className="flex items-center gap-4">
          <span className="text-white font-medium tracking-wider">{current.counter}</span>
          <div className="w-16 sm:w-24 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-1 ml-1">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="p-1 text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="p-1 text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToNextSection}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
        >
          <span className="tracking-[0.25em] uppercase text-[11px]">Scroll</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Video Modal for "Watch Film" */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                VELANT — KATHMANDU CAMPAIGN FILM
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <Image
                src="/images/nepal_model_street.jpg"
                alt="Film Poster"
                fill
                className="object-cover opacity-60"
              />
              <div className="relative z-10 text-center space-y-3 p-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center mx-auto">
                  <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                </div>
                <h3 className="text-xl font-medium tracking-tight text-white">
                  &quot;Same Dreams Different Paths&quot;
                </h3>
                <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto">
                  Shot on 16mm across Kathmandu Valley, Shivapuri Ridge, and Patan alleyways.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
