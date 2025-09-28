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
      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center max-w-3xl md:max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-[#1b1d21] mb-3 sm:mb-4 md:mb-6 pt-4 sm:pt-6 md:pt-8">
              Hello SaaS Indonesia{' '}
              <span className="text-[#672afa]">🚀</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#a5a2a6] mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2">
              Welcome to your modern SaaS platform built with Next.js 14, 
              TypeScript, and Tailwind CSS. Ready to scale your business?
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2">
            <Link
              href="/signup"
              onClick={async (e) => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                  e.preventDefault();
                  window.location.href = '/dashboard';
                }
              }}
              className="group relative inline-flex items-center justify-center px-5 py-2.5 xs:px-6 xs:py-3 sm:px-8 sm:py-4 text-sm xs:text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#672afa] via-[#5a22df] to-[#4a1cc7] rounded-lg xs:rounded-xl shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-xl sm:hover:shadow-2xl md:hover:shadow-3xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-200 sm:duration-300 overflow-hidden w-full xs:w-auto"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 mr-1.5 xs:mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Get Started
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5a22df] via-[#4a1cc7] to-[#672afa] opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:duration-300"></div>
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
              className="group relative inline-flex items-center justify-center px-5 py-2.5 xs:px-6 xs:py-3 sm:px-8 sm:py-4 text-sm xs:text-base sm:text-lg font-bold text-white bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-lg xs:rounded-xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-lg sm:hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-200 sm:duration-300 overflow-hidden w-full xs:w-auto"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 mr-1.5 xs:mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Login
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-800 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:duration-300"></div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-[#fefefe] p-4 sm:p-6 rounded-lg shadow-md border border-[#e8e8e8]">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1b1d21] mb-2">Fast & Modern</h3>
              <p className="text-sm sm:text-base text-[#a5a2a6]">
                Built with Next.js 14 and the latest web technologies for optimal performance.
              </p>
            </div>
            <div className="bg-[#fefefe] p-4 sm:p-6 rounded-lg shadow-md border border-[#e8e8e8]">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🔒</div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1b1d21] mb-2">Secure</h3>
              <p className="text-sm sm:text-base text-[#a5a2a6]">
                Enterprise-grade security with TypeScript for type safety and reliability.
              </p>
            </div>
            <div className="bg-[#fefefe] p-4 sm:p-6 rounded-lg shadow-md border border-[#e8e8e8] sm:col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🎨</div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1b1d21] mb-2">Beautiful UI</h3>
              <p className="text-sm sm:text-base text-[#a5a2a6]">
                Clean, responsive design with Tailwind CSS for a professional look.
              </p>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
