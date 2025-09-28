// Signup page with Supabase authentication
// Handles user registration with email and password

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loggedInRedirect, setLoggedInRedirect] = useState(false);
  const router = useRouter();

  // Check if email was recently used for signup
  const checkRecentSignup = (email: string) => {
    const recentSignups = JSON.parse(localStorage.getItem('recentSignups') || '[]');
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    
    // Clean old entries
    const validSignups = recentSignups.filter((item: { email: string; timestamp: number }) => item.timestamp > oneHourAgo);
    localStorage.setItem('recentSignups', JSON.stringify(validSignups));
    
    return validSignups.some((item: { email: string; timestamp: number }) => item.email === email);
  };

  // Add email to recent signups
  const addRecentSignup = (email: string) => {
    const recentSignups = JSON.parse(localStorage.getItem('recentSignups') || '[]');
    recentSignups.push({ email, timestamp: Date.now() });
    localStorage.setItem('recentSignups', JSON.stringify(recentSignups));
  };

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setLoggedInRedirect(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200); // Redirect after 1.2 seconds
      }
    };
    checkSessionAndRedirect();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setLoggedInRedirect(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Server-side duplicate check via admin API
      const resp = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!resp.ok) {
        const { error: apiError } = await resp.json();
        setError(apiError || 'Gagal mengecek email. Coba lagi.');
        setLoading(false);
        return;
      }

      const { exists } = (await resp.json()) as { exists: boolean };
      if (exists) {
        setError('Email ini sudah terdaftar! Silakan login untuk masuk ke dashboard.');
        setLoading(false);
        return;
      }

      // Extra client-side throttle to avoid spamming
      if (checkRecentSignup(email)) {
        setError('Email ini baru saja digunakan untuk pendaftaran. Silakan cek email Anda atau tunggu sebentar.');
        setLoading(false);
        return;
      }

      // Proceed with signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('already registered') ||
            error.message.includes('User already registered') ||
            error.message.includes('already been registered') ||
            error.message.includes('email address is already registered') ||
            error.message.includes('already exists') ||
            error.message.includes('duplicate') ||
            error.message.includes('already in use')) {
          setError('Email ini sudah terdaftar! Silakan login untuk masuk ke dashboard.');
        } else if (error.message.includes('Invalid email')) {
          setError('Mohon masukkan alamat email yang valid');
        } else if (error.message.includes('Password should be at least')) {
          setError('Password harus minimal 6 karakter');
        } else if (error.message.includes('Signup is disabled')) {
          setError('Pendaftaran sedang dinonaktifkan. Silakan hubungi administrator.');
        } else {
          setError(`Error: ${error.message}`);
        }
      } else {
        addRecentSignup(email);
        setMessage('Berhasil! Silakan cek email Anda untuk link konfirmasi.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (loggedInRedirect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Anda sudah login.
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Mengarahkan ke dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand logo */}
        <div className="flex justify-center">
          <div className="relative mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
              <div className="w-5 h-5 relative">
                <div className="absolute left-0 top-0 w-1.5 h-5 bg-white rounded-full"></div>
                <div className="absolute right-0 top-0 w-1.5 h-5 bg-white rounded-full"></div>
                <div className="absolute left-0 top-2 w-5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl opacity-20 blur-lg" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join Hello SaaS Indonesia today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl border border-gray-200 rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1b1d21]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1b1d21]">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                  placeholder="Create a password"
                />
              </div>
              <p className="mt-1 text-xs text-[#a5a2a6]">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                    {error.includes('sudah terdaftar') && (
                      <div className="mt-3">
                        <Link
                          href="/login"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 rounded-xl hover:shadow-lg transition-all duration-200"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Login Sekarang
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="rounded-xl bg-green-50 p-4 border border-green-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {message}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-indigo-700 hover:text-indigo-900 transition-colors duration-200"
              >
                Sign in instead
              </Link>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-indigo-700 hover:text-indigo-900 flex items-center justify-center transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
