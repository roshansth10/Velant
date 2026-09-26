'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Trash2, Plus, Minus, ShoppingBag, Tag, Check, ShieldCheck } from 'lucide-react';
import { useShop } from '@/lib/store';
import { ProductCard } from '@/components/products/ProductCard';

export default function CartPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
    products,
    user,
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const FREE_SHIPPING_LIMIT = 3000;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_LIMIT;
  const diffToFree = Math.max(0, FREE_SHIPPING_LIMIT - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg(res.message);
    if (res.success) setCouponCode('');
  };

  const suggestedProducts = products.filter((p) => !cart.some((c) => c.productId === p.id)).slice(0, 4);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Shopping Bag</h1>
            <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
              {cartCount} {cartCount === 1 ? 'Piece' : 'Pieces'} Selected
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-mono uppercase text-neutral-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing</span>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 space-y-5 bg-neutral-900/30 rounded-2xl border border-neutral-800/80 p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-light text-white">Your bag is empty</h2>
              <p className="text-xs text-neutral-400 font-mono">
                Explore our catalog for oversized heavyweight hoodies and boxy tees.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-block px-7 py-3 bg-white text-black text-xs font-mono uppercase font-bold tracking-wider rounded hover:bg-neutral-200 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Shipping progress bar banner */}
              <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  {isFreeShipping ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Unlocked Free Express Delivery in Nepal!
                    </span>
                  ) : (
                    <span className="text-neutral-300">
                      Add <strong className="text-white">Rs. {diffToFree.toLocaleString()}</strong> more for Free Shipping
                    </span>
                  )}
                  <span className="text-neutral-500">Threshold: Rs. {FREE_SHIPPING_LIMIT.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / FREE_SHIPPING_LIMIT) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl bg-neutral-950 overflow-hidden">
                {cart.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <Link
                      href={`/shop/product/${item.slug}`}
                      className="relative w-20 h-24 sm:w-24 sm:h-28 bg-neutral-900 rounded overflow-hidden flex-shrink-0"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="100px"
                        referrerPolicy="no-referrer"
                      />
                    </Link>

                    <div className="flex-1 space-y-1">
                      <Link
                        href={`/shop/product/${item.slug}`}
                        className="text-base font-medium text-white hover:underline block"
                      >
                        {item.name}
                      </Link>
                      <div className="text-xs font-mono text-neutral-400 flex items-center gap-3">
                        <span>Size: <strong className="text-neutral-200">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-neutral-200">{item.color}</strong></span>
                      </div>
                      <p className="text-sm font-mono text-neutral-300 pt-1">
                        Rs. {item.price.toLocaleString()} each
                      </p>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                      <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono text-white min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-neutral-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold font-mono text-white">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs font-mono uppercase text-neutral-500 hover:text-neutral-300"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order Summary Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6">
                <h2 className="text-sm font-mono uppercase tracking-widest text-white border-b border-neutral-800 pb-3">
                  Summary
                </h2>

                {/* Promo Code Form */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-neutral-400 block">Promo Code</label>
                  {appliedCoupon ? (
                    <div className="p-3 bg-neutral-900 border border-emerald-800/80 rounded flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                        <Tag className="w-3.5 h-3.5" />
                        {appliedCoupon.code}
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-neutral-400 hover:text-white underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. VELANT10"
                        className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 uppercase focus:outline-none focus:border-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono uppercase rounded text-white"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponMsg && (
                    <p className="text-[11px] font-mono text-neutral-400">{couponMsg}</p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2.5 text-xs font-mono border-t border-neutral-800 pt-4">
                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span>Rs. {cartSubtotal.toLocaleString()}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-400">
                    <span>Shipping (Nepal Express)</span>
                    <span>{isFreeShipping ? 'FREE' : 'Rs. 100'}</span>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex justify-between text-base font-bold text-white">
                    <span>Total</span>
                    <span>Rs. {(finalTotal + (isFreeShipping ? 0 : 100)).toLocaleString()}</span>
                  </div>
                </div>

                {/* Account Status / Auth Guard */}
                {user ? (
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono flex items-center justify-between text-neutral-300">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block tracking-wider">Account Active</span>
                      <span className="font-semibold text-white">{user.name}</span>
                    </div>
                    <span className="text-emerald-400 text-[11px] font-bold">✓ Verified Customer</span>
                  </div>
                ) : (
                  <div className="p-3.5 bg-amber-950/30 border border-amber-800/60 rounded space-y-1.5 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                      <span>Authentication Required</span>
                    </div>
                    <p className="text-amber-200/80 text-[11px] leading-relaxed">
                      Customers must log in or sign up before purchasing pieces from VELANT drops.
                    </p>
                  </div>
                )}

                {/* Checkout CTA */}
                {user ? (
                  <Link
                    href="/checkout"
                    className="w-full py-4 bg-white text-black hover:bg-neutral-200 text-xs uppercase font-mono tracking-widest font-bold flex items-center justify-center gap-2 rounded transition-all shadow-xl"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href="/login?redirect=/checkout"
                    className="w-full py-4 bg-white text-black hover:bg-neutral-200 text-xs uppercase font-mono tracking-widest font-bold flex items-center justify-center gap-2 rounded transition-all shadow-xl"
                  >
                    <span>Sign In / Register to Buy</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-500 pt-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-400" />
                  <span>Verified Nepalese Checkout (eSewa / Khalti / COD)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Pieces */}
        {suggestedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-neutral-900">
            <h2 className="text-xl font-bold tracking-tight text-white mb-6">Complete Your Drop</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {suggestedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
