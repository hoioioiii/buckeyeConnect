import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppLayout from '../components/ui/layout/app-layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BuckeyeConnect',
  description: 'Connect with OSU students through activities and events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}