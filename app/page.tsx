// Landing page for the SaaS application
// Features a clean hero section with call-to-action buttons
// RUN: Test by visiting homepage - should redirect to dashboard if logged in
// Expected: Shows landing page for guests, redirects to dashboard for logged-in users

'use client';

import Link from 'next/link';
import PublicNavbar from './(components)/PublicNavbar';
import { supabase } from '@/lib/supabase';

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
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/signup"
              onClick={async (e) => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                  e.preventDefault();
                  window.location.href = '/dashboard';
                }
              }}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#672afa] via-[#5a22df] to-[#4a1cc7] rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Get Started
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5a22df] via-[#4a1cc7] to-[#672afa] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              href="/dashboard"
              onClick={async (e) => {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                  e.preventDefault();
                  alert('Please login first to access dashboard');
                  window.location.href = '/login';
                }
              }}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#1b1d21] bg-gradient-to-r from-[#fefefe] to-[#f8f9fa] border-2 border-[#672afa] rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                Dashboard
              </span>
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
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Login
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-800 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
