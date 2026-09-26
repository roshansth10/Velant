'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, Calendar, Clock, User, Share2 } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/data/journal';
import { useShop } from '@/lib/store';

export default function JournalArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { downloadImage, showToast } = useShop();

  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-40 pb-24 text-center text-white bg-[#0a0a0a] min-h-screen space-y-4">
        <h1 className="text-2xl font-bold">Story Not Found</h1>
        <Link
          href="/journal"
          className="inline-block px-6 py-2.5 bg-white text-black text-xs font-mono uppercase font-bold"
        >
          Return to Journal
        </Link>
      </div>
    );
  }

  const related = JOURNAL_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard.');
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between pb-8">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dispatches</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-neutral-400 hover:text-white border border-neutral-800 rounded px-3 py-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <span className="text-white font-bold">{article.category}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-neutral-300 font-light leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Lead Image */}
        <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-neutral-900 mb-12 shadow-2xl border border-neutral-800">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />

          <button
            onClick={() => downloadImage(article.image, `${article.slug}-wallpaper.jpg`)}
            className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md border border-neutral-700 flex items-center gap-2 text-xs font-mono"
            title="Download high-resolution image"
          >
            <Download className="w-4 h-4" />
            <span>Download Asset</span>
          </button>
        </div>

        {/* Body Copy */}
        <div className="prose prose-invert max-w-none space-y-6 text-neutral-300 font-light text-base leading-relaxed">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {/* Pull quote */}
          <div className="my-10 p-6 sm:p-8 border-l-2 border-white bg-neutral-950 rounded-r-lg">
            <p className="text-xl sm:text-2xl font-serif italic text-white leading-snug">
              &quot;Streetwear in Nepal has moved beyond imitation. It has become an authentic expression of Himalayan grit, creative hustle, and timeless design.&quot;
            </p>
          </div>

          <p>
            When we develop pieces at VELANT, our priority is zero compromise on fabric weight and drape. From our 480 GSM loopback fleece to our 280 GSM combed cotton jersey, every stitch is engineered to retain structural silhouette wash after wash.
          </p>
        </div>

        {/* Author Card */}
        <div className="mt-16 p-6 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
              sizes="48px"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono">{article.author.name}</h3>
            <p className="text-xs text-neutral-400 font-mono">{article.author.role} at VELANT</p>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-neutral-900 space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-white">More from The Journal</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/journal/${rel.slug}`}
                  className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl group hover:border-neutral-700 transition-colors space-y-2 block"
                >
                  <span className="text-[11px] font-mono text-neutral-500 uppercase">{rel.category}</span>
                  <h3 className="text-base font-medium text-white group-hover:text-neutral-300 transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 font-light">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
