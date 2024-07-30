// app/providers.js
'use client';
import posthogOriginal from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  posthogOriginal.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthogOriginal}>{children}</PostHogProvider>;
}
