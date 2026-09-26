'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { useShop } from '@/lib/store';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';
  const isCheckoutRedirect = redirect === '/checkout';

  const { login, user } = useShop();

  const [email, setEmail] = useState('aayush.r@velant.com');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        router.push(redirect);
      } else {
        setErrorMsg(res.message || 'Login failed.');
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-md p-8 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-6 shadow-2xl">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
          MEMBER ACCESS
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
          Sign In to VELANT
        </h1>
        <p className="text-xs font-mono text-neutral-400">
          {isCheckoutRedirect
            ? 'Sign in to your customer account to finalize your order checkout.'
            : 'Track orders, view wishlist, and access private drop allocations.'}
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
          <label className="text-neutral-400 block mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 pl-9 text-white focus:outline-none focus:border-white"
              placeholder="you@domain.com"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-neutral-400 block">Password</label>
            <a href="#" className="text-[11px] text-neutral-500 hover:text-white">
              Forgot?
            </a>
          </div>
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
            <span>{isLoading ? 'Verifying...' : isCheckoutRedirect ? 'Sign In & Continue to Checkout' : 'Access Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="pt-4 border-t border-neutral-900 text-center text-xs font-mono text-neutral-400">
        <span>New to VELANT? </span>
        <Link
          href={isCheckoutRedirect ? '/register?redirect=/checkout' : '/register'}
          className="text-white underline underline-offset-4"
        >
          Join the Movement
        </Link>
      </div>

      <div className="p-3 bg-neutral-900/60 rounded border border-neutral-800 text-[11px] font-mono text-neutral-400">
        <p className="text-neutral-300 font-medium">Demo Customer Credential:</p>
        <p>Email: aayush.r@velant.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-xs font-mono text-neutral-500">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
