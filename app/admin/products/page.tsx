'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Search, X } from 'lucide-react';
import { useShop } from '@/lib/store';
import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, showToast } = useShop();
  const [search, setSearch] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New product form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'hoodies' | 't-shirts' | 'bottoms' | 'accessories'>('hoodies');
  const [price, setPrice] = useState<number>(2499);
  const [badge, setBadge] = useState('New');
  const [fabric, setFabric] = useState('480 GSM 100% Heavyweight Cotton');

  const filtered = products.filter((p) => {
    if (!search) return true;
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this piece from inventory?')) {
      deleteProduct(id);
      showToast('Product removed from catalogue.');
    }
  };

  const handleToggleStock = (product: (typeof products)[0]) => {
    updateProduct({ ...product, stock: product.stock > 0 ? 0 : 30 });
    showToast('Stock status updated.');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newP = {
      id: `prod-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      categoryLabel: category === 'hoodies' ? 'Hoodies' : category === 't-shirts' ? 'T-Shirts' : category === 'bottoms' ? 'Bottoms' : 'Accessories',
      collection: ['Drop 01', 'Core Essentials'],
      price: Number(price),
      badge: (badge as any) || 'New',
      stock: 45,
      featured: false,
      bestseller: false,
      newArrival: true,
      rating: 5.0,
      reviewCount: 1,
      gender: 'unisex' as const,
      images: [
        '/images/nepal_model_hoodie.jpg',
      ],
      colors: [{ name: 'Onyx Black', hex: '#111111', inStock: true }],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Engineered high-density streetwear drop piece made in Kathmandu.',
      fabric,
      fit: 'Relaxed Oversized Dropped Silhouette',
      features: ['Pre-shrunk', 'Reinforced double-stitch seams'],
      care: ['Machine wash cold', 'Hang dry inside out'],
      tags: ['Streetwear', 'Drop 01', 'Nepal'],
    };

    addProduct(newP);
    setIsNewModalOpen(false);
    showToast(`"${name}" published to live catalogue!`);
    setName('');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminNav />

        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-neutral-800 pb-6 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
              CATALOGUE MANAGEMENT • KATHMANDU
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
              Inventory & Products ({products.length})
            </h1>
          </div>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase font-bold rounded"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Piece</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product by title or category..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 pl-9 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900/60 text-neutral-400 uppercase border-b border-neutral-800">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Stock Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-900/40">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-neutral-900 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="50px"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{product.name}</span>
                        <span className="text-[11px] text-neutral-500">/{product.slug}</span>
                      </div>
                    </td>
                    <td className="p-4 uppercase text-neutral-400">{product.category}</td>
                    <td className="p-4 font-bold text-white">Rs. {product.price.toLocaleString()}</td>
                    <td className="p-4 text-amber-400">★ {product.rating}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                          product.stock > 0
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Sold Out'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateProduct}
            className="bg-neutral-950 border border-neutral-800 rounded-xl max-w-lg w-full p-6 space-y-4 text-xs font-mono text-white"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white">
                Add Streetwear Drop
              </h3>
              <button
                type="button"
                onClick={() => setIsNewModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Product Title *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kathmandu Midnight Graphic Tee"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                >
                  <option value="hoodies">Hoodies</option>
                  <option value="t-shirts">T-Shirts</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Price (NPR) *</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="New / Bestseller / Limited"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Fabric Spec</label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="e.g. 480 GSM French Terry"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
              />
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsNewModalOpen(false)}
                className="px-4 py-2 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-white text-black font-bold uppercase rounded hover:bg-neutral-200"
              >
                Publish Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
