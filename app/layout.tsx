import { Inter } from 'next/font/google';
import './globals.css';
import AppLayout from './layout/app-layout'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BuckeyeConnect',
  description: 'Connect with OSU students through activities and events!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}