import { Analytics } from '@vercel/analytics/react';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

import { PHProvider } from '@/lib/PHProvider';
import Provider from '@/lib/Provider';

import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const PostHogPageView = dynamic(() => import('@/lib/PostHogPageView'), {
  ssr: false,
});

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
          <PostHogPageView />
          <Provider>{children}</Provider>
          <Analytics />
        </body>
      </PHProvider>
    </html>
  );
}
