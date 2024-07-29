import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';

import './globals.css';
import Provider from '@/lib/Provider';
import { PHProvider } from '@/lib/PHProvider';
import dynamic from 'next/dynamic';

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

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

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
