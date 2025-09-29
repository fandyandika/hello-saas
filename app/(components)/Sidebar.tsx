// Professional sidebar with modern logo design and items navigation
// RUN: Test by checking sidebar shows navigation with items link
// Expected: Professional sidebar with Hello SaaS Dashboard branding and items navigation

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
    },
    {
      name: 'Asisten AI',
      href: '/dashboard/ai',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 14H7l-4 4V7a2 2 0 012-2h12a2 2 0 012 2v6" />
        </svg>
      ),
    },
    {
      name: 'Catatan',
      href: '/items',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: 'Template',
      href: '/dashboard/examples',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c-2.67 0-8 1.337-8 4v2h16v-2c0-2.663-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - 224px width, sticky positioning */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-56 bg-white shadow-2xl border-r border-gray-200 transform transition-all duration-300 ease-in-out md:translate-x-0 md:static md:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:sticky md:top-16 md:h-[calc(100vh-64px)]
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header with Professional Logo */}
          <div className="px-6 py-6 border-b border-gray-100">
            <Link 
              href="/" 
              className="flex items-center hover:opacity-80 transition-all duration-200 group"
            >
              {/* Modern Professional Logo */}
              <div className="relative">
                <div className="h-11 w-11 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
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
              <div className="min-w-0 ml-4">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">Hello SaaS</h2>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Mobile close button */}
          <div className="flex items-center justify-between px-6 py-4 md:hidden border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative
                    ${isActive
                      ? 'bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 shadow-sm border border-indigo-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                    }
                  `}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onToggle();
                    }
                  }}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-r-full"></div>
                  )}
                  <span className={`
                    mr-3 flex-shrink-0 transition-colors duration-200
                    ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}
                  `}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">v</span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900">v1.0.0</div>
                <div className="text-xs text-gray-500">Latest version</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}