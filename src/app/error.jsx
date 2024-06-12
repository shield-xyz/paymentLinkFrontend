'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Nav from '../components/Nav';
import Button from '../components/ui/button';

import { Sidebar } from '@/components';

export default function Error({ error }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const reset = () => {
    router.refresh();
  };

  return (
    <div className="flex h-screen w-screen">
      <Nav session={null} />
      <Sidebar />
      <div className="m-auto flex flex-col items-center gap-1">
        <h2>Something went wrong!</h2>
        <Button className="px-8 py-2" variant="default" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
