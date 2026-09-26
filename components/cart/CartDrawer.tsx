'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag, Check } from 'lucide-react';
import { useShop } from '@/lib/store';

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
    user,
    showToast,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 3000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f0f0f] border-l border-neutral-800 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-neutral-400" />
              <h2 className="text-sm uppercase tracking-[0.2em] font-mono font-medium">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress indicator */}
          <div className="px-6 py-3 bg-[#161616] border-b border-neutral-800 text-xs font-mono">
            {remainingForFreeShipping > 0 ? (
              <p className="text-neutral-300">
                Add <span className="font-bold text-white">Rs. {remainingForFreeShipping.toLocaleString()}</span> more for Free Express Delivery in Nepal
              </p>
            ) : (
              <p className="text-emerald-400 flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>You unlocked Free Express Shipping across Nepal!</span>
              </p>
            )}
            <div className="mt-2 w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800">
                  <ShoppingBag className="w-7 h-7 text-neutral-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-light text-neutral-200">Your bag is currently empty.</p>
                  <p className="text-xs text-neutral-500 font-mono">
                    Discover modern oversized silhouettes engineered for comfort.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  <Link href="/shop">Explore Essentials</Link>
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <Link
                    href={`/shop/product/${item.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="relative w-20 h-24 bg-neutral-900 rounded overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      referrerPolicy="no-referrer"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/product/${item.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-sm font-medium text-white hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400 font-mono">
                        <span>Size: {item.size}</span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-neutral-800 rounded bg-neutral-900/80">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-white text-neutral-400"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-white text-neutral-400"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-medium font-mono text-white">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals and checkout button */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#0a0a0a] border-t border-neutral-800 space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs font-mono">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code &quot;{appliedCoupon.code}&quot; active</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-400 hover:text-white text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="Promo code (e.g. VELANT10)"
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-1.5 text-xs text-white placeholder-neutral-500 font-mono uppercase focus:outline-none focus:border-white"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white uppercase rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-400 font-mono mt-1">{couponError}</p>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs font-mono">
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
                  <span>Shipping</span>
                  <span>
                    {remainingForFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-semibold text-white">
                  <span>Estimated Total</span>
                  <span>Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                {user ? (
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 text-xs uppercase font-mono tracking-widest font-semibold flex items-center justify-center gap-2 rounded transition-colors shadow-xl"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href="/login?redirect=/checkout"
                    onClick={() => {
                      setIsCartOpen(false);
                      showToast('Please sign in or register to complete your order.', 'info');
                    }}
                    className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 text-xs uppercase font-mono tracking-widest font-semibold flex items-center justify-center gap-2 rounded transition-colors shadow-xl"
                  >
                    <span>Sign In / Register to Buy</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {!user && (
                  <p className="text-[10px] font-mono text-amber-400 text-center">
                    Customer account required to finalize drop purchase
                  </p>
                )}
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-neutral-400 hover:text-white text-xs uppercase font-mono tracking-widest text-center block transition-colors"
                >
                  View Full Bag Details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
