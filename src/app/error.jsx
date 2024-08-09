'use client';

import { useEffect } from 'react';

import { Nav, Sidebar } from '@/components';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  statusCode,
  session,
  hideSidebar,
  hideNav,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reset = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // Determine if the error is an unauthorized error
  const isUnauthorized = statusCode === 401;

  return (
    <div className="flex h-[calc(100vh-80px-4rem)] items-center justify-center">
      {!hideNav && <Nav session={session} />}
      {!hideSidebar && <Sidebar session={session} />}
      <div className="m-auto flex flex-col items-center gap-1 p-4 text-center">
        {isUnauthorized ? (
          <>
            <h2 className="text-lg font-bold text-primary sm:text-3xl">
              Unauthorized Access
            </h2>
            <p>You do not have permission to view this content.</p>
          </>
        ) : (
          <>
            <h2>Something went wrong!</h2>
            <Button
              className="px-8 py-2"
              variant="default"
              onClick={() => reset()}
            >
              Try again
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
