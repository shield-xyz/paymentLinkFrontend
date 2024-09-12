import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import Provider from '@/lib/Provider';
import './globals.css';
import { PHProvider } from '@/lib/PHProvider';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const inter = Inter({ subsets: ['latin'], adjustFontFallback: false });

export const metadata = {
  title: 'Shield',
  description: 'An app for managing your personal finances.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={`${inter.className} bg-muted text-foreground`}>
          <Provider>{children}</Provider>
          <Analytics />
        </body>
      </PHProvider>
    </html>
  );
}
