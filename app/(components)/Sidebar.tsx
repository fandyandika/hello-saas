// Dashboard sidebar component with navigation links
// RUN: Test by checking sidebar shows navigation links and mobile toggle works
// Expected: Shows Dashboard/Profile links, collapsible on mobile, active state highlighting

'use client';

// No useState needed - props are passed from parent
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
          className="fixed inset-0 bg-[#1b1d21] bg-opacity-75 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1b1d21] shadow-xl border-r border-[#2a2d33] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full pt-16">
          {/* Sidebar Header with Logo */}
          <div className="px-6 py-4 border-b border-[#2a2d33]">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-[#672afa] rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Hello SaaS</h2>
                <p className="text-xs text-[#a5a2a6]">Dashboard</p>
              </div>
            </div>
          </div>
          {/* Mobile close button */}
          <div className="flex items-center justify-between px-6 py-3 lg:hidden border-b border-[#2a2d33]">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <button
              onClick={onToggle}
              className="p-2 rounded-md text-[#a5a2a6] hover:text-white hover:bg-[#2a2d33] transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-[#F0A026]/20 text-white border-r-2 border-[#F0A026]'
                      : 'text-[#a5a2a6] hover:bg-[#2a2d33] hover:text-white'
                    }
                  `}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                >
                  <span className={`
                    mr-3 flex-shrink-0
                    ${isActive ? 'text-[#F0A026]' : 'text-[#a5a2a6] group-hover:text-white'}
                  `}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-6 py-4 border-t border-[#2a2d33]">
            <div className="text-xs text-[#a5a2a6]">
              Hello SaaS Dashboard v1.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
