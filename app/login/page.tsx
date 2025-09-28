// Login page with Supabase authentication
// Handles user sign in and password reset functionality

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [loggedInRedirect, setLoggedInRedirect] = useState(false);
  const router = useRouter();

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setResetMessage('Password reset email sent! Check your inbox.');
        setError('');
      }
    } catch {
      setError('An unexpected error occurred');
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome back! Please enter your credentials.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl border border-gray-200 rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSignIn}>
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#672afa] focus:ring-[#672afa] border-[#e8e8e8] rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#1b1d21]">
                  Remember me
                </label>
              </div>

              <div className="text-sm flex items-center space-x-4">
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="font-medium text-indigo-700 hover:text-indigo-900"
                >
                  Lupa password?
                </button>
                <Link
                  href="/dashboard"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Dashboard
                </Link>
              </div>
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
                  </div>
                </div>
              </div>
            )}

            {/* Reset Message */}
            {resetMessage && (
              <div className="rounded-xl bg-green-50 p-4 border border-green-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {resetMessage}
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
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to our platform?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/signup"
                className="w-full flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition-all duration-200"
              >
                Create new account
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
