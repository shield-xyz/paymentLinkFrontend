'use client';

import posthogOriginal from 'posthog-js';
import { useEffect } from 'react';

import Nav from '../components/Nav';

import { Button } from '@/components/ui/button';

export default function Error({ error }) {
  useEffect(() => {
    console.error(error);
    posthogOriginal.capture('system_error', {
      distinctId: 'system',
      error: error,
      properties: {
        error_message: error.message,
        error_type: error.name,
        stack: error.stack,
      },
    });
  }, [error]);

  const reset = () => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-undef
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Nav session={null} />
      <div className="m-auto flex flex-col items-center gap-1">
        <h2>Something went wrong!</h2>
        <Button className="px-8 py-2" variant="default" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
