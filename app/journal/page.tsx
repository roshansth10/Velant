'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Clock, Calendar, Search } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/data/journal';
import { useShop } from '@/lib/store';

export default function JournalIndexPage() {
  const { downloadImage } = useShop();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Style Guide', 'Culture', 'Sustainability'];

  const filteredArticles = JOURNAL_ARTICLES.filter((article) => {
    if (activeCategory !== 'All' && article.category !== activeCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchExcerpt = article.excerpt.toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt) return false;
    }
    return true;
  });

  const featured = JOURNAL_ARTICLES[0];

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching reference */}
        <div className="border-b border-neutral-800 pb-8 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
            EDITORIAL & DISPATCHES
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mt-1">
            The Velant Journal
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl mt-2">
            Dispatches on contemporary streetwear culture, intentional proportions, and the creative
            movement across Nepal and the diaspora.
          </p>
        </div>

        {/* Featured Editorial Story */}
        {featured && !search && activeCategory === 'All' && (
          <div className="mb-16 border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950 grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[320px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => downloadImage(featured.image, `velant-journal-${featured.slug}.jpg`)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-sm border border-neutral-700"
                title="Download editorial photo"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                  <span className="text-white uppercase font-bold">{featured.category}</span>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-neutral-300 transition-colors leading-tight">
                  <Link href={`/journal/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
                <span className="text-xs font-mono text-neutral-500">By {featured.author.name}</span>
                <Link
                  href={`/journal/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-white hover:text-neutral-300"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 pb-4 border-b border-neutral-900">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stories..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-full p-2 pl-9 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article key={article.slug} className="group flex flex-col">
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-neutral-900 mb-4">
                <Link href={`/journal/${article.slug}`} className="block w-full h-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </Link>

                <button
                  onClick={() => downloadImage(article.image, `velant-${article.slug}.jpg`)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 hover:bg-black text-neutral-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  title="Download article photo"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                  <span className="text-neutral-300 uppercase">{article.category}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <Link href={`/journal/${article.slug}`}>
                  <h3 className="text-lg font-medium text-white group-hover:text-neutral-300 transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
