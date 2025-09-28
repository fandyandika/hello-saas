// Items page with full CRUD functionality
// RUN: Test by visiting /items - should show items list with CRUD operations
// Expected: Complete items management interface with modern UI

import ItemsList from '../(components)/ItemsList';

export default function ItemsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Items
              </h1>
              <p className="text-gray-600 mt-2">Kelola catatan pribadi Anda dengan mudah.</p>
            </div>
          </div>
        </div>
        <ItemsList />
      </div>
    </div>
  );
}
