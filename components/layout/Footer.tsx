"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-neutral-800/60">
          {/* Logo matching reference "V E L A N T" */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold tracking-[0.4em] uppercase font-sans hover:opacity-80 transition-opacity"
          >
            VELANT
          </Link>

          {/* Navigation Links matching reference */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="/journal"
              className="hover:text-white transition-colors"
            >
              Journal
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-neutral-200 transition-colors text-neutral-500"
            >
              Portal
            </Link>
          </div>

          {/* Social Icons: Instagram, TikTok, YouTube */}
          <div className="flex items-center gap-5 text-neutral-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="VELANT Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            {/* Custom TikTok SVG icon */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="VELANT TikTok"
              className="hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="VELANT YouTube"
              className="hover:text-white transition-colors"
            >
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        {/* Developed by DX Studio Banner */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-800/40 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 uppercase tracking-widest text-[11px]">
              Developed by
            </span>
            <a
              href="https://dxcreativestudio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit DX Creative Studio"
              className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded"
            >
              <Image
                src="/images/logo1.png"
                alt="Developed by logo"
                width={140}
                height={42}
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>
          <span className="text-neutral-500 text-[11px]">
            Kathmandu, Nepal • High-End Digital Experience
          </span>
        </div>

        {/* Bottom Bar matching reference */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© 2026 Velant. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-neutral-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-neutral-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/shipping"
              className="hover:text-neutral-400 transition-colors"
            >
              Shipping
            </Link>
            <Link
              href="/returns"
              className="hover:text-neutral-400 transition-colors"
            >
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
