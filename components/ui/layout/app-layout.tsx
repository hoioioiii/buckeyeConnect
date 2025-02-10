'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Shared layout for all tabs!!
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Next.js routing

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Consistent across all pages */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
          {/* Logo links to feed */}
          <Link href="/feed">
              <h1 className="text-2xl font-bold text-red-600">BuckeyeConnect</h1>
            </Link>

            {/* Main feed tab */}
            <nav className="flex gap-4">
              <Link 
                href="/"
                className={`px-4 py-2 rounded-lg ${
                  pathname === '/' ? 'bg-red-50 text-red-600' : 'text-gray-600'
                }`}
              >
                Activities
              </Link>

              {/* Friend tab - to be implemented */}
              <Link 
                href="/friend"
                className={`px-4 py-2 rounded-lg ${
                  pathname === '/friend' ? 'bg-red-50 text-red-600' : 'text-gray-600'
                }`}
              >
                Find Friends
              </Link>

              {/* Profile tab - to be implemented */}
              <Link 
                href="/profile"
                className={`px-4 py-2 rounded-lg ${
                  pathname === '/profile' ? 'bg-red-50 text-red-600' : 'text-gray-600'
                }`}
              >
                Profile
              </Link>

              {/* Create activity - to be implemented */}
              <Link 
                href="/create"
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus size={20} />
                Create
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content area - Changes based on active page */}
      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      {/* Footer ----   Up to be changed :-) */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              © 2025 BuckeyeConnect :-D
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-red-600">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;