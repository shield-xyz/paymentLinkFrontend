'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  useEffect(() => {
    // Track pageviews
    // if (pathname && posthog) {
    //   let url = window.origin + pathname;
    //   if (searchParams.toString()) {
    //     url = url + `?${searchParams.toString()}`;
    //   }
    //   // posthog.capture('user_signed_up', {
    //   //     distinct_id: "Test123s@",
    //   //     event: 'user_signup',
    //   //     signup_time: new Date().toISOString()
    //   //   })
    //   // posthog.capture(
    //   //   '$pageview',
    //   //   {
    //   //     '$current_url': url,
    //   //   }
    //   // )
    //   console.log('success post hog');
    // }
  }, [pathname, searchParams, posthog]);

  return null;
}
