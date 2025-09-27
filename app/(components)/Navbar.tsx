// Dashboard navbar component with user info and logout functionality
// RUN: Test by checking navbar displays user email and logout button works
// Expected: Shows logo, user email, and functional logout button

import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-[#fefefe] shadow-sm border-b border-[#e8e8e8] fixed top-0 left-0 right-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="h-8 w-8 bg-[#672afa] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <div className="text-xl font-bold text-[#1b1d21] hover:text-[#672afa] transition-colors duration-200">Hello SaaS</div>
                <div className="text-xs text-[#a5a2a6] -mt-1">Dashboard</div>
              </div>
            </Link>
          </div>
          
          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {/* User Email */}
            <div className="hidden sm:block">
              <span className="text-sm text-[#a5a2a6]">
                Hi, <span className="font-medium text-[#1b1d21]">{user.email}</span>
              </span>
            </div>
            
            {/* Home Button */}
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-[#e8e8e8] text-sm font-medium rounded-lg text-[#1b1d21] bg-[#fefefe] hover:bg-[#e8e8e8] hover:border-[#672afa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#672afa] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
            
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
