'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// Shared layout for all tabs!!
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Next.js routing

  // Routes where header and footer should not be displayed
  const noHeaderFooterRoutes = ['/pages/login', '/pages/register'];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally render header */}
      {!noHeaderFooterRoutes.includes(pathname) && (
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo which redirects to main feed */}
              <Link href="/pages/main-feed">
                <h1 className="text-2xl font-bold text-red-600">BuckeyeConnect</h1>
              </Link>

              {/* To fix */}
              <Link href="/pages/login">
                <h1 className="text-2xl font-bold text-red-600">login</h1>
              </Link>
              <Link href="/pages/register">
                <h1 className="text-2xl font-bold text-red-600">register</h1>
              </Link>



              {/* Main feed tab */}
              <nav className="flex gap-4">
                <Link 
                  href="/pages/main-feed"
                  className={`px-4 py-2 rounded-lg ${
                    pathname === '/pages/main-feed' ? 'bg-red-50 text-red-600' : 'text-gray-600'
                  }`}
                >
                  Activities
                </Link>

                {/* Friend tab - to be implemented */}
                <Link 
                  href="/friend" // TODO: ADD PATH /pages/friend 
                  className={`px-4 py-2 rounded-lg ${
                    pathname === '/friend' ? 'bg-red-50 text-red-600' : 'text-gray-600'
                  }`}
                >
                  Find Friends
                </Link>

                {/* Profile tab - to be implemented */}
                <Link 
                  href="/pages/profile/basic-info" // TODO: ADD PATH /pages/profile 
                  className={`px-4 py-2 rounded-lg ${
                    pathname === '/pages/profile/basic-info' ? 'bg-red-50 text-red-600' : 'text-gray-600'
                  }`}
                >
                  Profile
                </Link>

                {/* Create activity - to be implemented */}
                <Link 
                  href="/pages/create-activity" // TODO: ADD PATH /pages/create 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus size={20} />
                  Create
                </Link>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Toaster for notifications */}
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>

      {/* Main content area - Changes based on active page */}
      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      {/* Conditionally render footer */}
      {!noHeaderFooterRoutes.includes(pathname) && (
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
      )}
    </div>
  );
};

export default AppLayout;