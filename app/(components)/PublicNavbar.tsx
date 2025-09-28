// Modern public navbar with consistent logo design
// RUN: Test by checking public navbar shows consistent logo with dashboard
// Expected: Professional public navbar with modern logo and consistent branding

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function PublicNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-18">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
            >
              {/* Modern Professional Logo */}
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <div className="relative">
                    {/* Modern H Design */}
                    <div className="w-5 h-5 relative">
                      {/* Left vertical bar */}
                      <div className="absolute left-0 top-0 w-1.5 h-5 bg-white rounded-full"></div>
                      {/* Right vertical bar */}
                      <div className="absolute right-0 top-0 w-1.5 h-5 bg-white rounded-full"></div>
                      {/* Horizontal bar */}
                      <div className="absolute left-0 top-2 w-5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                Hello SaaS
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link 
              href="/dashboard" 
              className="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
              </svg>
              <span className="hidden xs:inline">Dashboard</span>
              <span className="xs:hidden">Dash</span>
            </Link>
            
            {!isAuthenticated && (
              <Link 
                href="/login" 
                className="text-sm text-gray-700 hover:text-indigo-600 transition-colors font-medium px-2"
              >
                Login
              </Link>
            )}
            
            <Link 
              href="/signup" 
              className="group relative inline-flex items-center px-5 py-2.5 lg:px-6 lg:py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 rounded-lg hover:from-violet-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span className="hidden xs:inline">Sign Up</span>
                <span className="xs:hidden">Sign</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-700 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}