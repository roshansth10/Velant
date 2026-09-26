'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/data/journal';

export function JournalSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#eeece7] text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header matching reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-2 max-w-lg">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-600 font-medium">
              FROM OUR JOURNAL
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
              Style. Culture. Ideas.
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-light">
              Explore articles, style guides and stories from the Velant community.
            </p>
          </div>

          <Link
            href="/journal"
            className="group text-xs sm:text-sm font-mono tracking-wider text-neutral-800 hover:text-black flex items-center gap-1.5 transition-colors self-start md:self-end pb-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Articles Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article key={article.slug} className="group flex flex-col">
              <div className="relative aspect-[3/4] w-full bg-neutral-300 rounded-sm overflow-hidden mb-4">
                <Link href={`/journal/${article.slug}`} className="block w-full h-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <Link href={`/journal/${article.slug}`}>
                  <h3 className="text-base sm:text-lg font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
