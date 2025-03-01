import { Inter } from 'next/font/google';
import './globals.css';
import AppLayout from './layout/app-layout'
import { UserContextProvider } from './context/userContext';

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <UserContextProvider>
          <AppLayout>{children}</AppLayout>
        </UserContextProvider>
      </body>
    </html>
  );
}