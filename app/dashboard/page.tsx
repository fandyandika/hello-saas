// Expert UI/UX dashboard page with optimized text sizes and mobile responsiveness
// RUN: Test by visiting /dashboard - should show proper text hierarchy and mobile-friendly layout
// Expected: Consistent text sizes, mobile-optimized cards, proper visual hierarchy

export default function Dashboard() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Stats Grid - Mobile optimized */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {/* Total Users */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Users</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">1,234</p>
                <p className="text-xs sm:text-sm text-emerald-600 font-medium">+12% from last month</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Revenue</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">$45,678</p>
                <p className="text-xs sm:text-sm text-emerald-600 font-medium">+8% from last month</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Active Projects</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">24</p>
                <p className="text-xs sm:text-sm text-amber-600 font-medium">+3 this week</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Conversion Rate</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">3.2%</p>
                <p className="text-xs sm:text-sm text-cyan-600 font-medium">+0.5% from last month</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Mobile optimized */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200">
                View all
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-gray-900 font-medium">New user registered</p>
                  <p className="text-xs sm:text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-gray-900 font-medium">Payment received</p>
                  <p className="text-xs sm:text-sm text-gray-500">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-gray-900 font-medium">Project milestone completed</p>
                  <p className="text-xs sm:text-sm text-gray-500">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Quick Actions</h3>
              <span className="text-xs sm:text-sm text-gray-500">3 actions</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full text-left p-3 sm:p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-indigo-50 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 transition-colors duration-200">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-indigo-700 block">Create New Project</span>
                    <p className="text-xs sm:text-sm text-gray-500">Start a new project from scratch</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 sm:p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-emerald-50 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 transition-colors duration-200">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-emerald-700 block">Review Reports</span>
                    <p className="text-xs sm:text-sm text-gray-500">Check your latest analytics</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 sm:p-4 border border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50 transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-cyan-50 group-hover:bg-cyan-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 transition-colors duration-200">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-cyan-700 block">Settings</span>
                    <p className="text-xs sm:text-sm text-gray-500">Manage your preferences</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}