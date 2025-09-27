// Landing page for the SaaS application
// Features a clean hero section with call-to-action buttons
// RUN: Test by visiting homepage - should redirect to dashboard if logged in
// Expected: Shows landing page for guests, redirects to dashboard for logged-in users

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PublicNavbar from './(components)/PublicNavbar';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#e8e8e8]">
      <PublicNavbar />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1b1d21] mb-6 pt-8">
              Hello SaaS Indonesia{' '}
              <span className="text-[#672afa]">🚀</span>
            </h1>
            <p className="text-xl text-[#a5a2a6] mb-8 max-w-2xl mx-auto">
              Welcome to your modern SaaS platform built with Next.js 14, 
              TypeScript, and Tailwind CSS. Ready to scale your business?
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              onClick={async (e) => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                  e.preventDefault();
                  window.location.href = '/dashboard';
                }
              }}
              className="bg-[#672afa] hover:bg-[#5a22df] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              onClick={async (e) => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                  e.preventDefault();
                  alert('Anda sudah login. Mengarahkan ke dashboard...');
                  window.location.href = '/dashboard';
                }
              }}
              className="bg-[#fefefe] hover:bg-[#ffffff] text-[#672afa] font-semibold py-3 px-8 rounded-lg border-2 border-[#672afa] transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-[#fefefe] p-6 rounded-lg shadow-md border border-[#e8e8e8]">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-[#1b1d21] mb-2">Fast & Modern</h3>
              <p className="text-[#a5a2a6]">
                Built with Next.js 14 and the latest web technologies for optimal performance.
              </p>
            </div>
            <div className="bg-[#fefefe] p-6 rounded-lg shadow-md border border-[#e8e8e8]">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-[#1b1d21] mb-2">Secure</h3>
              <p className="text-[#a5a2a6]">
                Enterprise-grade security with TypeScript for type safety and reliability.
              </p>
            </div>
            <div className="bg-[#fefefe] p-6 rounded-lg shadow-md border border-[#e8e8e8]">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-[#1b1d21] mb-2">Beautiful UI</h3>
              <p className="text-[#a5a2a6]">
                Clean, responsive design with Tailwind CSS for a professional look.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
