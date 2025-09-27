// Dashboard layout with authentication protection
// RUN: Test by visiting /dashboard - should redirect to /login if not authenticated
// Expected: Shows dashboard with navbar + sidebar + content area

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

    // Listen for auth changes
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
      <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#e8e8e8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#672afa] mx-auto"></div>
          <p className="mt-4 text-[#a5a2a6]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#e8e8e8]">
      {/* Navbar - Fixed at top */}
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="flex">
        {/* Sidebar - Fixed on left, collapsible on mobile */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Content Area (offset for fixed navbar) */}
        <div className="flex-1 lg:ml-64 pt-16">
          {/* Main Content */}
          <main className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#e8e8e8]">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-[#fefefe] to-[#f8f9fa] shadow-sm border-b border-[#e8e8e8]">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-[#1b1d21] mb-2">Dashboard</h1>
                    <p className="text-lg text-[#a5a2a6]">
                      Welcome back! Here&apos;s what&apos;s happening with your account.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Quick Stats */}
                    <div className="hidden sm:flex items-center space-x-6 text-sm">
                      <div className="flex items-center bg-green-50 px-3 py-2 rounded-full border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-green-700 font-medium">Online</span>
                      </div>
                      <div className="flex items-center bg-blue-50 px-3 py-2 rounded-full border border-blue-200">
                        <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-blue-700 font-medium">Last active: Now</span>
                      </div>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="lg:hidden p-2 rounded-lg text-[#a5a2a6] hover:text-[#1b1d21] hover:bg-[#e8e8e8] transition-colors duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="px-6 py-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
