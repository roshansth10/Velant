'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { useShop } from '@/lib/store';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      showToast('Welcome to the VELANT movement. Check your inbox for 10% off code!');
    }, 600);
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#0c0c0c] text-white overflow-hidden">
      {/* Heavy textured knit / woven cotton fabric background matching reference */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=2000&q=85"
          alt="Textured Fabric Backdrop"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.35] contrast-[1.2]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Join the Movement
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base font-light max-w-md mx-auto">
            Be the first to know about new drops, exclusive offers and more.
          </p>
        </div>

        {isSubscribed ? (
          <div className="max-w-md mx-auto p-4 bg-white/10 border border-white/20 rounded-full flex items-center justify-center gap-3 text-sm font-mono text-emerald-300">
            <Check className="w-5 h-5" />
            <span>You are now subscribed to VELANT Inner Circle.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-0 bg-black/70 border border-white/20 rounded-full p-1.5 backdrop-blur-md shadow-2xl focus-within:border-white transition-colors"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent px-6 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-7 py-3 bg-white text-black hover:bg-neutral-200 text-xs uppercase font-mono tracking-widest font-semibold rounded-full flex items-center justify-center gap-2 transition-all flex-shrink-0 disabled:opacity-50"
            >
              <span>{isLoading ? 'Joining...' : 'Subscribe'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
          No spam. Only high-caliber drops and cultural dispatches.
        </p>
      </div>
    </section>
  );
}
