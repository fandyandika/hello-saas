// Public navbar component for non-dashboard pages
// RUN: Visit home page logged-in vs logged-out → Login/Sign Up hidden when logged-in
// Expected: Shows Home + Dashboard always; hides auth links when session exists

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function PublicNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(Boolean(session));
    };
    init();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthenticated(Boolean(session));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-[#fefefe]/90 backdrop-blur shadow-sm border-b border-[#e8e8e8] fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-[#672afa] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">H</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#1b1d21]">Hello SaaS</div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            <Link 
              href="/dashboard" 
              className="group relative inline-flex items-center px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-[#1b1d21] bg-[#fefefe] border border-[#e8e8e8] rounded-md sm:rounded-lg hover:bg-[#e8e8e8] hover:border-[#672afa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#672afa] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
              </svg>
              <span className="hidden xs:inline">Dashboard</span>
              <span className="xs:hidden">Dash</span>
            </Link>
            
            {!isAuthenticated && (
              <Link 
                href="/login" 
                className="text-xs sm:text-sm text-[#1b1d21] hover:text-[#672afa] transition-colors font-medium px-1 sm:px-2"
              >
                Login
              </Link>
            )}
            
            <Link 
              href="/signup" 
              className="group relative inline-flex items-center px-3 py-1.5 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#672afa] via-[#5a22df] to-[#4a1cc7] rounded-md sm:rounded-lg hover:from-[#5a22df] hover:to-[#4a1cc7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#672afa] transition-all duration-200 shadow-sm sm:shadow-md hover:shadow-md sm:hover:shadow-lg transform hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span className="hidden xs:inline">Sign Up</span>
                <span className="xs:hidden">Sign</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5a22df] via-[#4a1cc7] to-[#672afa] opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
