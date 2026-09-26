'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  QrCode,
  Smartphone,
  Building,
  Truck,
  Upload,
  AlertCircle,
  Lock,
  User,
  UserPlus,
  LogIn,
} from 'lucide-react';
import { useShop } from '@/lib/store';

function AuthenticatedCheckout({
  user,
}: {
  user: NonNullable<ReturnType<typeof useShop>['user']>;
}) {
  const router = useRouter();
  const { cart, cartSubtotal, finalTotal, appliedCoupon, createOrder } = useShop();

  const defaultAddr = user.addresses?.find((a) => a.isDefault) || user.addresses?.[0];

  // Step 1: Contact
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '+977 9841998877');

  // Step 2: Shipping
  const [fullName, setFullName] = useState(user.name || '');
  const [street, setStreet] = useState(defaultAddr?.street || 'Ward 4, Baluwatar');
  const [city, setCity] = useState(defaultAddr?.city || 'Kathmandu');
  const [province, setProvince] = useState(defaultAddr?.province || 'Bagmati Province');
  const [landmark, setLandmark] = useState(defaultAddr?.landmark || 'Near Russian Embassy');

  // Step 3: Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  // Step 4: Payment Method (Nepal payment system mock)
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti' | 'bank_transfer' | 'cod'>('esewa');

  // Payment mock fields
  const [esewaId, setEsewaId] = useState('9841998877');
  const [esewaPin, setEsewaPin] = useState('');
  const [khaltiMobile, setKhaltiMobile] = useState('9801234567');
  const [khaltiPin, setKhaltiPin] = useState('');
  const [selectedBank, setSelectedBank] = useState<'nabil' | 'global_ime'>('nabil');
  const [bankTxnRef, setBankTxnRef] = useState('');
  const [isReceiptUploaded, setIsReceiptUploaded] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const shippingCost =
    deliveryMethod === 'express' ? 200 : cartSubtotal >= 3000 ? 0 : 100;
  const grandTotal = finalTotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone || !fullName || !street || !city) {
      setErrorMessage('Please fill in all required contact and shipping details.');
      return;
    }

    if (paymentMethod === 'bank_transfer' && !bankTxnRef) {
      setErrorMessage('Please provide the Bank Transfer Transaction ID / Reference.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: {
          street,
          city,
          province,
          landmark,
        },
        deliveryMethod,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        paymentDetails: {
          transactionId:
            paymentMethod === 'esewa'
              ? `ESEWA-${Math.floor(10000000 + Math.random() * 90000000)}`
              : paymentMethod === 'khalti'
              ? `KHALTI-TXN-${Math.floor(100000 + Math.random() * 900000)}`
              : paymentMethod === 'bank_transfer'
              ? bankTxnRef
              : undefined,
          bankName:
            paymentMethod === 'bank_transfer'
              ? selectedBank === 'nabil'
                ? 'Nabil Bank'
                : 'Global IME Bank'
              : undefined,
          walletPhone: paymentMethod === 'esewa' ? esewaId : khaltiMobile,
        },
        orderStatus: 'Confirmed',
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          slug: item.slug,
          price: item.price,
          image: item.image,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        })),
        subtotal: cartSubtotal,
        discount: cartSubtotal - finalTotal,
        shippingCost,
        total: grandTotal,
        couponCode: appliedCoupon?.code,
      });

      router.push(`/order/success?orderId=${order.id}`);
    }, 1200);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="border-b border-neutral-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Check className="w-3 h-3" />
                Verified Customer: {user.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              Secure Checkout
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              Signed in as {user.email} • Complete drop order with local Nepal payments or Cash on Delivery.
            </p>
          </div>
          <Link
            href="/cart"
            className="text-xs font-mono uppercase text-neutral-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Bag</span>
          </Link>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Checkout Fields (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section 1: Contact Information */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
                  1
                </span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="text-neutral-400 block mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1.5">Phone (Nepal +977) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Shipping Address */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
                  2
                </span>
                <span>Shipping Address (Nepal)</span>
              </h2>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-neutral-400 block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1.5">Street Address / Tole / Ward *</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. Ward 3, Lazimpat, House 12"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-400 block mb-1.5">City / District *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                    >
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Lalitpur">Lalitpur</option>
                      <option value="Bhaktapur">Bhaktapur</option>
                      <option value="Pokhara">Pokhara</option>
                      <option value="Butwal">Butwal</option>
                      <option value="Biratnagar">Biratnagar</option>
                      <option value="Dharan">Dharan</option>
                      <option value="Narayangarh">Narayangarh / Chitwan</option>
                      <option value="Hetauda">Hetauda</option>
                      <option value="Nepalgunj">Nepalgunj</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1.5">Province *</label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                    >
                      <option value="Bagmati Province">Bagmati Province</option>
                      <option value="Gandaki Province">Gandaki Province</option>
                      <option value="Lumbini Province">Lumbini Province</option>
                      <option value="Koshi Province">Koshi Province</option>
                      <option value="Madhesh Province">Madhesh Province</option>
                      <option value="Karnali Province">Karnali Province</option>
                      <option value="Sudurpashchim Province">Sudurpashchim Province</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1.5">Nearby Landmark (Optional)</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Near Bhatbhateni Supermarket or Chowk"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Delivery Method */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
                  3
                </span>
                <span>Delivery Speed</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 rounded-lg border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-white bg-neutral-900 ring-1 ring-white/30'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Standard Courier</span>
                    <span className="text-neutral-300">
                      {cartSubtotal >= 3000 ? 'FREE' : 'Rs. 100'}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Kathmandu (24-48h) • Outside Valley (2-3 Days via Nepal Express)
                  </p>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 rounded-lg border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-white bg-neutral-900 ring-1 ring-white/30'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Express Priority</span>
                    <span className="text-neutral-300">Rs. 200</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Guaranteed same-day/next-morning priority hand delivery in Kathmandu & Lalitpur
                  </p>
                </label>
              </div>
            </div>

            {/* Section 4: Nepal Payment Methods (Mock Only) */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
                    4
                  </span>
                  <span>Payment Method (Nepal Mock Flow)</span>
                </h2>
                <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                  Demo Active
                </span>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {/* eSewa */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('esewa')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'esewa'
                      ? 'border-[#60bb46] bg-[#60bb46]/10 text-white font-bold'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#60bb46] flex items-center justify-center text-white font-bold text-[10px]">
                    e
                  </div>
                  <span>eSewa</span>
                </button>

                {/* Khalti */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('khalti')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'khalti'
                      ? 'border-[#5d2e8e] bg-[#5d2e8e]/10 text-white font-bold'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#5d2e8e] flex items-center justify-center text-white font-bold text-[10px]">
                    K
                  </div>
                  <span>Khalti</span>
                </button>

                {/* Bank Transfer */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-blue-500 bg-blue-500/10 text-white font-bold'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Building className="w-5 h-5 text-blue-400" />
                  <span>Bank Wire</span>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-neutral-400 bg-neutral-800 text-white font-bold'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-5 h-5 text-neutral-400" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Payment Details Subpanels */}
              <div className="p-4 bg-neutral-900/90 border border-neutral-800 rounded-lg text-xs font-mono space-y-3">
                {/* 1. eSewa Panel */}
                {paymentMethod === 'esewa' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                      <span className="text-[#60bb46] font-bold">eSewa Mobile Wallet Simulation</span>
                      <span className="text-neutral-400 text-[11px]">Instant Verification</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="p-2 bg-white rounded flex flex-col items-center">
                        <QrCode className="w-20 h-20 text-black" />
                        <span className="text-[9px] text-black font-bold mt-1">SCAN VIA ESEWA</span>
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <div>
                          <label className="text-neutral-400 block mb-1">eSewa ID / Mobile Number</label>
                          <input
                            type="text"
                            value={esewaId}
                            onChange={(e) => setEsewaId(e.target.value)}
                            placeholder="98XXXXXXXX"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-neutral-400 block mb-1">MPIN / Token (Simulation)</label>
                          <input
                            type="password"
                            value={esewaPin}
                            onChange={(e) => setEsewaPin(e.target.value)}
                            placeholder="•••• (Leave blank or enter test PIN)"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Khalti Panel */}
                {paymentMethod === 'khalti' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                      <span className="text-[#9e67d4] font-bold">Khalti Digital Wallet Simulation</span>
                      <span className="text-neutral-400 text-[11px]">Direct Debit</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-neutral-400 block mb-1">Khalti Mobile Number</label>
                        <input
                          type="text"
                          value={khaltiMobile}
                          onChange={(e) => setKhaltiMobile(e.target.value)}
                          placeholder="98XXXXXXXX"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-1">Khalti 4-Digit PIN</label>
                        <input
                          type="password"
                          value={khaltiPin}
                          onChange={(e) => setKhaltiPin(e.target.value)}
                          placeholder="••••"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Bank Transfer Panel */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                      <span className="text-blue-400 font-bold">Direct Corporate Bank Transfer</span>
                      <span className="text-neutral-400 text-[11px]">Nepal Clearance</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBank('nabil')}
                        className={`flex-1 p-2 rounded border text-center ${
                          selectedBank === 'nabil'
                            ? 'border-blue-400 bg-blue-950/40 text-white font-bold'
                            : 'border-neutral-800 text-neutral-400'
                        }`}
                      >
                        Nabil Bank Ltd
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedBank('global_ime')}
                        className={`flex-1 p-2 rounded border text-center ${
                          selectedBank === 'global_ime'
                            ? 'border-blue-400 bg-blue-950/40 text-white font-bold'
                            : 'border-neutral-800 text-neutral-400'
                        }`}
                      >
                        Global IME Bank
                      </button>
                    </div>

                    <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-[11px] space-y-1">
                      <p><strong className="text-white">Account Name:</strong> VELANT APPAREL NEPAL PVT LTD</p>
                      <p>
                        <strong className="text-white">Account Number:</strong>{' '}
                        {selectedBank === 'nabil' ? '01901017500123' : '10801010045678'}
                      </p>
                      <p>
                        <strong className="text-white">Branch:</strong>{' '}
                        {selectedBank === 'nabil' ? 'Lazimpat, Kathmandu' : 'Durbar Marg, Kathmandu'}
                      </p>
                      <p><strong className="text-white">Total Transfer Amount:</strong> Rs. {grandTotal.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-neutral-400 block mb-1">Transaction Ref / Cheque No. *</label>
                      <input
                        type="text"
                        value={bankTxnRef}
                        onChange={(e) => setBankTxnRef(e.target.value)}
                        placeholder="e.g. NABIL-FT-991823"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 block mb-1">Upload Receipt Slip (Optional)</label>
                      <button
                        type="button"
                        onClick={() => setIsReceiptUploaded(true)}
                        className="w-full py-2.5 border border-dashed border-neutral-700 hover:border-neutral-400 rounded flex items-center justify-center gap-2 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span>
                          {isReceiptUploaded ? 'Receipt Attached (mock-slip.jpg)' : 'Select receipt screenshot or photo'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. Cash on Delivery Panel */}
                {paymentMethod === 'cod' && (
                  <div className="space-y-2 animate-in fade-in text-neutral-300">
                    <p className="font-bold text-white">Cash on Delivery (COD)</p>
                    <p className="text-neutral-400 text-xs">
                      Pay with exact cash directly to the courier agent upon arrival at your doorstep anywhere in Nepal.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/80 border border-red-800 rounded text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6 sticky top-32">
              <h2 className="text-sm font-mono uppercase tracking-widest text-white border-b border-neutral-800 pb-3">
                Order Review ({cart.length} items)
              </h2>

              {/* Items List */}
              <div className="divide-y divide-neutral-900 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
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
                      <h3 className="text-white font-medium line-clamp-1">{item.name}</h3>
                      <p className="text-neutral-500">
                        {item.size} • {item.color} • Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial breakdown */}
              <div className="space-y-2 text-xs font-mono border-t border-neutral-800 pt-4">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>Rs. {cartSubtotal.toLocaleString()}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-Rs. {(cartSubtotal - finalTotal).toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Delivery ({deliveryMethod === 'express' ? 'Express' : 'Standard'})</span>
                  <span>{shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}</span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between text-lg font-bold text-white">
                  <span>Total Amount</span>
                  <span>Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black hover:bg-neutral-200 text-xs uppercase font-mono tracking-widest font-bold flex items-center justify-center gap-2 rounded transition-all shadow-2xl disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Securing Order...' : 'Confirm Drop Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Encrypted simulated checkout • No real charges</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, finalTotal, user, login, register } = useShop();

  // Guest Auth Gate State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    setTimeout(() => {
      if (authMode === 'login') {
        const res = login(authEmail, authPassword);
        if (!res.success) {
          setAuthError(res.message || 'Login failed.');
          setIsAuthLoading(false);
        } else {
          setIsAuthLoading(false);
        }
      } else {
        const res = register(authName, authEmail, authPassword, authPhone);
        if (!res.success) {
          setAuthError(res.message || 'Registration failed.');
          setIsAuthLoading(false);
        } else {
          setIsAuthLoading(false);
        }
      }
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    login('aayush.r@velant.com', 'kathmandu123');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center text-white bg-[#0a0a0a] min-h-screen space-y-4">
        <h1 className="text-2xl font-bold">Your Bag is Empty</h1>
        <p className="text-neutral-400 text-sm font-mono">
          Add some essentials to proceed to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 bg-white text-black text-xs font-mono uppercase font-bold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Auth Guard: Without customer signup/login, customer cannot buy any product
  if (!user) {
    return (
      <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Header */}
            <div className="text-center space-y-2.5 border-b border-neutral-800 pb-6">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-white">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                Customer Login Required
              </h1>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                Without customer signup or login, customers cannot buy any product. Please sign in or register below to proceed to checkout.
              </p>
            </div>

            {/* Cart summary preview pill */}
            <div className="p-3 bg-neutral-900/60 rounded border border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Order Bag ({cart.length} items):</span>
              <span className="text-white font-bold">Rs. {finalTotal.toLocaleString()}</span>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                }}
                className={`py-2 text-center rounded uppercase font-bold transition-colors ${
                  authMode === 'login' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthError('');
                }}
                className={`py-2 text-center rounded uppercase font-bold transition-colors ${
                  authMode === 'register' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error banner */}
            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-400 text-xs font-mono rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs font-mono">
              {authMode === 'register' && (
                <div>
                  <label className="text-neutral-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="e.g. Suman Shakya"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                  />
                </div>
              )}

              <div>
                <label className="text-neutral-400 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Password *</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Min 4 characters"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="text-neutral-400 block mb-1">Mobile Number (Nepal)</label>
                  <input
                    type="tel"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 transition-colors mt-2"
              >
                {isAuthLoading ? (
                  <span>Authenticating...</span>
                ) : authMode === 'login' ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In & Continue to Checkout</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Register & Continue to Checkout</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Option */}
            <div className="pt-3 border-t border-neutral-800 text-center space-y-3">
              <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider block">
                — Quick Testing Option —
              </span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono rounded transition-colors flex items-center justify-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>1-Click Sign In as Demo Customer (Aayush)</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/cart"
                className="text-xs font-mono text-neutral-400 hover:text-white inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Shopping Bag</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <AuthenticatedCheckout key={user.id} user={user} />;
}
