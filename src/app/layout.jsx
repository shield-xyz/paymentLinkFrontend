import { Inter } from 'next/font/google';

import './globals.css';

import Provider from '@/lib/Provider';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shield',
  description: 'An app for managing your personal finances.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-muted text-foreground`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
