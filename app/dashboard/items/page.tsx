'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ItemsService } from '@/lib/items';
import type { Item } from '@/types/database';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Alert from '@/app/(components)/Alert';

interface FormState {
  title: string;
  notes: string;
}

interface AlertState {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export default function DashboardItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [form, setForm] = useState<FormState>({ title: '', notes: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tableExists, setTableExists] = useState<boolean>(true);

  // Session guard (client-only route)
  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
          return;
        }
        await fetchItems();
      } catch {
        setAlert({ type: 'error', message: 'Gagal memuat sesi. Coba lagi.' });
      }
    };
    init();
  }, [router]);

  const fetchItems = async () => {
    setLoading(true);
    setAlert(null);
    try {
      const { data, error } = await ItemsService.getItems();
      if (error) {
        if (error.includes('table not found')) {
          setTableExists(false);
          setAlert({ type: 'warning', message: 'Database belum disetup. Silakan jalankan setup database terlebih dahulu.' });
        } else {
          setAlert({ type: 'error', message: error });
        }
        setItems([]);
      } else {
        setItems(data ?? []);
        setTableExists(true);
      }
    } catch (error) {
      setAlert({ type: 'error', message: error instanceof Error ? error.message : 'Gagal memuat data.' });
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: '', notes: '' });
    setEditingId(null);
  };

  const isValidTitle = useMemo(() => form.title.trim().length >= 1 && form.title.trim().length <= 255, [form.title]);
  const isValidNotes = useMemo(() => form.notes.trim().length <= 2000, [form.notes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidTitle || !isValidNotes) return;
    setSubmitting(true);
    setAlert(null);
    try {
      if (editingId) {
        const { data, error } = await ItemsService.updateItem(editingId, {
          title: form.title.trim(),
          notes: form.notes.trim() || null,
        });
        if (error) throw new Error(error);
        setItems(prev => prev.map(i => (i.id === editingId ? data! : i)));
        setAlert({ type: 'success', message: 'Item berhasil diperbarui!' });
        resetForm();
      } else {
        const { data, error } = await ItemsService.createItem({
          title: form.title.trim(),
          notes: form.notes.trim() || null,
        });
        if (error) throw new Error(error);
        setItems(prev => (data ? [data, ...prev] : prev));
        setAlert({ type: 'success', message: 'Item berhasil dibuat!' });
        resetForm();
      }
    } catch (error) {
      setAlert({ type: 'error', message: error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan.' });
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setForm({ title: item.title, notes: item.notes ?? '' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus item ini?')) return;
    
    // Optimistic delete
    const snapshot = items;
    setItems(prev => prev.filter(i => i.id !== id));
    
    try {
      const { error } = await ItemsService.deleteItem(id);
      if (error) throw new Error(error);
      setAlert({ type: 'success', message: 'Item berhasil dihapus!' });
    } catch (error) {
      // Rollback on error
      setItems(snapshot);
      setAlert({ type: 'error', message: error instanceof Error ? error.message : 'Gagal menghapus item.' });
    }
  };

  const handleInlineSubmit = () => {
    const mockEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;
    handleSubmit(mockEvent);
  };

  // Show database setup warning if table doesn't exist
  if (!tableExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                href="/dashboard"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Items</h1>
            <p className="text-gray-600">Manage your personal items</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Database Setup Required
                </h3>
                <p className="text-yellow-700 mb-4">
                  Tabel items belum dibuat. Silakan ikuti langkah-langkah berikut untuk setup database:
                </p>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Langkah Setup:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Buka Supabase Dashboard</li>
                    <li>Masuk ke <strong>SQL Editor</strong></li>
                    <li>Copy isi file <code className="bg-gray-100 px-1 rounded">supabase-schema.sql</code></li>
                    <li>Paste dan jalankan SQL tersebut</li>
                    <li>Refresh halaman ini</li>
                  </ol>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={fetchItems}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                  >
                    Coba Lagi
                  </button>
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                  >
                    Buka Supabase Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Items</h1>
          <p className="text-gray-600">Manage your personal items</p>
        </div>

        {/* Alert Messages */}
        {alert && (
          <div className="mb-6">
            <Alert 
              type={alert.type} 
              message={alert.message} 
              onClose={() => setAlert(null)} 
            />
          </div>
        )}

        {/* Create/Edit Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(s => ({ ...s, title: e.target.value }))}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              placeholder="Enter title (1-255 characters)"
              required
              maxLength={255}
            />
            {!isValidTitle && form.title.length > 0 && (
              <p className="text-red-500 text-sm mt-1">Title must be 1-255 characters</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm(s => ({ ...s, notes: e.target.value }))}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              placeholder="Optional notes (max 2000 characters)"
              rows={3}
              maxLength={2000}
            />
            {!isValidNotes && form.notes.length > 0 && (
              <p className="text-red-500 text-sm mt-1">Notes must be max 2000 characters</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting || !isValidTitle || !isValidNotes}
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl ${submitting || !isValidTitle || !isValidNotes ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Saving...' : editingId ? 'Update Item' : 'Create Item'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
            <p className="text-gray-500">Create your first item above to get started.</p>
          </div>
        ) : (
          /* Items List */
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(item.created_at).toLocaleString('id-ID', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {editingId === item.id ? (
                      /* Inline Edit Form */
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={form.title}
                          onChange={(e) => setForm(s => ({ ...s, title: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                          maxLength={255}
                          placeholder="Enter title"
                        />
                        <textarea
                          value={form.notes}
                          onChange={(e) => setForm(s => ({ ...s, notes: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                          rows={3}
                          maxLength={2000}
                          placeholder="Enter notes"
                        />
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleInlineSubmit}
                            disabled={submitting || !isValidTitle || !isValidNotes}
                            className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 ${submitting || !isValidTitle || !isValidNotes ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {submitting ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={resetForm}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display Mode */
                      <>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 break-words">{item.title}</h3>
                        {item.notes && (
                          <p className="text-gray-700 whitespace-pre-wrap break-words leading-relaxed">{item.notes}</p>
                        )}
                        {item.updated_at !== item.created_at && (
                          <p className="text-xs text-gray-400 mt-2">
                            Updated: {new Date(item.updated_at).toLocaleString('id-ID', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  {editingId !== item.id && (
                    /* Action Buttons */
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => startEdit(item)}
                        className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-lg hover:bg-indigo-50"
                        title="Edit item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50"
                        title="Delete item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


