// Dashboard main page content
// RUN: Test by visiting /dashboard - should show dashboard content with stats and welcome message
// Expected: Displays welcome message, stats cards, and recent activity section

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-[#fefefe] to-[#e8e8e8] rounded-xl shadow-lg border border-[#e8e8e8] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#672afa]">Total Users</p>
                <p className="text-3xl font-bold text-[#1b1d21] mt-2">1,234</p>
                <p className="text-xs text-[#a5a2a6] mt-1">+12% from last month</p>
              </div>
              <div className="h-12 w-12 bg-[#672afa] rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-gradient-to-br from-[#fefefe] to-[#e8e8e8] rounded-xl shadow-lg border border-[#e8e8e8] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#f0a026]">Revenue</p>
                <p className="text-3xl font-bold text-[#1b1d21] mt-2">$12,345</p>
                <p className="text-xs text-[#a5a2a6] mt-1">+8.2% from last month</p>
              </div>
              <div className="h-12 w-12 bg-[#f0a026] rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Growth */}
        <div className="bg-gradient-to-br from-[#fefefe] to-[#e8e8e8] rounded-xl shadow-lg border border-[#e8e8e8] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#a5a2a6]">Growth</p>
                <p className="text-3xl font-bold text-[#1b1d21] mt-2">+12.5%</p>
                <p className="text-xs text-[#a5a2a6] mt-1">+2.1% from last month</p>
              </div>
              <div className="h-12 w-12 bg-[#a5a2a6] rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-gradient-to-br from-[#fefefe] to-[#e8e8e8] rounded-xl shadow-lg border border-[#e8e8e8] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#672afa]">Active Sessions</p>
                <p className="text-3xl font-bold text-[#1b1d21] mt-2">89</p>
                <p className="text-xs text-[#a5a2a6] mt-1">+5.3% from last hour</p>
              </div>
              <div className="h-12 w-12 bg-[#672afa] rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-[#fefefe] rounded-xl shadow-lg border border-[#e8e8e8] hover:shadow-xl transition-all duration-300">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#1b1d21]">Recent Activity</h3>
              <button className="text-sm text-[#672afa] hover:text-[#5a22df] font-medium transition-colors duration-200">View all</button>
            </div>
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-[#672afa] flex items-center justify-center ring-8 ring-[#fefefe]">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-[#a5a2a6]">New user registered</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-[#a5a2a6]">
                          <time>2m ago</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-[#f0a026] flex items-center justify-center ring-8 ring-[#fefefe]">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-[#a5a2a6]">Payment received</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-[#a5a2a6]">
                          <time>1h ago</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-[#a5a2a6] flex items-center justify-center ring-8 ring-[#fefefe]">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-[#a5a2a6]">System maintenance scheduled</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-[#a5a2a6]">
                          <time>2h ago</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#fefefe] rounded-xl shadow-lg border border-[#e8e8e8] hover:shadow-xl transition-all duration-300">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#1b1d21]">Quick Actions</h3>
              <span className="text-sm text-[#a5a2a6]">3 actions</span>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-4 border border-[#e8e8e8] rounded-lg hover:bg-[#fefefe] hover:border-[#672afa] transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#672afa]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#672afa]/20 transition-colors duration-200">
                    <svg className="h-5 w-5 text-[#672afa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#1b1d21] group-hover:text-[#672afa]">Create New Project</span>
                    <p className="text-xs text-[#a5a2a6] mt-1">Start a new project from scratch</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left px-4 py-4 border border-[#e8e8e8] rounded-lg hover:bg-[#fefefe] hover:border-[#f0a026] transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#f0a026]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#f0a026]/20 transition-colors duration-200">
                    <svg className="h-5 w-5 text-[#f0a026]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#1b1d21] group-hover:text-[#f0a026]">Manage Users</span>
                    <p className="text-xs text-[#a5a2a6] mt-1">View and manage team members</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left px-4 py-4 border border-[#e8e8e8] rounded-lg hover:bg-[#fefefe] hover:border-[#a5a2a6] transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#a5a2a6]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#a5a2a6]/20 transition-colors duration-200">
                    <svg className="h-5 w-5 text-[#a5a2a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#1b1d21] group-hover:text-[#a5a2a6]">View Analytics</span>
                    <p className="text-xs text-[#a5a2a6] mt-1">Check detailed performance metrics</p>
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
