'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

const Provider = (props) => {
  return (
    <SessionProvider refetchInterval={60}>
      <Toaster />
      {props.children}
    </SessionProvider>
  );
};

export default Provider;
