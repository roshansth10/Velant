'use client';

import React from 'react';
import { X, Download, Image as ImageIcon, Check } from 'lucide-react';
import { useShop } from '@/lib/store';
import { LOOKBOOK_ASSETS } from '@/data/community';
import Image from 'next/image';

export function AssetDownloaderModal() {
  const { isAssetModalOpen, setIsAssetModalOpen, downloadImage, products } = useShop();
  const [downloadedIds, setDownloadedIds] = React.useState<string[]>([]);

  if (!isAssetModalOpen) return null;

  const handleDownload = (url: string, id: string, name: string) => {
    downloadImage(url, `${name.toLowerCase().replace(/\s+/g, '-')}.jpg`);
    setDownloadedIds((prev) => [...prev, id]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0d0d0d] border border-neutral-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
                VELANT MEDIA ARCHIVE
              </p>
            </div>
            <h2 className="text-xl font-light tracking-tight text-white mt-1">
              Download High-Resolution Brand Assets
            </h2>
          </div>

          <button
            onClick={() => setIsAssetModalOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Editorial / Lookbook */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-mono mb-4">
              Editorial Campaigns & Lookbook Assets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LOOKBOOK_ASSETS.map((asset) => {
                const isDownloaded = downloadedIds.includes(asset.id);
                return (
                  <div
                    key={asset.id}
                    className="group relative bg-[#141414] border border-neutral-800/80 rounded-xl overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
                      <Image
                        src={asset.url}
                        alt={asset.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-black/75 text-neutral-300 backdrop-blur-sm">
                        {asset.tag}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-medium text-white line-clamp-1">{asset.title}</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">{asset.dimensions} • High-Res JPG</p>
                      </div>

                      <button
                        onClick={() => handleDownload(asset.url, asset.id, asset.title)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs uppercase tracking-wider font-mono rounded-lg bg-neutral-800 hover:bg-white hover:text-black text-neutral-200 transition-all duration-200"
                      >
                        {isDownloaded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Downloaded</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Asset</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Photography */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-mono mb-4">
              Product Studio Photography
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.slice(0, 8).map((product) => {
                const id = `prod-img-${product.id}`;
                const isDownloaded = downloadedIds.includes(id);
                return (
                  <div
                    key={product.id}
                    className="group bg-[#141414] border border-neutral-800/80 rounded-xl overflow-hidden p-2 flex flex-col gap-2"
                  >
                    <div className="relative aspect-square w-full rounded-lg bg-neutral-900 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="truncate text-neutral-300 font-medium text-[11px]">{product.name}</span>
                      <button
                        onClick={() => handleDownload(product.images[0], id, product.name)}
                        className="p-1.5 text-neutral-400 hover:text-white rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
                        title="Download image"
                      >
                        {isDownloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0a0a0a] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>All assets optimized for fast loading and available for print or editorial use.</span>
          <button
            onClick={() => setIsAssetModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-white text-black text-xs font-sans font-medium hover:bg-neutral-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
