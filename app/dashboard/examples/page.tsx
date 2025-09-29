'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ExamplesService } from '@/lib/examples';
import type { Example } from '@/types/database';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Alert from '@/app/(components)/Alert';

interface FormState {
  content: string;
}

interface AlertState {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export default function DashboardExamplesPage() {
  const router = useRouter();
  const [examples, setExamples] = useState<Example[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [form, setForm] = useState<FormState>({ content: '' });
  const [tableExists, setTableExists] = useState<boolean>(true);
  const [userExampleCount, setUserExampleCount] = useState<number>(0);

  // Session guard (client-only route)
  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
          return;
        }
        await fetchExamples();
        await updateUserExampleCount();
      } catch {
        setAlert({ type: 'error', message: 'Gagal memuat sesi. Coba lagi.' });
      }
    };
    init();
  }, [router]);

  const fetchExamples = async () => {
    setLoading(true);
    setAlert(null);
    try {
      const { data, error } = await ExamplesService.getExamples();
      if (error) {
        if (error.includes('table not found')) {
          setTableExists(false);
          setAlert({ type: 'warning', message: 'Database belum disetup. Silakan jalankan setup database terlebih dahulu.' });
        } else {
          setAlert({ type: 'error', message: error });
        }
        setExamples([]);
      } else {
        setExamples(data ?? []);
        setTableExists(true);
      }
    } catch (error) {
      setAlert({ type: 'error', message: error instanceof Error ? error.message : 'Gagal memuat data.' });
      setExamples([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUserExampleCount = async () => {
    try {
      const { count, error } = await ExamplesService.getUserExampleCount();
      if (!error) {
        setUserExampleCount(count);
      }
    } catch {
      // Silently fail for count update
    }
  };

  const resetForm = () => {
    setForm({ content: '' });
  };

  const isValidContent = useMemo(() => form.content.trim().length >= 1 && form.content.trim().length <= 5000, [form.content]);
  const canCreateMore = useMemo(() => userExampleCount < ExamplesService.getMaxExamplesPerUser(), [userExampleCount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidContent || !canCreateMore) return;
    
    setSubmitting(true);
    setAlert(null);
    try {
      const { data, error } = await ExamplesService.createExample({
        content: form.content.trim(),
      });
      if (error) throw new Error(error);
      setExamples(prev => (data ? [data, ...prev] : prev));
      setUserExampleCount(prev => prev + 1);
      setAlert({ type: 'success', message: 'Template berhasil dibuat!' });
      resetForm();
    } catch (error) {
      setAlert({ type: 'error', message: error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus template ini?')) return;
    
    // Optimistic delete
    const snapshot = examples;
    setExamples(prev => prev.filter(e => e.id !== id));
    setUserExampleCount(prev => prev - 1);
    
    try {
      const { error } = await ExamplesService.deleteExample(id);
      if (error) throw new Error(error);
      setAlert({ type: 'success', message: 'Template berhasil dihapus!' });
    } catch (error) {
      // Rollback on error
      setExamples(snapshot);
      setUserExampleCount(prev => prev + 1);
      setAlert({ type: 'error', message: error instanceof Error ? error.message : 'Gagal menghapus template.' });
    }
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
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg opacity-20 blur-sm" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Template</h1>
            </div>
            <p className="text-sm text-gray-500">Kelola template referensi singkat untuk membimbing output AI.</p>
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
                  Tabel examples belum dibuat. Silakan ikuti langkah-langkah berikut untuk setup database:
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
                    onClick={fetchExamples}
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg opacity-20 blur-sm" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Template</h1>
                <p className="text-sm text-gray-500">Kelola template singkat untuk konsistensi output.</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 bg-white px-3 py-2 rounded-lg border">
              {userExampleCount} / {ExamplesService.getMaxExamplesPerUser()} template
            </div>
          </div>
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

        {/* Create Form */}
        {canCreateMore ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template *
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm(s => ({ ...s, content: e.target.value }))}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-sm text-gray-900"
                placeholder="Tulis contoh gaya/struktur singkat (maks 5000 karakter)"
                rows={6}
                required
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-2">
                {!isValidContent && form.content.length > 0 && (
                  <p className="text-red-500 text-sm">Panjang 1-5000 karakter</p>
                )}
                <p className="text-gray-400 text-sm ml-auto">
                  {form.content.length} / 5000
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting || !isValidContent}
                className={`bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${submitting || !isValidContent ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Menyimpan...' : 'Simpan Template'}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-1">
                  Maximum Examples Reached
                </h3>
                <p className="text-amber-700">
                  You have reached the maximum limit of {ExamplesService.getMaxExamplesPerUser()} examples. 
                  Delete an existing example to create a new one.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          </div>
        ) : examples.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No examples yet</h3>
            <p className="text-gray-500">
              {canCreateMore ? 'Create your first code example above to get started.' : 'You have reached the maximum limit of examples.'}
            </p>
          </div>
        ) : (
          /* Examples List */
          <div className="grid gap-4">
            {examples.map((example) => (
              <div key={example.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(example.created_at).toLocaleString('id-ID', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed font-mono">
                        {example.content}
                      </pre>
                    </div>
                    {example.updated_at !== example.created_at && (
                      <p className="text-xs text-gray-400 mt-3">
                        Updated: {new Date(example.updated_at).toLocaleString('id-ID', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDelete(example.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50"
                      title="Delete example"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
