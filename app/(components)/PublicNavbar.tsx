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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="h-8 w-8 bg-[#672afa] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div className="text-xl font-bold text-[#1b1d21]">Hello SaaS</div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-[#1b1d21] hover:text-[#672afa] transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className="text-[#1b1d21] hover:text-[#672afa] transition-colors font-medium"
            >
              Dashboard
            </Link>
            {!isAuthenticated && (
              <>
                <Link 
                  href="/login" 
                  className="text-[#1b1d21] hover:text-[#672afa] transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="text-[#1b1d21] hover:text-[#672afa] transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
