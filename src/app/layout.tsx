import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Interview Insights Dashboard',
  description: 'A dynamic dashboard for visualizing interview insights and quotes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Ripples Insights</h1>
            <div className="space-x-4">
              <Link href="/" className="hover:text-indigo-300 transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="hover:text-indigo-300 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
