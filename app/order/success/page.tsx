'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Printer, Package, Truck, Clock, ShieldCheck } from 'lucide-react';
import { useShop } from '@/lib/store';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders } = useShop();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="pt-40 pb-24 text-center text-white bg-[#0a0a0a] min-h-screen space-y-4">
        <h1 className="text-2xl font-bold">Order Not Found</h1>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 bg-white text-black text-xs font-mono uppercase font-bold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-emerald-400 font-semibold block">
            ORDER CONFIRMED
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Thank You, {order.customerName.split(' ')[0]}
          </h1>
          <p className="text-neutral-400 text-sm font-light max-w-md mx-auto">
            Your drop order <span className="font-mono text-white font-semibold">#{order.id}</span> has been received and sent to our Kathmandu fulfillment warehouse.
          </p>
        </div>

        {/* Timeline Status */}
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
          <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">Fulfillment Status</h3>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto">
                ✓
              </div>
              <span className="text-white block font-medium">Order Placed</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center mx-auto">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-neutral-300 block">Processing</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-neutral-900 text-neutral-600 flex items-center justify-center mx-auto">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <span className="text-neutral-600 block">Shipped</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-neutral-900 text-neutral-600 flex items-center justify-center mx-auto">
                <Package className="w-3.5 h-3.5" />
              </div>
              <span className="text-neutral-600 block">Delivered</span>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 text-xs font-mono">
            <div>
              <span className="text-neutral-500 block">ORDER ID</span>
              <span className="text-white font-bold text-sm">#{order.id}</span>
            </div>
            <div className="text-right">
              <span className="text-neutral-500 block">DATE</span>
              <span className="text-white">{order.createdAt}</span>
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-neutral-900">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center gap-4">
                <div className="relative w-14 h-16 bg-neutral-900 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="60px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 text-xs font-mono">
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <p className="text-neutral-500">
                    Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-mono text-white font-bold">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Addresses & Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-800 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider">Shipping Destination</span>
              <p className="text-white font-medium">{order.customerName}</p>
              <p className="text-neutral-300">{order.shippingAddress.street}</p>
              <p className="text-neutral-300">
                {order.shippingAddress.city}, {order.shippingAddress.province}
              </p>
              <p className="text-neutral-400">Tel: {order.customerPhone}</p>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-500 block uppercase tracking-wider">Payment Method</span>
              <p className="text-white font-medium uppercase">{order.paymentMethod.replace('_', ' ')}</p>
              <p className="text-emerald-400">Status: {order.paymentStatus.toUpperCase()}</p>
              {order.paymentDetails?.transactionId && (
                <p className="text-neutral-400 text-[11px]">
                  Ref: {order.paymentDetails.transactionId}
                </p>
              )}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-2 pt-4 border-t border-neutral-800 text-xs font-mono">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span>Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
                <span>-Rs. {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>Shipping Fee</span>
              <span>{order.shippingCost === 0 ? 'FREE' : `Rs. ${order.shippingCost}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-900">
              <span>Total Paid</span>
              <span>Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded border border-neutral-800 hover:border-white text-xs font-mono uppercase text-white transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase font-bold tracking-wider transition-colors"
          >
            <span>View All Orders in Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-white font-mono">Loading order confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
