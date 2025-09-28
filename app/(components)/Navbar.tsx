// Professional navbar with modern logo design
// RUN: Test by checking modern logo displays properly in navbar
// Expected: Professional geometric logo with gradient and modern styling

'use client';

import Link from 'next/link';

interface NavbarProps {
  user: {
    email: string;
  };
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Left side - Brand (Mobile only) */}
          <div className="flex items-center md:hidden">
            <Link 
              href="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer group"
            >
              {/* Modern Professional Logo */}
              <div className="relative">
                <div className="h-9 w-9 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <div className="relative">
                    {/* Modern H Design */}
                    <div className="w-4 h-4 relative">
                      {/* Left vertical bar */}
                      <div className="absolute left-0 top-0 w-1 h-4 bg-white rounded-full"></div>
                      {/* Right vertical bar */}
                      <div className="absolute right-0 top-0 w-1 h-4 bg-white rounded-full"></div>
                      {/* Horizontal bar */}
                      <div className="absolute left-0 top-1.5 w-4 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                Hello SaaS
              </div>
            </Link>
          </div>
          
          {/* Right side - User Actions (Always on the right) */}
          <div className="flex items-center space-x-3 lg:space-x-4 ml-auto">
            {/* User Email - Desktop only */}
            <div className="hidden lg:block">
              <span className="text-sm text-gray-600">
                Hi, <span className="font-medium text-gray-900">{user.email}</span>
              </span>
            </div>
            
            {/* User Email - Mobile/Tablet (shorter) */}
            <div className="lg:hidden">
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{user.email.split('@')[0]}</span>
              </span>
            </div>
            
            {/* Home Button */}
            <Link
              href="/"
              className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 mr-1.5 lg:mr-2"
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
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4 mr-1.5 lg:mr-2"
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
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}