// Items page with full CRUD functionality
// RUN: Test by visiting /items - should show items list with CRUD operations
// Expected: Complete items management interface with modern UI

import ItemsList from '../(components)/ItemsList';

export default function ItemsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 20h4l10.5-10.5a2.5 2.5 0 10-3.536-3.536L4 16v4z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg opacity-20 blur-sm" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Catatan</h1>
          </div>
          <p className="text-sm text-gray-500">Simpan ide dan catatan pentingmu. Ringkas, rapi, dan mudah dicari.</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6">
            <ItemsList />
          </div>
        </div>
      </div>
    </div>
  );
}
