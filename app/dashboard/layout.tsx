// Modern dashboard layout with optimized spacing and improved visual hierarchy
// RUN: Test by visiting /dashboard - should show clean, modern layout with proper spacing
// Expected: Reduced white space, better proportions, modern color scheme

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
      
      <div className="flex">
        {/* Sidebar - Fixed on left, collapsible on mobile */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Content Area - Optimized spacing */}
        <div className="flex-1 lg:ml-64 pt-16">
          <main className="min-h-screen">
            {/* Dashboard Header - Reduced padding */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
              <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                      Dashboard
                    </h1>
                    <p className="text-lg text-gray-600">
                      Welcome back! Here&apos;s what&apos;s happening with your account.
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-4">
                    {/* Quick Stats - More compact */}
                    <div className="hidden sm:flex items-center space-x-3">
                      <div className="flex items-center bg-emerald-50 px-3 py-2 rounded-full border border-emerald-200">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-emerald-700 font-medium text-sm">Online</span>
                      </div>
                      <div className="flex items-center bg-cyan-50 px-3 py-2 rounded-full border border-cyan-200">
                        <svg className="w-4 h-4 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-cyan-700 font-medium text-sm">Now</span>
                      </div>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Content - Optimized spacing */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}