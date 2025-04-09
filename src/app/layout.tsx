import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LaFlore Customer Insights',
  description: 'A dynamic dashboard for visualizing LaFlore customer insights and quotes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl mr-2">👜</span>
              <h1 className="text-xl font-bold">LaFlore Insights</h1>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-100 py-6 mt-10">
          <div className="container mx-auto text-center text-gray-600">
            <p>© {new Date().getFullYear()} LaFlore Customer Insights</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
