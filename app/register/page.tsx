'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Lock, Mail, User, Phone, AlertCircle } from 'lucide-react';
import { useShop } from '@/lib/store';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';
  const isCheckoutRedirect = redirect === '/checkout';

  const { register } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      const res = register(name, email, password, phone);
      setIsLoading(false);
      if (res.success) {
        router.push(redirect);
      } else {
        setErrorMsg(res.message || 'Registration failed.');
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-md p-8 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-6 shadow-2xl">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
          MEMBERSHIP
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
          Create Account
        </h1>
        <p className="text-xs font-mono text-neutral-400">
          {isCheckoutRedirect
            ? 'Register an account to complete your drop order and purchase.'
            : 'Join the community for priority drop access and order management.'}
        </p>
      </div>

      {isCheckoutRedirect && (
        <div className="p-3.5 bg-amber-950/30 border border-amber-800/60 rounded-lg text-xs font-mono text-amber-300">
          <p className="font-bold">Purchase Authorization Required</p>
          <p className="text-[11px] text-amber-200/80 mt-0.5">
            Without customer signup or login, customers cannot buy any product.
          </p>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-950/40 border border-red-800 text-red-400 text-xs font-mono rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
        <div>
          <label className="text-neutral-400 block mb-1.5">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 pl-9 text-white focus:outline-none focus:border-white"
              placeholder="Prashant Shrestha"
            />
          </div>
        </div>

        <div>
          <label className="text-neutral-400 block mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 pl-9 text-white focus:outline-none focus:border-white"
              placeholder="prashant@example.com"
            />
          </div>
        </div>

        <div>
          <label className="text-neutral-400 block mb-1.5">Phone Number (Nepal)</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 pl-9 text-white focus:outline-none focus:border-white"
              placeholder="+977 98XXXXXXXX"
            />
          </div>
        </div>

        <div>
          <label className="text-neutral-400 block mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 pl-9 text-white focus:outline-none focus:border-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <span>{isLoading ? 'Creating Membership...' : isCheckoutRedirect ? 'Register & Continue to Checkout' : 'Register'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="pt-4 border-t border-neutral-900 text-center text-xs font-mono text-neutral-400">
        <span>Already have an account? </span>
        <Link
          href={isCheckoutRedirect ? '/login?redirect=/checkout' : '/login'}
          className="text-white underline underline-offset-4"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-xs font-mono text-neutral-500">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
