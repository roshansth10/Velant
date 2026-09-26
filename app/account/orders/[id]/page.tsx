'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Printer, Package, Truck, Clock, CheckCircle } from 'lucide-react';
import { useShop } from '@/lib/store';
import { AccountNav } from '@/components/account/AccountNav';

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { orders } = useShop();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="pt-40 pb-24 text-center text-white bg-[#0a0a0a] min-h-screen space-y-4">
        <h1 className="text-2xl font-bold">Order #{id} Not Found</h1>
        <Link
          href="/account/orders"
          className="inline-block px-6 py-2.5 bg-white text-black text-xs font-mono uppercase font-bold"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-neutral-800 pb-6 mb-10 flex items-center justify-between">
          <div>
            <Link
              href="/account/orders"
              className="text-xs font-mono uppercase text-neutral-400 hover:text-white flex items-center gap-1.5 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Orders</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Order #{order.id}
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              Placed on {order.createdAt || order.date} • Status:{' '}
              <span className="text-emerald-400 font-bold uppercase">{order.orderStatus}</span>
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-neutral-700 hover:border-white rounded text-xs font-mono uppercase text-white transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <AccountNav />
          </div>

          <div className="lg:col-span-9 space-y-6">
            {/* Tracking timeline */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
              <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                Live Shipment Tracking
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto text-xs">
                    ✓
                  </div>
                  <span className="text-white block font-medium">Order Placed</span>
                </div>
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center mx-auto">
                    <Clock className="w-3 h-3" />
                  </div>
                  <span className="text-neutral-300 block">Processing</span>
                </div>
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-neutral-600 flex items-center justify-center mx-auto">
                    <Truck className="w-3 h-3" />
                  </div>
                  <span className="text-neutral-600 block">In Transit</span>
                </div>
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-neutral-600 flex items-center justify-center mx-auto">
                    <Package className="w-3 h-3" />
                  </div>
                  <span className="text-neutral-600 block">Delivered</span>
                </div>
              </div>
            </div>

            {/* Line items breakdown */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-white border-b border-neutral-800 pb-3">
                Items in This Package
              </h2>

              <div className="divide-y divide-neutral-900">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center gap-4">
                    <div className="relative w-16 h-20 bg-neutral-900 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 text-xs font-mono space-y-1">
                      <Link
                        href={`/shop/product/${item.slug}`}
                        className="text-sm text-white font-medium hover:underline block"
                      >
                        {item.name}
                      </Link>
                      <p className="text-neutral-400">
                        Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Shipping & Payment summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-neutral-800 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-neutral-500 uppercase tracking-wider block">Delivered To</span>
                  <p className="text-white font-medium">{order.customerName}</p>
                  <p className="text-neutral-300">{order.shippingAddress.street}</p>
                  <p className="text-neutral-300">
                    {order.shippingAddress.city}, {order.shippingAddress.province}
                  </p>
                  <p className="text-neutral-400">Tel: {order.customerPhone}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 uppercase tracking-wider block">Payment Details</span>
                  <p className="text-white font-medium uppercase">{order.paymentMethod.replace('_', ' ')}</p>
                  <p className="text-emerald-400">Payment Status: {order.paymentStatus.toUpperCase()}</p>
                  {order.paymentDetails?.transactionId && (
                    <p className="text-neutral-400">Ref: {order.paymentDetails.transactionId}</p>
                  )}
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs font-mono">
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
                  <span>Shipping</span>
                  <span>{order.shippingCost === 0 ? 'FREE' : `Rs. ${order.shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-900">
                  <span>Total Amount</span>
                  <span>Rs. {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
