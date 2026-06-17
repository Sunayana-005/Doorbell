'use client';

import Link from 'next/link';

export default function OptionsPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-black mb-12">Doorbell System</h1>
        
        <div className="flex flex-col gap-6">
          <Link
            href="/doorbell"
            className="px-12 py-6 text-2xl border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
          >
            Doorbell
          </Link>
          
          <Link
            href="/dashboard"
            className="px-12 py-6 text-2xl border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </div>
        
        <Link
          href="/"
          className="inline-block mt-8 text-gray-600 hover:text-black transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
