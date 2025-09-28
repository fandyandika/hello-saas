import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#e8e8e8] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#1b1d21] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#a5a2a6] mb-6">Page Not Found</h2>
        <p className="text-[#a5a2a6] mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[#672afa] rounded-lg hover:bg-[#5a22df] transition-colors duration-200"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}