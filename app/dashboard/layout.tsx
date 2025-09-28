// Optimized dashboard layout with single scroll container and responsive behavior
// RUN: Test by visiting /dashboard - should show proper desktop/mobile layout
// Expected: Desktop shows brand in sidebar only, mobile shows brand in header, single scroll

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '../(components)/Navbar';
import Sidebar from '../(components)/Sidebar';
import type { User } from '@supabase/supabase-js';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }

        setUser(session.user);
      } catch (error) {
        console.error('Error checking session:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.push('/login');
        } else if (session) {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Fixed at top */}
      <Navbar user={{ email: user.email || 'user@example.com' }} onLogout={handleLogout} />
      
      {/* Main Layout Container - Flexbox with single scroll */}
      <div className="flex pt-16">
        {/* Sidebar - 224px width, sticky positioning */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Content Area - Single scroll container */}
        <main className="flex-1 min-h-[calc(100vh-64px)] overflow-y-auto">
          {/* Welcome Header */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-6 sm:px-8 lg:px-12 py-8 lg:py-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-4">
                    Welcome back!
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600">
                    Here&apos;s what&apos;s happening with your account.
                  </p>
                </div>
                <div className="flex items-center justify-between lg:justify-end space-x-4 lg:space-x-6">
                  {/* Quick Stats - Mobile optimized */}
                  <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
                    <div className="flex items-center bg-emerald-50 px-3 py-2 lg:px-4 lg:py-3 rounded-full border border-emerald-200">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 lg:mr-3 animate-pulse"></div>
                      <span className="text-emerald-700 font-medium text-xs lg:text-sm">Online</span>
                    </div>
                    <div className="flex items-center bg-cyan-50 px-3 py-2 lg:px-4 lg:py-3 rounded-full border border-cyan-200">
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-2 lg:mr-3 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-cyan-700 font-medium text-xs lg:text-sm">Now</span>
                    </div>
                  </div>
                  
                  {/* Mobile Status - Compact version for small screens */}
                  <div className="sm:hidden flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-600">Online</span>
                  </div>
                  
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden p-2 sm:p-3 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Content - Single scroll container */}
          <div className="px-6 sm:px-8 lg:px-12 py-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}