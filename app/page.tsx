// Modern homepage with consistent branding and dashboard aesthetic
// RUN: Test by visiting homepage - should show modern design matching dashboard
// Expected: Professional homepage with consistent logo, modern styling, and dashboard-like aesthetic

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo Section */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="relative">
                    {/* Modern H Design - Larger for homepage */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                      {/* Left vertical bar */}
                      <div className="absolute left-0 top-0 w-2 h-8 sm:h-10 bg-white rounded-full"></div>
                      {/* Right vertical bar */}
                      <div className="absolute right-0 top-0 w-2 h-8 sm:h-10 bg-white rounded-full"></div>
                      {/* Horizontal bar */}
                      <div className="absolute left-0 top-3 sm:top-4 w-8 sm:w-10 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl opacity-20 blur-lg"></div>
              </div>
            </div>
            
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Hello SaaS Indonesia{' '}
              <span className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl">🚀</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome to your modern SaaS platform built with Next.js 15, 
              TypeScript, and Tailwind CSS. Ready to scale your business?
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Link
              href="/signup"
              className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Get Started
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-700 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              href="/login"
              className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Login
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-teal-700 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>

        {/* Features Section - Modern Cards */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Hello SaaS?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technology and designed for scale
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">⚡</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-indigo-600 transition-colors duration-200">Fast & Modern</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with Next.js 15 and the latest web technologies for optimal performance and developer experience.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🔒</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-indigo-600 transition-colors duration-200">Secure & Reliable</h3>
              <p className="text-gray-600 leading-relaxed">
                Enterprise-grade security with TypeScript for type safety and Supabase for robust authentication.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group sm:col-span-2 lg:col-span-1">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🎨</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-indigo-600 transition-colors duration-200">Beautiful UI</h3>
              <p className="text-gray-600 leading-relaxed">
                Clean, responsive design with Tailwind CSS for a professional and modern user experience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 md:mt-24 text-center">
          <div className="bg-gradient-to-r from-indigo-50 via-violet-50 to-purple-50 rounded-3xl p-8 sm:p-12 md:p-16 border border-indigo-100">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of businesses already using Hello SaaS to scale their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Free Trial
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-indigo-700 bg-white border-2 border-indigo-200 rounded-xl sm:rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}